// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React, {useEffect} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ComputerIcon from '@mui/icons-material/Computer';
import EmailIcon from '@mui/icons-material/Email';
const Header = (props) => {
        return (
            <Grid container>
                < Grid xs={3} md={3}>
                    <div>
                        <h1>Placeholder for logo</h1>

                        <div>
                            <ComputerIcon sx={{float: 'left', alignContent: 'center'}}/>
                            {props.repository[3]}
                        </div>
                        <br/>

                        <div>
                            <EmailIcon sx={{float: 'left', alignContent: 'center'}}/>
                            Placeholder for email
                        </div>
                    </div>
                </Grid>

                <Grid xs={9} md={9}>
                        <h2>{props.repository[1]}</h2>

                        <div><b>Affiliations:</b> Affiliations go here</div>
                        <div><b>Research Areas: </b>Research Areas go here</div>
                        <div><b>Data Types: </b> Data types go here</div>
                        <div><b>Organisms: </b> Organisms go here</div>
                        <div> <b>Formats accepted: </b> Formats go here</div>
                </Grid>
            </Grid>
        );
}

export default Header;
