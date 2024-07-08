// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import {useNavigate, useParams} from "react-router";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RepositoryHomePage from "../repo_details/RepositoryHomePage";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

function RepositoryPreviewPage(props) {
    let params = useParams();
    // console.log(params);

    const {id} = params;

    return ( <React.Fragment>
            <div>
                <MainContent authString={props.authString} id={id}/>
            </div>
    </React.Fragment>);
}



const MainContent = (props) => {
    const navigate = useNavigate();
    const [repository, setRepository] = useState();
    const [DataisLoaded, setDataisLoaded] = useState(false);

    const [open, setOpen] = React.useState(false);

    React.useEffect( () => {
        if(!props.authString) {
            console.log("not logged in");
            navigate("/login");
        } else {
            var requestUrl = process.env.REACT_APP_API_BASE_URL + 'admin/repositories/extended/' + props.id;

            fetch(requestUrl, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${props.authString}`
                })
            })
                .then(response => response.json())
                .then((responseJson) => {
                    setRepository(responseJson);
                    setDataisLoaded(true);
                })
        }
    }, [navigate, props.authString, props.id]);

    const handlePublishOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handlePublish= () => {
        setOpen(false);

            const requestUrl = process.env.REACT_APP_API_BASE_URL + 'admin/repositories/' + repository.id + '/ready';

            return fetch(requestUrl, {
                mode: 'cors',
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${props.authString}`
                }),
                body: JSON.stringify(repository)
            })
                .then(response => {
                    if(response.ok) {
                        return response.json();
                    }
                    throw new Error("Error marking repo ready for publish!");
                })
                .then(data => {
                        let repo = data;
                        let id = repo.id;
                        navigate('/repositories/management/accepted-publish');
                    })
                .catch((error) => {
                    console.log(error);
                });
    }



    function markReady(repository_id, authString) {
        const requestUrl = process.env.REACT_APP_API_BASE_URL + 'admin/repositories/' + repository_id + '/review';

        return fetch(requestUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`
            })
        })
            .then(data => data.json())
            .then(data => {
                    let repo = data;
                    let id = repo.id;
                    navigate('/repositories/management/accepted');
                }
            )
    }

    function markPublishReady() {
        handlePublishOpen();
    }

    if (DataisLoaded) {
        return (
            <React.Fragment>
                <Box className='repository-preview-wrapper'>
                    <Box className='repository-preview-box'>
                        <div className='repository-management-title'>
                            <span style={{marginLeft: '40px'}}>You are previewing your data repository submission</span>
                            {repository.status === "Published"
                                ? <Typography variant='body2' style={{marginLeft: '40px'}}>
                                    Your edits have been published! You can see the new repository details below.
                                </Typography>
                                : <Typography variant='body2' style={{marginLeft: '40px'}}>
                                    Please review the repository submission. If there is missing or incorrect
                                    information you can select "Edit" to go back to editing the data submission. If
                                    everything
                                    looks good you can select "Mark ready for review" and subsequently
                                    an administrator will review your submission and determine if it is ready to be
                                    published.
                                    Note that repository logos/icons
                                    are not currently uploadable via this tool - so you will need to coordinate logo
                                    upload
                                    with the site.
                                </Typography>
                            }
                        </div>

                        <div style={{marginTop: '25px', height: '35px'}}>
                            <div style={{float: 'right'}}>
                                <Link to={'/repositories/management/edit/' + props.id}>
                                    <Button size="small" variant="contained"
                                            style={{backgroundColor: '#E0A800'}}>Edit</Button>
                                </Link>

                                {repository.status === "In Review"
                                    && <Button onClick={(e) => {
                                        markPublishReady(props.id, props.authString)
                                    }} size="small" variant="contained"
                                              style={{marginLeft: '20px', backgroundColor: 'rgb(45, 85, 103)'}}>
                                        Mark Ready for Publish
                                    </Button>
                                }
                                {repository.status === "Draft"
                                    && <Button onClick={(e) => {
                                        markReady(props.id, props.authString)
                                    }} size="small" variant="contained"
                                              style={{marginLeft: '20px', backgroundColor: 'rgb(45, 85, 103)'}}>
                                        Mark Ready for Review
                                    </Button>
                                }

                                {repository.status === "Ready for Publish"
                                && <Button onClick={(e) => {
                                    markReady(props.id, props.authString)
                                }} size="small" variant="contained"
                                           style={{marginLeft: '20px', backgroundColor: 'rgb(45, 85, 103)'}}>
                                    Send Back to Review
                                </Button>
                                }

                                <Link to={'/repositories/management'}>
                                    <Button size="small" variant="contained"
                                            style={{marginLeft: '20px', backgroundColor: 'rgb(45, 85, 103)'}}>Back to
                                        Management Home</Button>
                                </Link>
                            </div>
                        </div>

                        <Dialog onClose={handleClose} open={open}>
                            <DialogTitle>Confirm Ready To Publish</DialogTitle>
                            <DialogContent>
                                <div>
                                    Taking this action will add the following new options to the filters: <br/>
                                    <div style={{ marginBottom: '10px' }}>
                                        <b>Organisms: </b>
                                        {repository.new_organisms && repository.new_organisms.map(organism => organism + ', ')}
                                        <br />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <b>Research Areas: </b>
                                        {repository.new_research_areas && repository.new_research_areas.map(ra => ra + ', ')}
                                        <br />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <b>Data Types: </b>
                                        {repository.new_data_types && repository.new_data_types.map(dt => dt + ', ')}
                                        <br />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <b>Data Formats: </b>
                                        {repository.new_data_formats && repository.new_data_formats.map(df => df + ', ')}
                                        <br />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <b>Affiliations: </b>
                                        {repository.new_affiliations && repository.new_affiliations.map(aff => aff + ', ')}
                                        <br />
                                    </div>
                                </div>
                                <DialogContentText id="alert-dialog-description">

                                    Click 'Yes' to mark your repository ready to publish.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button id='accept_publish_yes_button' onClick={handleClose} >No</Button>
                                <Button id='accept_publish_no_button' onClick={handlePublish} autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <RepositoryHomePage repository={repository}/>
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default RepositoryPreviewPage;
