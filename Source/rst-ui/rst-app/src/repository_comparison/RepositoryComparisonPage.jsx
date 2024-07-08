// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import * as React from 'react';
import {useState} from "react";
import {
    Link,
    useSearchParams
} from 'react-router-dom';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import QuickView from "../quick_view/QuickView";
import RepoIconImg from "../RepoIconImg";

const RespositoryComparisonPage = () => {

    const [state, setState] = useState({repositories: [], DataisLoaded: false});
    const [compare/*, setCompare*/] = useSearchParams();

    React.useEffect( () => {
        if(compare.get('repo1')) {
            var requestUrl = process.env.REACT_APP_API_BASE_URL + "repositories/compare?repo1=" + compare.get('repo1');

            if(compare.get('repo2')){
                requestUrl += "&repo2=" + compare.get('repo2')
            }

            if(compare.get('repo3')){
                requestUrl += "&repo3=" + compare.get('repo3')
            }

            fetch(requestUrl)
                .then(response => response.json())
                .then((responseJson) => {
                    setState({
                        DataisLoaded: true,
                        repositories: responseJson.repositories,
                    });
                })
        }

    }, [compare]);

    const ComparisonItem = ({ repository }) => {
        return (<div>
            <Grid container>
                <Link to={'/repositories/' + repository['id']}>
                    <Grid xs={2} style={{ maxWidth: '60px' }}>
                            <RepoIconImg altText={repository.name + " logo"} imageUri={'repo_logos/' + repository.name + '.png'}/>
                    </Grid>

                    <Grid xs={10}>
                            <Typography className="repository-name" color="text.primary" gutterBottom>
                                {repository.name}
                            </Typography>
                    </Grid>
                </Link>
            </Grid>

            <Divider />
            <br/>

            {(repository.affiliations && repository.affiliations.length) && repository.affiliations.map(affiliation =>
                <Typography key={repository.id + '-affiliation-' + affiliation.id} variant='body2'>
                    <b>Affiliation</b>: {affiliation['name']}
                </Typography>
            )}
            <br/><br/>

            <QuickView repository={repository} />
            <br/><br/>

            <div>
                <Typography sx={{ fontWeight: 'bold' }}>Brief Description</Typography>
                {repository.description}
                <br/>
                <br/>
                <br/>

                <div style={{ marginBottom: '10px' }}>
                    <b>Organisms: </b>
                    {repository.organisms.map(organism =>
                        <Chip className='repository-chip'
                                style={{ backgroundColor: '#2D5567', color: 'white' }}
                                key={'chip-' + repository.id + '-organism-' + organism.id}
                                label={organism['name']} />
                    )}
                    <br />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <b>Research Areas: </b>
                    {repository.research_areas.map(research_area =>
                        <Chip className='repository-chip'
                                style={{ backgroundColor: '#2D5567', color: 'white' }}
                                key={'chip-' + repository.id + '-ra-' + research_area.id}
                                label={research_area['name']} />
                    )}
                    <br />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <b>Data Types: </b>
                    {repository.data_types.map(data_type =>
                        <Chip className='repository-chip'
                                style={{ backgroundColor: '#737373', color: 'white' }}
                                key={'chip-' + repository.id + '-dt-' + data_type.id}
                                label={data_type['name']} />
                    )}
                    <br />
                    <br />
                </div>

                <h3>Accepted Data Formats</h3>
                {   repository.data_formats &&
                repository.data_formats.map(data_format =>
                    <span>{data_format['name']}, </span>
                )
                }
                {repository.data_formats &&
                    <><br/><br/></>
                }

                {repository.formats_accepted_description &&
                    <span>{repository.formats_accepted_description}</span>
                }


            </div>
        </div>);
    }

    if(state.DataisLoaded) {
        return ( <React.Fragment>
                <main>
                    <div>
                        <Box className='repository-comparison'>
                            <Grid container spacing={1}>
                                {state.repositories.map((repository) => {
                                    let endStyle = state.repositories.at(0) === repository ? { borderLeft: 'none' } : {};
                                    endStyle = state.repositories.at(-1) === repository ? { borderRight: 'none' } : endStyle;

                                    let colWidth = state.repositories.length < 3 ? 6 : 4;

                                    return (
                                        <Grid xs={colWidth} className='repository-comparison-column' style={endStyle} key={'comparison-column-' + repository.id}>
                                            <ComparisonItem repository={repository} />
                                        </Grid>
                                    );
                                })}
                            </Grid>

                            <div style={{ float: 'right', margin: '40px 30px' }}>
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

export default RespositoryComparisonPage;
