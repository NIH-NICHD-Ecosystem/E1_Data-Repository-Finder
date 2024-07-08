// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React, {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {Controller, useForm} from "react-hook-form";

import "yup-phone";
import {useNavigate, useParams} from "react-router";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import ManagementFacetSelector from "./ManagementFacetSelector.jsx";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

function RepositoryAddEditPage(props) {
    let params = useParams();
    console.log(params);

    const { id } = params;


    return ( <React.Fragment>
        <main>
            <div>
                <MainContent authString={props.authString} id={id}/>
            </div>
        </main>
    </React.Fragment> );


}

const MainContent = (props) => {
    const [repository, setRepository] = useState({});
    const [DataisLoaded, setDataisLoaded] = useState(false);

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [submittedData, setSubmittedData] = useState([]);

    const isEditMode = props.id;

    Yup.addMethod(Yup.MixedSchema, "oneOfSchemas", function (schemas: Yup.AnySchema[]) {
        return this.test(
            "one-of-schemas",
            "Enter valid url or e-mail address. URL must contain protocol (http:// or https://) and be a valid web address",
            (item) =>
                schemas.some((schema) => schema.isValidSync(item, { strict: true }))
        );
    });

    const publishableValidationSchema = Yup.object().shape({
        registering_name: Yup.string()
            .max(256, 'Name can not exceed 256 characters'),
        registering_phone: Yup.string(),
        registering_email: Yup.string()
            .email('Email is invalid'),
        name: Yup.string()
            .required('Repository name is required')
            .max(256, 'Repository name can not exceed 256 characters'),
        nickname: Yup.string()
            .max(20, 'Repository short name can not exceed 20 characters'),
        description: Yup.string()
            .required('Description of repository is required'),
        url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address')
            .required('Repository URL is required'),
        help_url: Yup.mixed()
            .oneOfSchemas([
                Yup.string().url('Enter valid url or e-mail address. URL must contain protocol (http:// or https://) and be a valid web address'),
                Yup.string().email('Enter valid email')
            ])
            .required('Repository help URL or e-mail is required'),

        metadata_required: Yup.string()
            .required("A radio option is required"),
        metadata_required_description: Yup.string(),
        metadata_required_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        cost_to_submit: Yup.string()
            .required("A radio option is required"),
        costs_for_submit_description: Yup.string(),
        costs_for_submission_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        dua_or_cert_required: Yup.string()
            .required("A radio option is required"),
        dua_or_cert_required_description: Yup.string(),
        dua_or_cert_required_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        accepts_individual_data: Yup.string()
            .required("A radio option is required"),
        accepts_individual_description: Yup.string(),
        accepts_individual_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        data_access_controlled: Yup.string()
            .required("A radio option is required"),
        data_access_controlled_description: Yup.string(),
        data_access_controlled_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        data_volume_limited: Yup.string()
            .required("A radio option is required"),
        data_volume_description: Yup.string(),
        data_volume_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        persistent_id_used: Yup.string()
            .required("A radio option is required"),
        persistent_id_description: Yup.string(),
        persistent_id_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        on_fairsharing: Yup.string()
            .required("A radio option is required"),
        fairsharing_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        generalist: Yup.string()
            .required("A radio option is required"),
        data_submission_reqs: Yup.string()
            .required("A radio option is required"),
        data_submission_reqs_description: Yup.string(),
        data_submission_reqs_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        format_accepted_url: Yup.string().url('Enter valid url. Must contain protocol (http:// or https://) and be a valid web address'),
        new_data_formats: Yup.string().when("data_formats", {
            is: dataFormatsId => dataFormatsId.length === 0,
            then: Yup.string().required("Enter or select at least one data format."),
            otherwise: Yup.string()
        }),
        new_organisms: Yup.string().when("organisms", {
            is: organismId => organismId.length === 0,
            then: Yup.string().required("Enter or select at least one organism."),
            otherwise: Yup.string()
        }),
        new_data_types: Yup.string().when("data_types", {
            is: dataTypesId => dataTypesId.length === 0,
            then: Yup.string().required("Enter or select at least one data type."),
            otherwise: Yup.string()
        }),
        new_research_areas: Yup.string().when("research_areas", {
            is: raId => raId.length === 0,
            then: Yup.string().required("Enter or select at least one data type."),
            otherwise: Yup.string()
        }),
        new_affiliations: Yup.string().when("affiliations", {
            is: affId => affId.length === 0,
            then: Yup.string().required("Enter or select at least one organization."),
            otherwise: Yup.string()
        }),
        affiliations: Yup.array().when("new_affiliations", {
            is: "",
            then: Yup.array()
                .min(1, 'You must select or enter at least 1 organization'),
            otherwise: Yup.array()
        }),
        data_formats: Yup.array().when("new_data_formats", {
            is: "",
            then: Yup.array()
                .min(1, 'You must select or enter at least 1 data format'),
            otherwise: Yup.array()
        }),
        data_types: Yup.array().when("new_data_types", {
            is: "",
            then: Yup.array()
                .min(1, 'You must select or enter at least 1 data type'),
            otherwise: Yup.array()
        }),
        organisms: Yup.array().when("new_organisms", {
            is: "",
            then: Yup.array()
                .min(1, 'You must select or enter at least 1 organism'),
            otherwise: Yup.array()
        }),
        research_areas: Yup.array().when("new_research_areas", {
            is: "",
            then: Yup.array()
                .min(1, 'You must select or enter at least 1 organism'),
            otherwise: Yup.array()
        }),
        status: Yup.mixed().oneOf(['Draft', 'In Review', 'Published', 'Ready for Publish']),
        change_log_comment: Yup.string().test("change-log",
            "Must enter justification of changes",
            (value, context) => {
                if (!isEditMode) {
                    return true; // Not required for add
                } else { // required for edit
                    if (value === ""){
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            )
    }, [["data_formats", "new_data_formats"], ["affiliations", "new_affiliations"], ["data_types", "new_data_types"], ["organisms", "new_organisms"], ["research_areas", "new_research_areas"]]);

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: yupResolver(publishableValidationSchema)
    });

    const convertValues = (value) => {
        var values = [];
        for (let i=0; i<value.length; i++) {
            // console.log(value[i]);
            var id = value[i].id;
            values.push(id)
        }

        return values;
    };

    const processData = (data) => {
        let processedData = {};
        Object.keys(data).forEach((key) => {
            if(data[key] !== null && data[key] !== undefined & data[key] !== 'null' && data[key] !== "") {
                processedData[key] = data[key];
            }
        })
        console.log(processedData);
        return processedData;
    }

    const onSubmit = (data) => {
        console.log("Submitted!");
        console.log(data);


        if(publish_status(repository.status) === 0 || publish_status(repository.status) === 2) {
            // Load dialog asking for confirm of publish

            setSubmittedData(data);
            handlePublishOpen();
        }

        else {
            return isEditMode
                ? updateRepository(props.id, data, props.authString)
                : createRepository(data, props.authString);
        }
    }

    function createRepository(data, authString) {
        const requestUrl = process.env.REACT_APP_API_BASE_URL + 'admin/repositories/add';

        // Remove fields with null and empty values from the request
        let processedData = processData(data);

        return fetch(requestUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`
            }),
            body: JSON.stringify(processedData)
        })
            .then(data => data.json())
            .then(data => {
                    let repo = data;
                    let id = repo.id;
                    navigate('/repositories/management/preview/' + id);
                }
            )
    }

    function updateRepository(id, data, authString) {
        const requestUrl = process.env.REACT_APP_API_BASE_URL + 'admin/repositories/' + id + '/update';

        return fetch(requestUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`
            }),
            body: JSON.stringify(data)
        })
            .then(data => {data.json(); navigate('/repositories/management/preview/' + id);})
    }

    const handlePublishOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    function handlePublishEdits() {
        //console.log("handlePublish ");
        setOpen(false);

        //console.log('closing dialog');
        return updateRepository(props.id, submittedData, props.authString)
    }

    React.useEffect( () => {
        if(!props.authString) {
            navigate("/login");
        } else if(isEditMode) {
            //TODO: use props to select proper URL request
            var requestUrl = process.env.REACT_APP_API_BASE_URL + "repositories/" + props.id;

            fetch(requestUrl)
                .then(response => response.json())
                .then((responseJson) => {
                    setDataisLoaded(true);
                    setRepository(responseJson);

                    const fields = publishableValidationSchema.describe().fields;
                    Object.keys(fields).forEach((field, idx) =>
                    {

                        if(Array.isArray(repository[field])) {
                            setValue(field, repository[field]);
                        } else if(repository[field] !== undefined && repository[field] !== null)
                            setValue(field, repository[field]);

                    });
                })
        }
    }, [DataisLoaded, props.authString]);

    React.useEffect(() => {console.log(errors)}, [errors]);


    if (!isEditMode || DataisLoaded) {
        return (
        <React.Fragment>
            <Box className='repository-management'>
                <div className='repository-management-title'>
                    <span style={{ marginLeft: '40px' }}>Data Repository Registration</span>
                    <Typography variant='body2' style={{ marginLeft: '40px' }}>Please fill in the fields below to register your data repository with the Data Repository Finder. Unless otherwise noted, all information entered will be publicly displayed on the repository details page for this repository. You will be able to preview the details page before submitting the repository for review.</Typography>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '25px 50px', paddingBottom: '60px' }}>
                    <h3>Data Repository Information</h3>

                    <div className="form-group">
                        <label>Repository Name <span className='red-icon'>*</span></label>
                        <div className="form-error" role="alert">{errors.name?.message}</div>
                        <br />
                        <Controller
                            name="name"
                            control={control}
                            rules={publishableValidationSchema.name}
                            defaultValue=""
                            render={({field}) => (
                                <TextField fullWidth
                                           label="Repository Name"
                                           className="form-field"
                                           {...field} />
                            )} />
                    </div>

                    <div className="form-group">
                        <label>Repository Short Name</label>
                        <div className="form-error" role="alert">{errors.nickname?.message}</div>
                        <br />
                        <Controller
                            name="nickname"
                            control={control}
                            rules={publishableValidationSchema.nickname}
                            defaultValue=""
                            render={({field}) => (
                                <TextField fullWidth
                                           label="Repository Short Name"
                                           className="form-field"
                                           {...field} />
                            )} />
                    </div>

                    <div className="form-collection">
                        <div className="form-group">
                            <label>Select the organization(s) that house and maintain the repository.
                                <span className='red-icon'>*</span>
                            </label>
                            <div className="form-error" role="alert">{errors.affiliations?.message}</div>
                            <Controller
                                name="affiliations"
                                control={control}
                                rules={publishableValidationSchema.affiliations}
                                defaultValue={[]}
                                render={({field: {onChange, value}}) => (
                                    <ManagementFacetSelector
                                            className="form-field"
                                            onSelect={(e, data) => { console.log('data'); console.log(data); onChange(data) }}
                                            defaultValue={repository['affiliations']}
                                            //onSelect={handleAffiliationChange}
                                            {...register('affiliations')}
                                            value={value}
                                            id={'affiliations'}
                                            facet='branches' />
                                    )} />
                        </div>

                        <div className="form-group">
                            <label>If your organization isn't in the list above enter it here. </label>
                            <div className="form-error" role="alert">{errors.new_affiliations?.message}</div>
                            <br />
                            <Controller
                                name="new_affiliations"
                                control={control}
                                rules={publishableValidationSchema.new_affiliations}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField fullWidth
                                               label=""
                                               className="form-field"
                                               {...field} />
                                )} />
                        </div>
                    </div>
                    <br/>

                    <div className="form-group">
                        <label>Repository Description <span className='red-icon'>*</span></label>
                        <div className="form-error" role="alert">{errors.description?.message}</div>
                        <br />
                        <Controller
                            name="description"
                            control={control}
                            rules={publishableValidationSchema.description}
                            defaultValue=""
                            render={({field}) => (
                                <TextField fullWidth
                                            multiline
                                            minRows={3}
                                            label="Provide a 1-2 sentence overview of what the site is and what it is for."
                                            className="form-field"
                                            {...field} />
                            )} />
                    </div>

                    <div className="form-group">
                        <label>Repository Landing Page URL (Must start with http:// or https://)<span className='red-icon'>*</span></label>
                        <div className="form-error" role="alert">{errors.url?.message}</div>
                        <br />
                        <Controller
                            name="url"
                            control={control}
                            rules={publishableValidationSchema.url}
                            defaultValue=""
                            render={({field}) => (
                                <TextField fullWidth
                                            label="Repository URL"
                                            className="form-field"
                                            {...field} />
                            )} />
                    </div>

                    <div className="form-group">
                        <label>Repository Help Url or E-mail (Url must start with http:// or https://)<span className='red-icon'>*</span></label>
                        <div className="form-error" role="alert">{errors.help_url?.message}</div>
                        <br />
                        <Controller
                            name="help_url"
                            control={control}
                            rules={publishableValidationSchema.help_url}
                            defaultValue=""
                            render={({field}) => (
                                <TextField fullWidth
                                            label="Help URL"
                                            className="form-field"
                                            {...field} />
                            )} />
                    </div>

                    <Grid container rowSpacing={3} columnSpacing={3}>
                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Does your repository require Controlled Access?</label>
                                    <div className="form-error" role="alert">{errors.data_access_controlled?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_access_controlled"
                                        control={control}
                                        rules={publishableValidationSchema.data_access_controlled}
                                        defaultValue="null"
                                        render={({field}) => (
                                            <RadioGroup row className="form-field"{...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                <FormControlLabel value="null" control={<Radio />} label="Unknown" />
                                            </RadioGroup>
                                        )} />

                                </div>

                                <div className="form-group">
                                    <label>Briefly describe information about controlled access for this repository.</label>
                                    <div className="form-error"
                                        role="alert">{errors.data_access_controlled_description?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_access_controlled_description"
                                        control={control}
                                        rules={publishableValidationSchema.data_access_controlled_description}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Provide a public URL link to any controlled access information for this
                                        repository. (Must start with http:// or https://)</label>
                                    <div className="form-error"
                                        role="alert">{errors.data_access_controlled_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_access_controlled_url"
                                        control={control}
                                        rules={publishableValidationSchema.data_access_controlled_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Does your repository require metadata?</label>
                                    <div className="form-error" role="alert">{errors.metadata_required?.message}</div>
                                    <br />
                                    <Controller
                                        name="metadata_required"
                                        control={control}
                                        rules={publishableValidationSchema.metadata_required}
                                        defaultValue="null"
                                        render={({field}) => (
                                            <RadioGroup row className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                <FormControlLabel value="null" control={<Radio />} label="Unknown" />
                                            </RadioGroup>
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Briefly describe your metadata recommendations and requirements.</label>
                                    <div className="form-error"
                                        role="alert">{errors.metadata_required_description?.message}
                                    </div>
                                    <br />
                                    <Controller
                                        name="metadata_required_description"
                                        control={control}
                                        rules={publishableValidationSchema.metadata_required_description}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Provide a public URL link to any metadata requirements. (Must start with http:// or https://)</label>
                                    <div className="form-error" role="alert">{errors.metadata_required_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="metadata_required_url"
                                        control={control}
                                        rules={publishableValidationSchema.metadata_required_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Does your repository have any data volume limitations?</label>
                                    <div className="form-error" role="alert">{errors.data_volume_limited?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_volume_limited"
                                        control={control}
                                        rules={publishableValidationSchema.data_volume_limited}
                                        defaultValue="null"
                                        render={({field}) => (
                                            <RadioGroup row defaultValue="Unknown" className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                <FormControlLabel value="null" control={<Radio />} label="Unknown" />
                                            </RadioGroup>
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Briefly describe any data volume limitations for this repository.</label>
                                    <div className="form-error"
                                        role="alert">{errors.data_volume_description?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_volume_description"
                                        control={control}
                                        rules={publishableValidationSchema.data_volume_description}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Provide a public URL link to any data volume limitation information. (Must start with http:// or https://)</label>
                                    <div className="form-error" role="alert">{errors.data_volume_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_volume_url"
                                        control={control}
                                        rules={publishableValidationSchema.data_volume_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Does your repository accept individual-level data?</label>
                                    <div className="form-error" role="alert">{errors.accepts_individual_data?.message}</div>
                                    <br />
                                    <Controller
                                        name="accepts_individual_data"
                                        control={control}
                                        rules={publishableValidationSchema.accepts_individual_data}
                                        defaultValue="null"
                                        render={({field}) => (
                                            <RadioGroup row defaultValue="Unknown" className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                <FormControlLabel value="null" control={<Radio />} label="Unknown" />
                                            </RadioGroup>
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Briefly describe whether this repository accepts individual-level data.</label>
                                    <div className="form-error"
                                        role="alert">{errors.accepts_individual_description?.message}</div>
                                    <br />
                                    <Controller
                                        name="accepts_individual_description"
                                        control={control}
                                        rules={publishableValidationSchema.accepts_individual_description}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Provide a public URL link to any individual-level data information. (Must start with http:// or https://)</label>
                                    <div className="form-error" role="alert">{errors.accepts_individual_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="accepts_individual_url"
                                        control={control}
                                        rules={publishableValidationSchema.accepts_individual_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Does your repository use a persistent id for data sets?</label>
                                    <div className="form-error" role="alert">{errors.persistent_id_used?.message}</div>
                                    <br />
                                    <Controller
                                        name="persistent_id_used"
                                        control={control}
                                        rules={publishableValidationSchema.persistent_id_used}
                                        defaultValue="null"
                                        render={({field}) => (
                                            <RadioGroup row defaultValue="Unknown" className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                <FormControlLabel value="null" control={<Radio />} label="Unknown" />
                                            </RadioGroup>
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Briefly describe whether this repository uses a persistent id for data
                                        sets.</label>
                                    <div className="form-error"
                                        role="alert">{errors.persistent_id_description?.message}</div>
                                    <br />
                                    <Controller
                                        name="persistent_id_description"
                                        control={control}
                                        rules={publishableValidationSchema.persistent_id_description}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Provide a public URL link to any information about persistent ids. (Must start with http:// or https://)</label>
                                    <div className="form-error" role="alert">{errors.persistent_id_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="persistent_id_url"
                                        control={control}
                                        rules={publishableValidationSchema.persistent_id_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Does your repository require a fee to submit data?</label>
                                    <div className="form-error" role="alert">{errors.cost_to_submit?.message}</div>
                                    <br />
                                    <Controller
                                        name="cost_to_submit"
                                        control={control}
                                        rules={publishableValidationSchema.cost_to_submit}
                                        defaultValue="null"
                                        render={({field}) => (
                                            <RadioGroup row defaultValue="Unknown" className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                <FormControlLabel value="null" control={<Radio />} label="Unknown" />
                                            </RadioGroup>
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Briefly describe information about costs to submit data.</label>
                                    <div className="form-error"
                                        role="alert">{errors.costs_for_submit_description?.message}</div>
                                    <br />
                                    <Controller
                                        name="costs_for_submit_description"
                                        control={control}
                                        rules={publishableValidationSchema.costs_for_submit_description}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Provide a public URL link to any submission costs information. (Must start with http:// or https://)</label>
                                    <div className="form-error" role="alert">{errors.costs_for_submission_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="costs_for_submission_url"
                                        control={control}
                                        rules={publishableValidationSchema.costs_for_submission_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Does your repository require Data Submission Agreement/
                                        Institutional Certification Required for Data Submission?</label>
                                    <div className="form-error" role="alert">{errors.dua_or_cert_required?.message}</div>
                                    <br />
                                    <Controller
                                        name="dua_or_cert_required"
                                        control={control}
                                        rules={publishableValidationSchema.dua_or_cert_required}
                                        defaultValue="null"
                                        render={({field}) => (
                                            <RadioGroup row defaultValue="Unknown" className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                <FormControlLabel value="null" control={<Radio />} label="Unknown" />
                                            </RadioGroup>
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Briefly describe information about Data Submission Agreement/
                                        Institutional Certification requirements.</label>
                                    <div className="form-error"
                                        role="alert">{errors.dua_or_cert_required_description?.message}</div>
                                    <br />
                                    <Controller
                                        name="dua_or_cert_required_description"
                                        control={control}
                                        rules={publishableValidationSchema.dua_or_cert_required_description}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Provide a public URL link to any information about Data Submission Agreement/
                                        Institutional Certification requirements. (Must start with http:// or https://)</label>
                                    <div className="form-error"
                                        role="alert">{errors.dua_or_cert_required_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="dua_or_cert_required_url"
                                        control={control}
                                        rules={publishableValidationSchema.dua_or_cert_required_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Does your repository have any other data submission requirements?</label>
                                    <div className="form-error" role="alert">{errors.data_submission_reqs?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_submission_reqs"
                                        control={control}
                                        rules={publishableValidationSchema.data_submission_reqs}
                                        defaultValue="null"
                                        render={({field}) => (
                                            <RadioGroup row defaultValue="Unknown" className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                <FormControlLabel value="null" control={<Radio />} label="Unknown" />
                                            </RadioGroup>
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Briefly describe information about other data submission requirements.</label>
                                    <div className="form-error"
                                        role="alert">{errors.data_submission_reqs_description?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_submission_reqs_description"
                                        control={control}
                                        rules={publishableValidationSchema.data_submission_reqs_description}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Provide a public URL link to any information about other data submission
                                        requirements. (Must start with http:// or https://)</label>
                                    <div className="form-error"
                                        role="alert">{errors.data_submission_reqs_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="data_submission_reqs_url"
                                        control={control}
                                        rules={publishableValidationSchema.data_submission_reqs_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Is your repository listed on fairsharing.org?</label>
                                    <div className="form-error" role="alert">{errors.on_fairsharing?.message}</div>
                                    <br />
                                    <Controller
                                        name="on_fairsharing"
                                        control={control}
                                        rules={publishableValidationSchema.on_fairsharing}
                                        defaultValue="false"
                                        render={({field}) => (
                                            <RadioGroup row defaultValue="" className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>Provide the URL link to your repository on fairsharing.org. (Must start with http:// or https://)</label>
                                    <div className="form-error" role="alert">{errors.fairsharing_url?.message}</div>
                                    <br />
                                    <Controller
                                        name="fairsharing_url"
                                        control={control}
                                        rules={publishableValidationSchema.fairsharing_url}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>


                        <Grid xs={12} xl={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Select the data format(s) that this repository accepts.
                                        <span className='red-icon'>*</span>
                                    </label>
                                    <div className="form-error" role="alert">{errors.data_formats?.message}</div>
                                    <Controller
                                        name="data_formats"
                                        control={control}
                                        rules={publishableValidationSchema.data_formats}
                                        defaultValue={[]}
                                        //onChange={([, data]) => {return data;}}
                                        render={({field: {onChange, value}}) => (
                                            <ManagementFacetSelector
                                                className="form-field"
                                                onSelect={(e, data) => { console.log('data'); console.log(data); onChange(data) }}
                                                defaultValue={repository['data_formats']}
                                                //onSelect={handleAffiliationChange}
                                                {...register('data_formats')}
                                                value={value}
                                                id={'data_formats'}
                                                facet='data_formats_unfiltered' />
                                        )}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>If the repository accepts additional format, enter those here. Separate multiple
                                        entries with a comma i.e. "imaging, medical records"</label>
                                    <div className="form-error" role="alert">{errors.new_data_formats?.message}</div>
                                    <br />
                                    <Controller
                                        name="new_data_formats"
                                        control={control}
                                        rules={publishableValidationSchema.new_data_formats}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={12} xl={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Select the data type(s) that this repository accepts.
                                        <span className='red-icon'>*</span>
                                    </label>
                                    <div className="form-error" role="alert">{errors.data_types?.message}</div>
                                    <Controller
                                        name="data_types"
                                        control={control}
                                        rules={publishableValidationSchema.data_types}
                                        defaultValue={[]}
                                        //onChange={([, data]) => {return data;}}
                                        render={({field: {onChange, value}}) => (
                                            <ManagementFacetSelector
                                                className="form-field"
                                                onSelect={(e, data) => { console.log('data'); console.log(data); onChange(data) }}
                                                defaultValue={repository['data_types']}
                                                //onSelect={handleAffiliationChange}
                                                {...register('data_types')}
                                                value={value}
                                                id={'data_types'}
                                                facet='data_types' />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>If the repository accepts other data types, enter those here. Separate multiple
                                        entries with a comma i.e. "imaging, medical records"</label>
                                    <div className="form-error" role="alert">{errors.new_data_types?.message}</div>
                                    <br />
                                    <Controller
                                        name="new_data_types"
                                        control={control}
                                        rules={publishableValidationSchema.new_data_types}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={12} xl={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Select the organism(s) that this repository accepts data on.
                                        <span className='red-icon'>*</span>
                                    </label>
                                    <div className="form-error" role="alert">{errors.organisms?.message}</div>
                                    <Controller
                                        name="organisms"
                                        control={control}
                                        rules={publishableValidationSchema.organisms}
                                        defaultValue={[]}
                                        //onChange={([, data]) => {return data;}}
                                        render={({field: {onChange, value}}) => (
                                            <ManagementFacetSelector
                                                className="form-field"
                                                onSelect={(e, data) => { console.log('data'); console.log(data); onChange(data) }}
                                                defaultValue={repository['organisms']}
                                                //onSelect={handleAffiliationChange}
                                                {...register('organisms')}
                                                value={value}
                                                id={'organisms'}
                                                facet='organisms' />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>If the repository accepts other organisms, enter those here. Separate multiple
                                        entries with a comma i.e. "imaging, medical records"</label>
                                    <div className="form-error" role="alert">{errors.new_organisms?.message}</div>
                                    <br />
                                    <Controller
                                        name="new_organisms"
                                        control={control}
                                        rules={publishableValidationSchema.new_organisms}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={12} xl={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>
                                        Select the research area(s) that this repository accepts data from.
                                        <span className='red-icon'>*</span>
                                    </label>
                                    <div className="form-error" role="alert">{errors.research_areas?.message}</div>
                                    <Controller
                                        name="research_areas"
                                        control={control}
                                        rules={publishableValidationSchema.research_areas}
                                        defaultValue={[]}
                                        //onChange={([, data]) => {return data;}}
                                        render={({field: {onChange, value}}) => (
                                            <ManagementFacetSelector
                                                className="form-field"
                                                onSelect={(e, data) => { console.log('data'); console.log(data); onChange(data) }}
                                                defaultValue={repository['research_areas']}
                                                //onSelect={handleAffiliationChange}
                                                {...register('research_areas')}
                                                value={value}
                                                id={'research_areas'}
                                                facet='research_areas' />
                                        )} />
                                </div>

                                <div className="form-group">
                                    <label>If the repository accepts other research areas, enter those here. Separate
                                        multiple entries with a comma i.e. "imaging, medical records"</label>
                                    <div className="form-error" role="alert">{errors.new_research_areas?.message}</div>
                                    <br />
                                    <Controller
                                        name="new_research_areas"
                                        control={control}
                                        rules={publishableValidationSchema.new_research_areas}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField fullWidth
                                                    label=""
                                                    className="form-field"
                                                    {...field} />
                                        )} />
                                </div>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className="form-collection">
                                <div className="form-group">
                                    <label>Is your repository a generalist repository?</label>
                                    <br />
                                    <Controller
                                        name="generalist"
                                        control={control}
                                        rules={publishableValidationSchema.generalist}
                                        defaultValue="false"
                                        render={({field}) => (
                                            <RadioGroup row defaultValue="" className="form-field" {...field}>
                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        )} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <br/>
                    {isEditMode &&

                        <div className="form-collection">
                            <h3>Change Log (Change log data will not be displayed on the public site.)</h3>
                            <div className="form-group">
                                <h4>Previous Edits:</h4>
{/*                                <p>03/23/23 hgriffin: Updated data types to include Biology as requested by contact person.</p>
                                <p>03/20/23 jalekseyev: Update description field to fix typo.</p>*/}
                                <div className="change-log">{repository["change_log"]}</div>
                            </div>

                            <div className="form-group">
                                <label>Please enter a detailed explanation of the changes you are making in this edit, as well as a justification/reason for the changes.<span className='red-icon'>*</span></label>
                                <div className="form-error" role="alert">{errors.change_log_comment?.message}</div>
                                <br/>
                                <Controller
                                    name="change_log_comment"
                                    control={control}
                                    rules={publishableValidationSchema.change_log_comment}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField fullWidth
                                            multiline
                                            minRows={3}
                                            label="Change Notes"
                                            className="form-field"
                                            {...field} />
                                    )} />
                            </div>
                        </div>
                    }

                    <br />
                    <h3>Registering contact (contact data will not be displayed on the public site)</h3>

                    <div className="form-group">
                        <label>Name of person registering repository</label>
                        <div className="form-error" role="alert">{errors.registering_name?.message}</div>
                        <br />
                        <Controller
                            name="registering_name"
                            control={control}
                            rules={publishableValidationSchema.registering_name}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    label="Name"
                                    className="form-field"
                                    {...field} />
                            )} />
                    </div>

                    <div className="form-group">
                        <label>Phone number of person registering repository</label>
                        <div className="form-error" role="alert">{errors.registering_phone?.message}</div>
                        <br />
                        <Controller
                            name="registering_phone"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    label="Phone number (xxx)xxx-xxxx"
                                    className="form-field"
                                    {...field} />
                            )}
                            rules={publishableValidationSchema.registering_phone} />
                    </div>

                    <div className="form-group">
                        <label>E-mail of person registering</label>
                        <div className="form-error" role="alert">{errors.registering_email?.message}</div>
                        <br />
                        <Controller
                            name="registering_email"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    label="E-mail"
                                    className="form-field"
                                    {...field} />
                            )}
                            rules={publishableValidationSchema.registering_email} />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <br/>
                        {publish_status(repository.status) === 0 &&
                        <Chip className='repository-chip'
                              style={{backgroundColor: 'rgba(80, 148, 124, 1)', color: 'white'}}
                              label='Published'/>
                        }
                        {publish_status(repository.status) === 1 &&
                        <Chip className='repository-chip'
                              style={{ backgroundColor: 'rgba(194, 142, 34, 1)', color: 'white' }}
                              label='In Review' />
                        }
                        {publish_status(repository.status) === 2 &&
                        <Chip className='repository-chip'
                              style={{ backgroundColor: 'rgba(194, 142, 34, 1)', color: 'white' }}
                              label='Ready for Publish' />
                        }
                        {publish_status(repository.status) === 3 &&
                        <Chip className='repository-chip'
                              style={{ backgroundColor: '#737373', color: 'white' }}
                              label='Draft' />
                        }
                    </div>

                    <br />
                    <br />

                    <Dialog onClose={handleClose} open={open}>
                        <DialogTitle>Confirm Publish Edits</DialogTitle>
                        <DialogContent>
                            <div>
                                Taking this action will add the following new options to the filters: <br/>
                                <div style={{ marginBottom: '10px' }}>
                                    <b>Organisms: </b>
                                    {submittedData.new_organisms}
                                    <br />
                                </div>

                                <div style={{ marginBottom: '10px' }}>
                                    <b>Research Areas: </b>
                                    {submittedData.new_research_areas}
                                    <br />
                                </div>

                                <div style={{ marginBottom: '10px' }}>
                                    <b>Data Types: </b>
                                    {submittedData.new_data_types}
                                    <br />
                                </div>

                                <div style={{ marginBottom: '10px' }}>
                                    <b>Data Formats: </b>
                                    {submittedData.new_data_formats}
                                    <br />
                                </div>

                                <div style={{ marginBottom: '10px' }}>
                                    <b>Affiliations: </b>
                                    {submittedData.new_affiliations}
                                    <br />
                                </div>
                            </div>

                            <DialogContentText id="alert-dialog-description">
                                Click 'Yes' to save changes and add these new filters.
                            </DialogContentText>

                        </DialogContent>
                        <DialogActions>
                            <Button id='accept_publish_no_button' onClick={handleClose} >No</Button>
                            <Button id='accept_publish_yes_button' onClick={handlePublishEdits} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div>
                        {isEditMode && publish_status(repository.status) === 0
                            ? <Button type="submit" variant="contained" color="primary">
                                Submit and Publish Edits
                            </Button>
                            : <Button type="submit" variant="contained" color="primary">
                                Submit and Preview
                            </Button>
                        }


                    </div>

                    <div className="form-page-error" role="alert">
                        {(errors && Object.keys(errors).length > 0) &&
                            <span>Please complete all required fields</span>
                        }
                    </div>
                </form>
            </Box>
        </React.Fragment>);
    }
}

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

export default RepositoryAddEditPage;
