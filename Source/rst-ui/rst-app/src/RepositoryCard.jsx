// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";
import { Link } from "react-router-dom";
// import ReactTextCollapse from "react-icon-collapse";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import QuickView from "./quick_view/QuickView";

import RepoIconImg from "./RepoIconImg";

/*const TEXT_COLLAPSE_OPTIONS = {
    collapse: false,
    collapseText: '... show more',
    expandText: 'show less',
    minHeight: 90,
    maxHeight: 200,
    textStyle: {
        color: 'blue',
        fontSize: '20px',
    },
};*/

const RepositoryCard = ({ repository, compareIds, handleAddToCompare, ...props }) => {
    //// console.log("Props: ");
    //// console.log(props);
    //// console.log(repository);
    const isCompareDisabled = () => {
        return compareIds.length >= 3 && !compareIds.includes(repository['name']);
    }
    // repository['metadata_required'] ? 'grey-icon' : 'green-icon'
    return (
        <Grid container spacing={1} className='repository-card'>
            <Grid >
                <Link to={'/repositories/' + repository['id']}>
                    <RepoIconImg altText={repository.name + " logo"} imageUri={'repo_logos/' + repository.name + '.png'}/>
                </Link>
            </Grid>

            <Grid xs={11}>
                <div style={{ float: 'right'}}>
                    <FormGroup>
                        <FormControlLabel
                            label="Compare"
                            control={<Checkbox disabled={isCompareDisabled()} onChange={handleAddToCompare} id={repository['name']}/>}
                        />
                    </FormGroup>
                </div>

                <Link to={'/repositories/' + repository['id']}>

                    {repository['nickname']
                        ? <><Typography className="repository-name" color="text.primary" gutterBottom>
                            {repository['name']} ({repository['nickname']})
                        </Typography></>
                        : <><Typography className="repository-name" color="text.primary" gutterBottom>
                            {repository['name']}
                        </Typography></>
                    }
                </Link>

                {(repository.affiliations && repository.affiliations.length) && repository.affiliations.map(affiliation =>
                    <Typography key={repository.id + '-affiliation-' + affiliation.id} variant='body2'>
                        <b>Affiliation</b>: {affiliation['name']}
                    </Typography>
                )}
            </Grid>

            <Grid xs={12} container direction="column">
                <Grid xs={12} className='repository-card-description'>
                    <Typography variant="value" >
                        {repository['description']}
                    </Typography>
                </Grid>

                <Grid xs={12}>
                    <b>Organisms: </b>
                    {repository?.organisms?.map(organism =>
                        <Chip className='repository-chip'
                                style={{ backgroundColor: '#2D5567', color: 'white' }}
                                key={'chip-' + repository.id + '-organism-' + organism.id}
                                label={organism['name']} />
                    )}
                </Grid>

                <Grid xs={12}>
                    <b>Research Areas: </b>
                    {repository?.research_areas?.map(research_area =>
                        <Chip className='repository-chip'
                                style={{ backgroundColor: '#2D5567', color: 'white' }}
                                key={'chip-' + repository.id + '-ra-' + research_area.id}
                                label={research_area['name']} />
                    )}
                </Grid>

                <Grid xs={12} style={{ marginBottom: '20px' }}>
                    <b>Data Types: </b>
                    {repository?.data_types?.map(data_type =>
                        <Chip className='repository-chip'
                                style={{ backgroundColor: '#737373', color: 'white' }}
                                key={'chip-' + repository.id + '-dt-' + data_type.id}
                                label={data_type['name']} />
                    )}
                </Grid>
            </Grid>

            <QuickView repository={repository} split={true} />

            <Grid xs={12} container className="repository-card-buttons">
                <div>
                    <Link to={'/repositories/' + repository['id']}>
                        <Button size="small" variant="contained" fullWidth className="large-button">View Repository Details</Button>
                    </Link>
                </div>

                <div>
                    <a href={repository['url']} target="_blank" rel="noreferrer">
                        <Button size="small" fullWidth variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">Visit Repository</Button>
                    </a>
                </div>

                { repository.fairsharing_url &&
                    <div>
                        <a href={repository['fairsharing_url']} target="_blank" rel="noreferrer">
                            <Button size="small" fullWidth variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">Visit on FAIRsharing</Button>
                        </a>
                    </div>
                }
            </Grid>
        </Grid>
    );
}

export default RepositoryCard;
