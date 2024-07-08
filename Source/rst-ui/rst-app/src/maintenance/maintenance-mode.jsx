// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";
import Container from "@mui/material/Container";
import Footer from "../Footer";
import Box from "@mui/material/Box";

export default function MaintenancePage() {

    return (
        <React.Fragment>
        <Container maxWidth='xl' style={{height:'100%'}}>

            <main>
                <Box className='repository-page'>
                    <div id="maintenance-page">
                        <h1>We're undergoing maintenance right now!</h1>
                        <p>Sorry, this site is currently undergoing some maintenance. Check back later.</p>
                    </div>
                </Box>
            </main>


            <Footer />
        </Container>
        </React.Fragment>
    );
}
