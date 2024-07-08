// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const requiredValue = (value) => {

    switch (value) {
        case true:
            return 0;
        case false:
            return 1;
        default:
            return 2;
    }
};

const RepositoryDetails = (props) => {
    return ( <React.Fragment>
        <h3>Brief Description</h3>
        <div>
            {props.repository.description}
        </div>
        <br />

        <div style={{ marginBottom: '10px' }}>
            <b>Organisms: </b>
            {props.repository.organisms && props.repository.organisms.map(organism =>
                <Chip className='repository-chip' style={{ backgroundColor: '#2D5567', color: 'white' }} key={organism.id} label={organism['name']} />
            )}
            {props.repository.new_organisms && props.repository.new_organisms.map(org =>
                <Chip className='repository-chip' style={{ backgroundColor: '#2D5567', color: 'white' }} key={org} label={org} />
            )}
            <br />
        </div>

        <div style={{ marginBottom: '10px' }}>
            <b>Research Areas: </b>
            {props.repository.research_areas && props.repository.research_areas.map(research_area =>
                <Chip className='repository-chip' style={{ backgroundColor: '#2D5567', color: 'white' }} key={research_area.id} label={research_area['name']} />
            )}
            {props.repository.new_research_areas && props.repository.new_research_areas.map(ra =>
                <Chip className='repository-chip' style={{ backgroundColor: '#2D5567', color: 'white' }} key={ra} label={ra} />
            )}
            <br />
        </div>

        <div style={{ marginBottom: '10px' }}>
            <b>Data Types: </b>
            {props.repository.data_types && props.repository.data_types.map(data_type =>
                <Chip className='repository-chip' style={{ backgroundColor: '#737373', color: 'white' }} key={data_type.id} label={data_type['name']} />
            )}
            {props.repository.new_data_types && props.repository.new_data_types.map(dt =>
                <Chip className='repository-chip' style={{ backgroundColor: '#737373', color: 'white' }} key={dt} label={dt} />
            )}
            <br />
            <br />
        </div>

        <h3>Data Access Controls</h3>
        { (() => {
            if (props.repository.data_access_controlled) {
                return( <span>Yes. {props.repository.data_access_controlled_description}</span> );
            } else if( props.repository.data_access_controlled === null ) {
                return( <span>Unclear data access controls. {props.repository.data_access_controlled_description}</span> );
            } else {
                return( <span>No. {props.repository.data_access_controlled_description}</span> );
            }
        })() }
        { props.repository.data_access_controlled_url &&
        <div style={{padding: '5px'}}>
            <a href={props.repository['data_access_controlled_url']} target="_blank" rel="noreferrer">
                <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                    Learn More
                </Button>
            </a>
        </div>
        }

        <h3>Metadata Requirements</h3>
        <div>
            { (() => {
                if (props.repository.metadata_required) {
                    return( <span>Yes. {props.repository.metadata_required_description}</span> );
                } else if( props.repository.metadata_required === null ) {
                    return( <span>Unclear metadata requirements. {props.repository.metadata_required_description}</span> );
                } else {
                    return( <span>No. {props.repository.metadata_required_description}</span> );
                }
            })() }
            { props.repository.metadata_required_url &&
                <div style={{padding: '5px'}}>
                    <a href={props.repository['metadata_required_url']} target="_blank" rel="noreferrer">
                        <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                            Learn More
                        </Button>
                    </a>
                </div>
            }
        </div>

        <h3>Data Volume Limitations</h3>

        {requiredValue(props.repository.data_volume_limited) === 0 &&
            <span>Yes. </span>
        }
        {requiredValue(props.repository.data_volume_limited) === 1 &&
            <span>No limitations. </span>
        }
        {requiredValue(props.repository.data_volume_limited) === 2 &&
            <span>Unclear data volume limitations. </span>
        }

        {props.repository.data_volume_description &&
            <><span>{props.repository.data_volume_description}</span></>
        }

        { props.repository.data_volume_url &&
        <div style={{padding: '5px'}}>
            <a href={props.repository['data_volume_url']} target="_blank" rel="noreferrer">
                <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                    Learn More
                </Button>
            </a>
        </div>
        }

        <h3>Individual-level Data</h3>
        <div>
            { (() => {
                if (props.repository.accepts_individual_data) {
                    return( <span>Yes. {props.repository.accepts_individual_description}</span> );
                } else if( props.repository.accepts_individual_data === null ) {
                    return( <span>Unclear. {props.repository.accepts_individual_description}</span> );
                } else {
                    return( <span>No. {props.repository.accepts_individual_description}</span> );
                }
            })() }
            { props.repository.accepts_individual_url &&
                <div style={{padding: '5px'}}>
                    <a href={props.repository['accepts_individual_url']} target="_blank" rel="noreferrer">
                        <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                            Learn More
                        </Button>
                    </a>
                </div>
            }
        </div>

        <h3>Dataset-level Persistent IDs Used</h3>
        { (() => {
            if (props.repository.persistent_id_used) {
                return( <span>Yes. {props.repository.persistent_id_description}</span> );
            } else if( props.repository.persistent_id_used === null ) {
                return( <span>Unclear. {props.repository.persistent_id_description}</span> );
            } else {
                return( <span>No. {props.repository.persistent_id_description}</span> );
            }
        })() }

        {props.repository.persistent_id_url &&
        <div style={{paddingTop: '15px'}}>
            <a href={props.repository['persistent_id_url']} target="_blank" rel="noreferrer">
                <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                    Learn More
                </Button>
            </a>
        </div>
        }

        <h3>Fee for Submission</h3>
        <div>
            { (() => {
                if (props.repository.cost_to_submit) {
                    return( <span>Yes. {props.repository.costs_for_submit_description}</span> );
                } else if( props.repository.cost_to_submit === null ) {
                    return( <span>Unclear. {props.repository.costs_for_submit_description}</span> );
                } else {
                    return( <span>No. {props.repository.costs_for_submit_description}</span> );
                }
            })() }
            {props.repository.costs_for_submission_url &&
            <div style={{paddingTop: '15px'}}>
                <a href={props.repository['costs_for_submission_url']} target="_blank" rel="noreferrer">
                    <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                        Learn More
                    </Button>
                </a>
            </div>
            }
        </div>

        <h3>Data Submission Requirements</h3>
        {props.repository.data_submission_reqs
            ? <><span>Yes.</span></>
            : <><span>None listed.</span></>
        }
        {props.repository.data_submission_reqs_description &&
            <div style={{whiteSpace: "pre-wrap"}}>{props.repository.data_submission_reqs_description}</div>
        }
        {props.repository.data_submission_reqs_url &&
            <div style={{paddingTop: '15px'}}>
                <a href={props.repository['data_submission_reqs_url']} target="_blank" rel="noreferrer">
                    <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                        Learn More
                    </Button>
                </a>
            </div>
        }


            <div style={{ marginBottom: '10px' }}>

                <h3>Accepted Data Formats</h3>
                { props.repository.data_formats &&
                props.repository.data_formats.map(data_format =>
                    <span>{data_format['name']}, </span>
                )}
                {props.repository.new_data_formats && props.repository.new_data_formats.map(df =>
                    <span>{df}, </span>
                )}
                {props.repository.data_formats &&
                <><br/><br/></>
                }
                { props.repository.formats_accepted_description &&
                    <><span>{props.repository.formats_accepted_description}</span><br/><br/></>
                }
            </div>

            {props.repository.formats_accepted_url &&
                <div style={{padding: '5px'}}>
                    <a href={props.repository['formats_accepted_url']} target="_blank" rel="noreferrer">
                        <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                            Learn More
                        </Button>
                    </a>
                </div>
            }

        <div style={{ marginBottom: '10px' }}>
            <h3>Data Submission Agreement or Institutional Certification Required</h3>
            {requiredValue(props.repository.dua_or_cert_required) === 0 &&
            <span>Yes. </span>
            }
            {requiredValue(props.repository.dua_or_cert_required) === 1 &&
            <span>No. </span>
            }
            {requiredValue(props.repository.dua_or_cert_required) === 2 &&
            <span>Unclear agreement requirements. </span>
            }

            <span>{props.repository.dua_or_cert_required_description}</span>

            <br />
            <br />
        </div>

        {props.repository.dua_or_cert_required_url &&
        <div style={{padding: '5px'}}>
            <a href={props.repository['dua_or_cert_required_url']} target="_blank" rel="noreferrer">
                <Button size="small" variant="contained" startIcon={<OpenInNewIcon/>} className="large-button">
                    Learn More
                </Button>
            </a>
        </div>
        }

    </React.Fragment> );
}

export default RepositoryDetails;
