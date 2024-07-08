// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import Grid from "@mui/material/Unstable_Grid2";
import QuickGlance from "./QuickGlance";
import RepositoryDetails from "./RepositoryDetails";
import React from "react";

const Content = (props) => {

    return (
        <Grid container spacing={2}>
            <Grid xs={3}>
                <QuickGlance repository={props.repository}></QuickGlance>
            </Grid>
            <Grid xs={9}>
                <RepositoryDetails repository={props.repository}></RepositoryDetails>
            </Grid>
        </Grid>
    );
}

export default Content;
