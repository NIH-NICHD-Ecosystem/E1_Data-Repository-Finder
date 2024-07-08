// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";
import { RSTFooterLogo } from './icons/icons';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
};

const Footer = () => {

    return (<footer className="page-footer">
        <Grid xs={12} container spacing={2}>
            <Grid xs={3} style={{ paddingTop: '13px' }}>
                <Link to={'/'}>
                    <RSTFooterLogo />
                </Link>
            </Grid>

            <Grid xs={8}>
                <Typography>
                    <b>Data Repository Finder</b> helps researchers find data repositories where they can share data as
                    they develop and implement their NIH Data Management and Sharing Plans.
                    Repositories are added on an ongoing basis.
                    Repositories not listed here may still be appropriate for data sharing.
                    Please contact your program officer with any questions.
                </Typography>
                <br/>

                <Typography style={{fontSize: '13px'}}>
                    Supported by the&nbsp;
                    <a href="https://www.nichd.nih.gov/about/org/od/odss" target="_blank" rel="noreferrer">
                        <i>Eunice Kennedy Shriver</i> National Institute of Child Health & Human Development (NICHD)</a>
                    , Federally Funded Research & Development Centers, and MIT Lincoln Laboratory
                </Typography>
                <br/>

                <Typography style={{fontSize: '13px'}}>
                    Have questions or want to send feedback? Contact us at:&nbsp;
                    <Mailto email="Data-Repository-Finder-Support@ll.mit.edu" subject="Send feedback on Data Repository Finder" body="">
                        Data-Repository-Finder-Support@ll.mit.edu
                    </Mailto>
                </Typography>
            </Grid>

        </Grid>
    </footer>);
}

export default Footer;
