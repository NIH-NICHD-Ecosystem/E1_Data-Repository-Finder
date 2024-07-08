// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {RSTLogo} from './icons/icons';
import {Link, NavLink} from "react-router-dom";
import MaintenanceBanner from "./maintenance/maintenance-banner";

const MainHeader = (props) => {

    React.useEffect(() => {
       console.log(props.maintenanceBanner);
    });

    return ( <header className='top-matter' style={{ width: '100%', color: '#427E99' }}>
        {props.maintenanceBanner === 'true' &&

        <MaintenanceBanner/>
        }

                <nav style={{ float: 'right', margin: '20px 30px -40px 0px' }}>
                    <NavLink to="/repository_list"
                             style={({ isActive }) => ({
                                 color: isActive ? '#427E99' : '#427C97',
                                 textDecoration: isActive && 'underline',
                                 fontWeight: isActive && 'bold',
                             })}>
                        Repository List
                    </NavLink> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <NavLink to="/data_definitions"
                             style={({ isActive }) => ({
                                 color: isActive ? '#427E99' : '#427C97',
                                 textDecoration: isActive && 'underline',
                                 fontWeight: isActive && 'bold',
                             })}>
                        Data Definitions
                    </NavLink> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {props.authString
                        ? <>
                            <NavLink to="/repositories/management"
                                     style={({isActive}) => ({
                                         color: isActive ? '#427E99' : '#427C97',
                                         textDecoration: isActive && 'underline',
                                         fontWeight: isActive && 'bold',
                                     })}>
                                Management
                            </NavLink>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <NavLink to="/logout"
                                     onClick={() => props.clearAuthString()}
                                     style={({isActive}) => ({
                                         color: isActive ? '#427E99' : '#427C97',
                                         textDecoration: isActive && 'underline',
                                         fontWeight: isActive && 'bold',
                                     })}
                            >
                                Logout
                            </NavLink>
                        </>
                        : <NavLink to="/repositories/management"
                                   style={({isActive}) => ({
                                       color: isActive ? '#427E99' : '#427C97',
                                       textDecoration: isActive && 'underline',
                                       fontWeight: isActive && 'bold',
                                   })}>
                            Login
                        </NavLink>
                    }
                </nav>

        <Grid xs={12} container>
            <Grid id="header-logo" style={{marginTop:'40px'}}>
                <Link to={'/'}>
                    <h1 aria-label="Data Repository Finder"><RSTLogo /></h1>
                </Link>
            </Grid>

            <Grid xs={6} style={{ position: 'relative', marginTop:'40px'}}>
                <p id="header-text">
                    <b>Data Repository Finder</b> helps researchers find data repositories where
                    they can share data as they develop and implement their NIH Data Management and Sharing Plans.
                    Repositories are added on an ongoing basis.
                </p>
            </Grid>

        </Grid>
    </header> );
};

export default MainHeader;
