// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React, {useState} from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import {useParams} from "react-router-dom";

const FacetSelector = (props) => {

    const params = useParams();

    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [state, setState] = useState({items: [], DataisLoaded: false, filterValue: {}});
    const [typedSearch, setTypedSearch] = useState("");

    React.useEffect( () => {
        // TODO: use props to select proper URL request
        var requestUrl = process.env.REACT_APP_API_BASE_URL + props.facet;
        // if (this.props.facet == "branches") requestUrl += "/branches";

        fetch(requestUrl)
            .then((res) => res.json())
            .then((json) => {
                setState({
                    items: json,
                    DataisLoaded: true,
                    filterValue: {}
                });
            })
    }, [props.facet]);

    function setNewInput(event, newInputValue, reason) {
        if (reason !== "reset" && reason !== "clear") {
            setTypedSearch(newInputValue.valueOf());
            setInputValue(newInputValue);
        } else {
            setInputValue(typedSearch);
        }
    }

    function closeAutocomplete(event, reason) {
        setInputValue("");
        setOpen(false)
    }

    if(!state.DataisLoaded)
        return(<div><b>Loading...</b></div>);
    else {
        return (
            <Autocomplete
                style={{maxWidth:'410px'}}
                className={props.className}
                multiple
                filterSelectedOptions
                disableCloseOnSelect
                id={'filter-' + props.facet}
                options={state.items}
                getOptionLabel={(option) => {
                    if (option.nickname!==null && option.nickname!=="" && option.nickname!==undefined) {
                        return option.name + ' (' + option.nickname + ')'
                    } else {
                        return option.name
                    }
                }}
                onChange={props.handleAddToFilters}
                onInputChange={(event, newInputValue, reason) => {
                    setNewInput(event, newInputValue, reason);
                }}
                onClose={() => {setOpen(false); setTypedSearch(""); setInputValue("");}}
                inputValue={inputValue}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={props.facet_name}
                        />
                )}
            />
        )
    }
}

export default FacetSelector;
