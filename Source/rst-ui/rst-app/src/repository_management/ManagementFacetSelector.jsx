// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React, {useState} from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import {useParams} from "react-router-dom";

function ManagementFacetSelector({onSelect, value, defaultValue, label, className, ...props}) {

    const params = useParams();

    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [state, setState] = useState({items: [], DataisLoaded: false});
    const [typedSearch, setTypedSearch] = useState("");

    React.useEffect( () => {
        var requestUrl = process.env.REACT_APP_API_BASE_URL + props.facet;

        fetch(requestUrl)
            .then((res) => res.json())
            .then((json) => {
                setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }, []);

    function setNewInput(event, newInputValue, reason) {
        console.log('set input');
        console.log(reason);
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

    if(!state.DataisLoaded) {
        return(<div><b>Loading...</b></div>);
    } else {
        return (
            <Autocomplete
                className={className}
                multiple
                disabled={!state.DataisLoaded}
                filterSelectedOptions
                disableCloseOnSelect
                options={state.items || []}
                defaultValue={defaultValue}
                getOptionLabel={(option) => option.name }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={onSelect}
                onInputChange={(event, newInputValue, reason) => {
                    setNewInput(event, newInputValue, reason);
                }}
                onClose={() => {setOpen(false); setTypedSearch(""); setInputValue("");}}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined" />
                )} />
        )
    }
}

export default ManagementFacetSelector;
