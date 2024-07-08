// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import {Link, useParams} from 'react-router-dom';
import React, {useState} from "react";

import Grid from "@mui/material/Unstable_Grid2";
import QuickGlance from "./QuickGlance";
import RepositoryDetails from "./RepositoryDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RepoIconImg from "../RepoIconImg";
import Box from "@mui/material/Box";
import ErrorBoundary from "../error_handling/ErrorBoundary";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const RepositoryHomePage = (props) => {
    const params = useParams();
    const [state, setState] = useState({repository: [], DataisLoaded: false});

    const isPreviewMode = props.repository;

    React.useEffect( () => {
        if(!isPreviewMode) {
            //TODO: use props to select proper URL request
            var requestUrl = process.env.REACT_APP_API_BASE_URL + "repositories/" + params.id;
            //if (this.props.facet == "branches") requestUrl += "/branches";

            fetch(requestUrl)
                .then(response => response.json())
                .then((responseJson) => {
                    setState({
                        DataisLoaded: true,
                        repository: responseJson
                    });
                })
        } else {
            setState({
                DataisLoaded: true,
                repository: props.repository
            });
        }
    }, [params.id]);

    if (state.DataisLoaded) {
        return ( <React.Fragment>
            <main>
                <div>
                    <Box className='repository-page'>
                        <Grid container>
                            <Grid xs={3} container spacing={3} style={{ alignContent: 'flex-start', marginTop: '5px', paddingLeft: '7px' }}>
                                <Grid style={{ margin: '0px -10px 0 0' }}>
                                    <RepoIconImg altText={state.repository.name + " logo"} imageUri={'repo_logos/' + state.repository.name + '.png'}/>
                                </Grid>

                                <Grid xs={9}>
                                    { state.repository['nickname']
                                        ? <><h2 style={{ margin: '0px' }}>
                                            {state.repository['name']} ({state.repository['nickname']})
                                            </h2></>

                                        : <><h2 style={{ margin: '0px' }}>
                                            {state.repository['name']}
                                        </h2></>
                                    }

                                </Grid>

                                <Grid xs={12}>
                                    {(state.repository.affiliations && state.repository.affiliations.length) && state.repository.affiliations.map(affiliation =>
                                        <Typography variant='body2' key={state.repository.id + '-affiliation-' + affiliation.id}>
                                            <b>Affiliation</b>: {affiliation['name']}
                                        </Typography>
                                    )}
                                    {state.repository.new_affiliations && state.repository.new_affiliations.map(affiliation =>
                                        <Typography variant='body2' key={state.repository.id + '-affiliation-' + affiliation.id}>
                                            <b>Affiliation</b>: {affiliation}
                                        </Typography>
                                    )}
                                </Grid>

                                <Grid xs={12}>
                                    <Typography variant='body2'><b>Contact</b></Typography>
                                    { state.repository['help_url'].startsWith('http')
                                        ? <a href={state.repository['help_url']}>Contact Webpage</a>
                                        : <>{state.repository['help_url']}</>
                                    }
                                </Grid>

                                <Grid xs={12}>
                                    <QuickGlance repository={state.repository}></QuickGlance>
                                </Grid>

                                <Grid xs={12}>
                                    <a href={state.repository['url']} target="_blank" rel="noreferrer">
                                        <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} style={{ marginBottom: '15px' }} className="large-button">
                                            Visit Repository
                                        </Button>
                                    </a>
                                    <br />

                                    {state.repository.fairsharing_url &&
                                        <a href={state.repository['fairsharing_url']} target="_blank" rel="noreferrer">
                                            <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} style={{ marginBottom: '15px' }} className="large-button">
                                                Visit on FAIRsharing
                                            </Button>
                                        </a>
                                    }
                                </Grid>
                            </Grid>

                            <Grid xs={9}>
                                <ErrorBoundary fallback={<p>Oops, an error occurred with displaying this repositories details! Please contact an administrator.</p>}>
                                <RepositoryDetails repository={state.repository}></RepositoryDetails>
                                </ErrorBoundary>
                            </Grid>
                        </Grid>

                        <div style={{float: 'right'}}>
                            <Link to={'/'}>
                                <Button size="small" variant="contained" fullWidth className="large-button">Back to search</Button>
                            </Link>
                        </div>
                        <br/>
                    </Box>
                </div>
            </main>
        </React.Fragment> );
    }

};

export default RepositoryHomePage;
