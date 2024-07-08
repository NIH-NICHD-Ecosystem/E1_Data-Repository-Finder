// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from "@mui/material/Chip";

const RepositoryManagementHome = (props) => {



        return (<>
                <main>
                    <div>
                        <MainContent authString={props.authString} />
                    </div>
                </main>
        </>);
};


const MainContent = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState({repositories: [], DataisLoaded: false});

    React.useEffect( () => {
        if(!props.authString) {
            console.log("not logged in");
            navigate("/login");
        } else {

            var requestUrl = process.env.REACT_APP_API_BASE_URL + 'admin/repositories';

            fetch(requestUrl, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${props.authString}`
                })
            })
                .then(response => response.json())
                .then((responseJson) => {
                    setState({
                        DataisLoaded: true,
                        repositories: responseJson['repositories']
                    });
                })
        }
    }, [navigate, props.authString]);

    if (state.DataisLoaded) {
        return (<>
            <Box className='repository-management'>
                <div className='repository-management-title'>
                    <span style={{marginLeft: '40px'}}>Data Repository Management</span>
                </div>
                <Link to={'add'}>
                <Button size="small" variant="contained" style={{ margin: '20px 20px', padding: '4px 37px', float: 'right', backgroundColor: 'rgb(45, 85, 103)' }}>
                    Add New Repository
                </Button>
                </Link>

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Repository ID</TableCell>
                                <TableCell>Repository Name</TableCell>
                                <TableCell>Repository Short Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Preview</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <RepositoryManagementList repositories={state.repositories}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>);
    }
};


const RepositoryManagementList = (props) => {
    return (
        props.repositories.map((row) => (
            <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>
                    {row.nickname}
                </TableCell>
                <TableCell>
                    {publish_status(row.status) === 0 &&
                        <Chip className='repository-chip'
                            style={{backgroundColor: 'rgba(80, 148, 124, 1)', color: 'white'}}
                            label='Published'/>
                    }
                    {publish_status(row.status) === 1 &&
                        <Chip className='repository-chip'
                            style={{ backgroundColor: 'rgba(194, 142, 34, 1)', color: 'white' }}
                            label='In Review' />
                    }
                    {publish_status(row.status) === 2 &&
                    <Chip className='repository-chip'
                          style={{ backgroundColor: 'rgba(194, 142, 34, 1)', color: 'white' }}
                          label='Ready for Publish' />
                    }
                    {publish_status(row.status) === 3 &&
                        <Chip className='repository-chip'
                            style={{ backgroundColor: '#737373', color: 'white' }}
                            label='Draft' />
                    }
                </TableCell>
                <TableCell>
                    <Link to={'edit/' + row.id}>
                        <Button size="small" variant="contained" fullWidth className="large-button">Edit</Button>
                    </Link>
                </TableCell>
                <TableCell>
                    <Link to={'preview/' + row.id}>
                        <Button size="small" variant="contained" fullWidth className="large-button">Preview</Button>
                    </Link>
                </TableCell>
            </TableRow>
        ))
    );
};

const publish_status = (value) => {
        switch (value) {
            case 'Published':
                return 0;
            case 'In Review':
                return 1;
            case 'Ready for Publish':
                return 2;
            default:
                return 3;
        }
    }

export default RepositoryManagementHome;
