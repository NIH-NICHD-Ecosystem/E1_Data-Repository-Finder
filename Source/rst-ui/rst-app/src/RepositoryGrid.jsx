// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";
// import Grid from "@mui/material/Unstable_Grid2";
import RepositoryCard from "./RepositoryCard";
// import {Container} from "@mui/material";

const RepositoryGrid = (props) => {

    if (props.searchResultsLoaded) {
        if(props.searchResults.length > 0) {
            return (
                props.searchResults.map((item) => (
                    <div key={'repository-card-div-' + item.id} style={{padding: 5}}>
                        <RepositoryCard repository={item} compareIds={props.compareIds} handleAddToCompare={props.handleAddToCompare} />
                    </div>
                ))
            );
        } else {
            return (
                <div className='empty-list'>No search results returned.</div>
            )
        }
    } else {
        return (
            <div className='empty-list'>Loading search results...</div>
        );
    }
}

export default RepositoryGrid;
