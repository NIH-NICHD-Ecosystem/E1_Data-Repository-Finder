// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import {Link, useParams} from 'react-router-dom';
import React, {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Login from "../login/Login";
import Button from "@mui/material/Button";

import CheckIcon from '@mui/icons-material/Check';

function RepositoryAcceptedForPublish(props) {
    return (
        <React.Fragment>
            <main>
                <div>
                    {props.authString
                        ? <MainContent />
                        : <Login setAuthString={props.setAuthString} />
                    }
                </div>
            </main>
        </React.Fragment>
    )
}

const MainContent = (props) => {
    return (
        <React.Fragment>
            <Box className="repository-accepted-box">
                <CheckIcon className="green-icon" />
                <br />
                <Typography variant="body2">This data repository submission has been accepted to be published!
                    An administrator will publish this repository to the live site soon!
                </Typography>
                <br />
                <div>
                    <Link to={'/repositories/management'}>
                        <Button size="small" variant="contained" fullWidth className="large-button">Back to Management Home</Button>
                    </Link>
                </div>
            </Box>
        </React.Fragment>
    )
}

export default RepositoryAcceptedForPublish;
