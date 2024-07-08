// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

const RepositoryManagementList = (props) => {
    const [state, setState] = useState({repositories: [], DataisLoaded: false});

    React.useEffect(() => {
        var requestUrl = process.env.REACT_APP_API_BASE_URL + "repositories";

        fetch(requestUrl)
            .then(response => response.json())
            .then((responseJson) => {
                setState({
                    DataisLoaded: true,
                    repositories: responseJson['repositories']
                });
            })
    }, []);

    if (state.DataisLoaded) {
        return (
            <React.Fragment>
                <Box className='repository-add-edit-title'>
                    <Typography variant='h1'>DATA REPOSITORY MANAGEMENT</Typography>
                    <Typography variant='body2'>From here you can add and/or edit repository details in the DRF.</Typography>
                </Box>

                <Link to={'add'}>
                    <Typography className="repository-name" color="text.primary" gutterBottom>
                        Add New Repository
                    </Typography>
                </Link>

                <Box className='repository-list'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Repository ID</TableCell>
                                    <TableCell>Repository Name</TableCell>
                                    <TableCell >Repsitory Short Name</TableCell>
                                    <TableCell >Published</TableCell>
                                    <TableCell >Edit</TableCell>
                                    <TableCell >Preview and Publish</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <RepositoryManagementList repositories={props.repositories} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </React.Fragment>
        );
    }
}

const RepositoryManagementList = (props) => {
    return (
        props.repositories.map((row) => (
            <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>{row.id}</TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.nickname}</TableCell>
                <TableCell>{row.published ? 'True' : 'False'}</TableCell>
                <TableCell>
                    <Link to={'edit/' + row.id}>
                        <Button size="small" variant="contained" fullWidth className="large-button">Edit</Button>
                    </Link>
                </TableCell>
                <TableCell><Button>Preview and Publish</Button></TableCell>
            </TableRow>
        ))
    );
}
