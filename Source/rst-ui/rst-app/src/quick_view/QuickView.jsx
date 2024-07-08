// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import {MonetizationOn, Folder, AccountCircle, Lock, LockOpen, Storage, Badge} from '@mui/icons-material';

const requiredValue = (value, inverse) => {
    if (inverse) {
        switch (value) {
            case false:
                return 0;
            case true:
                return 1;
            default:
                return 2;
        }
    }

    switch (value) {
        case true:
            return 0;
        case false:
            return 1;
        default:
            return 2;
    }
};

const colorClasses = ['green-icon', 'grey-icon', 'orange-icon'];

const access = ['Controlled access option', 'No controlled access option', 'Unclear access controls'];
const metadata = ['Metadata required', 'No metadata required', 'Unclear if metadata required'];
const dataLimited = ['Data volume limitations', 'No data volume limitations', 'Unclear data volume limitations'];
const individual = ['Accepts individual-level data', 'Does not accept individual-level data', 'Unclear if accepts individual level data'];
const persistentId = ['Persistent ID used for datasets', 'No persistent ID used', 'Unclear if persistent ID used'];
const cost = ['Fee for submission', 'No fee for submission', 'Unclear if fee for submission'];

const QuickView = ({ repository, split=false, ...props }) => {
    const gridSize = split ? 6 : 12;

    return ( <React.Fragment>
        <Grid container spacing={1}>
            <Grid xs={gridSize}
                    display="flex"
                    alignItems="center"
            >
                {requiredValue(repository['data_access_controlled']) === 0 &&
                    <Lock className={'green-icon'} />
                }
                {requiredValue(repository['data_access_controlled']) === 1 &&
                    <LockOpen className={'green-icon'} />
                }
                {requiredValue(repository['data_access_controlled']) === 2 &&
                    <Lock className={'orange-icon'} />
                }

                <Typography className='repository-card-info-note'>
                    {access[requiredValue(repository['data_access_controlled'])]}
                </Typography>
            </Grid>

            <Grid xs={gridSize}
                    display="flex"
                    alignItems="center"
            >
                <Folder className={colorClasses[requiredValue(repository['metadata_required'])]} />
                <Typography className='repository-card-info-note'>
                    {metadata[requiredValue(repository['metadata_required'])]}
                </Typography>
            </Grid>

            <Grid xs={gridSize}
                    display="flex"
                    alignItems="center"
            >
                <Storage className={colorClasses[requiredValue(repository['data_volume_limited'], true)]} />
                <Typography className='repository-card-info-note'>
                    {dataLimited[requiredValue(repository['data_volume_limited'])]}
                </Typography>
            </Grid>

            <Grid xs={gridSize}
                    display="flex"
                    alignItems="center"
            >
                <AccountCircle className={colorClasses[requiredValue(repository['accepts_individual_data'])]} />
                <Typography className='repository-card-info-note'>
                    {individual[requiredValue(repository['accepts_individual_data'])]}
                </Typography>
            </Grid>

            <Grid xs={gridSize}
                    display="flex"
                    alignItems="center"
            >
                <Badge className={colorClasses[requiredValue(repository['persistent_id_used'])]} />
                <Typography className='repository-card-info-note'>
                    {persistentId[requiredValue(repository['persistent_id_used'])]}
                </Typography>
            </Grid>

            <Grid xs={gridSize}
                    display="flex"
                    alignItems="center"
            >
                <MonetizationOn className={colorClasses[requiredValue(repository['cost_to_submit'], true)]} />
                <Typography sx={{textAlign: 'center'}} className='repository-card-info-note'>
                    {cost[requiredValue(repository['cost_to_submit'])]}
                </Typography>
            </Grid>
        </Grid>
    </React.Fragment> );
}

export default QuickView;
