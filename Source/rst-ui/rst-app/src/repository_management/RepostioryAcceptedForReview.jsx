// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import {Link} from 'react-router-dom';
import React  from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Login from "../login/Login";
import Button from "@mui/material/Button";

import CheckIcon from '@mui/icons-material/Check';

function RepositoryAcceptedForReview(props) {
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
                <Typography variant="body2">Your data repository submission has been accepted for review!
                    An administrator will review the submission and may contact you if further information is
                    needed.
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

export default RepositoryAcceptedForReview;
