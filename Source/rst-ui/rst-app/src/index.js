// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ReactDOM from 'react-dom/client';
import FacetSelector from "./FacetSelector.tsx";
import RepositoryGrid from "./RepositoryGrid";
import FormControlLabel from "@mui/material/FormControlLabel";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RepositoryHomePage from "./repo_details/RepositoryHomePage"
import RepositoryComparisonPage from "./repository_comparison/RepositoryComparisonPage";
import {useNavigate} from "react-router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Chip from "@mui/material/Chip";
import Tooltip from '@mui/material/Tooltip';
import ReactTextCollapse from "react-text-collapse";

import './index.css';
import MainHeader from "./MainHeader";
import Footer from "./Footer";
import RepositoryAddEditPage from "./repository_management/RepositoryAddEditPage";
import RepositoryManagementHome from "./repository_management/RepositoryManagementHome";
import DataDictionaryPage from "./data_dictionary/DataDictionaryPage";
import useAuthString from "./useAuthString";
import RepositoryPreviewPage from "./repository_management/RepositoryPreviewPage";
import RepositoryAcceptedForReview from "./repository_management/RepostioryAcceptedForReview";
import Login from "./login/Login";
import RepositoryAcceptedForPublish from "./repository_management/RepositoryAcceptedForPublish";
import MaintenancePage from "./maintenance/maintenance-mode";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import SearchIcon from "@mui/icons-material/Search";

const TEXT_COLLAPSE_OPTIONS = {
    collapse: false,
    collapseText: 'Learn More  ▼',
    expandText: 'Show Less  ▲',
    minHeight: 88,
    maxHeight: 250,
    textStyle: {
        color: '#427C97',
        fontSize: '16px',
    },
};

/*const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));*/

const ComparisonSelection = (props) => {
    useEffect(() => {
        console.log('banner prop:' + props.maintenanceBanner);
    });

    const navigate = useNavigate();
    const handleCompare = () => {
       var searchStr = '';

       if (props.compareIds.length < 2) {
           // TODO Add popup for user
           // console.log("Compare requires 2 or more repos selected - doing nothing");
       } else {
           searchStr += '?repo1=' + props.compareIds[0];
           if (props.compareIds.length > 1) {
               searchStr += '&repo2=' + props.compareIds[1];
           }
           if (props.compareIds.length > 2) {
               searchStr += '&repo3=' + props.compareIds[2];
           }
           // console.log(searchStr);

           navigate({
               pathname: '/repositories/compare',
               search: searchStr
           })
       }
    };

    return (<div className='comparison-selection'>
        <Button onClick={handleCompare} id="compare_repositories_button" className="large-button" variant="contained">
            Compare
        </Button>

        {/*<Typography>Choose up to three repositories to compare</Typography>*/}

        <Chip className={"comparison-titles " + (props.compareIds[0] && "comparison-title-selected")}
                    key={'compare-1'} label={props.compareIds[0] || '1'} />

        <Chip className={"comparison-titles " + (props.compareIds[1] && "comparison-title-selected")}
                    key={'compare-2'} label={props.compareIds[1] || '2'} />

        <Chip className={"comparison-titles " + (props.compareIds[2] && "comparison-title-selected")}
                    key={'compare-3'} label={props.compareIds[2] || '3'} />


    </div>);
}

const SelectorInputs = (props) => {

    return ( <nav aria-label="Filters">
        <Box className='filters-wrapper'>
            <h3 className='panel-label' style={{ marginLeft: '20px' }}>Filters</h3>

            <FormControl className="filters">
                {/* Removing Affiliations filter at sponsor request!!
                <fieldset>
                    <legend>Select NICHD affiliation(s) that are relevant to your research</legend>
                    <FacetSelector filters={props.filters} handleAddToFilters={props.handleChangeBranches} facet_name="Affiliation" facet="branches"/>
                </fieldset>*/}

                <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                    <div className="filter-explain" >
                    <p>
                        Start typing in a box to view related terms. Terms are an exact match to repository tags; select all related terms within a filter box for a broad search.
                    </p>
                    <p>
                        <b>Broad search example</b>: To see all repositories that handle image data, type "image" in the "Data Types" field, and select all items listed.
                    </p>
                    <p>
                        <b>Narrow search example</b>: Select "Image" term to see only those repositories that use the specific term "Image" (for instance, will not return "Medical Imaging").
                    </p>

                    </div>
                </ReactTextCollapse>
                <Divider />

                <fieldset>
                    <Tooltip arrow title="Filter by repository name">
                        <legend>Filter by <b>Name</b>. </legend>
                    </Tooltip>
                    <FacetSelector filters={props.filters} handleAddToFilters={props.handleChangeNames} facet_name="Names" facet="names" />
                </fieldset>

                <Divider />

                <fieldset >
                    <Tooltip arrow title="Filter items match exactly to repository tags. Select all similar items for a general search">
                        <legend>Filter by <b>Organism</b>. Select all that apply.
                    </legend>
                    </Tooltip>
                    <FacetSelector filters={props.filters} handleAddToFilters={props.handleChangeOrganisms} facet_name="Organisms" facet="organisms" />
                </fieldset>
                <Divider />

                <fieldset>
                    <Tooltip arrow title="Filter items match exactly to repository tags. Select all similar items for a general search">
                        <legend>Filter by <b>Research Area</b>. Select all that apply.</legend>
                    </Tooltip>
                    <FacetSelector filters={props.filters} handleAddToFilters={props.handleChangeResearchAreas} facet_name="Research Areas" facet="research_areas" />
                </fieldset>
                <Divider />

                <fieldset>
                    <Tooltip arrow title="Filter items match exactly to repository tags. Select all similar items for a general search">
                        <legend>Filter by <b>Data Type</b>. Select all that apply.</legend>
                    </Tooltip>
                    <FacetSelector filters={props.filters} handleAddToFilters={props.handleChangeDataTypes} facet_name="Data Types" facet="data_types" />
                </fieldset>
                <Divider />

                <fieldset>
                    <Tooltip arrow title="Filter items match exactly to repository tags. Select all similar items for a general search">
                    <legend>Filter by <b>Data Format</b>. Select all that apply.</legend>
                    </Tooltip>
                    <FacetSelector filters={props.filters} handleAddToFilters={props.handleChangeDataFormats} facet_name="Data Formats" facet="data_formats" />
                </fieldset>
                <Divider />

                <fieldset>
                    <legend>Significant metadata required?</legend>
                    <RadioGroup
                        id="metadata_group"
                        row
                        defaultValue=""
                        onChange={props.handleAddToFilters}
                        name="metadata_group"
                    >
                        <FormControlLabel value="true" key='metadata_1' control={<Radio/>} label= 'Yes'/>
                        <FormControlLabel value="false" key='metadata_2' control={<Radio/>} label= 'No'/>
                        <FormControlLabel value="" key='metadata_3' control={<Radio/>} label= 'All'/>
                    </RadioGroup>
                </fieldset>
                <Divider />

                <fieldset>
                    <legend>Individual-level data accepted?</legend>
                    <RadioGroup
                        id="individual_group"
                        row
                        defaultValue=""
                        onChange={props.handleAddToFilters}
                        name="individual_group"
                    >
                        <FormControlLabel value="true" key='individual_1' control={<Radio/>} label= 'Yes'/>
                        <FormControlLabel value="false" key='individual_2' control={<Radio/>} label= 'No'/>
                        <FormControlLabel value="" key='individual_3' control={<Radio/>} label= 'All'/>
                    </RadioGroup>
                </fieldset>
                <Divider />

                <fieldset>
                    <legend>Controlled Access</legend>
                    <RadioGroup
                        id="ac_group"
                        row
                        defaultValue=""
                        onChange={props.handleAddToFilters}
                        name="ac_group"
                    >
                        <FormControlLabel value="true" key='ac_1' control={<Radio/>} label= 'Yes'/>
                        <FormControlLabel value="false" key='ac_2' control={<Radio/>} label= 'No'/>
                        <FormControlLabel value="" key='ac_3' control={<Radio/>} label= 'All'/>
                    </RadioGroup>
                </fieldset>
                <Divider />

                <fieldset>
                    <legend>Data Submission Agreement/Institutional Certification Required for Data Submission</legend>
                    <RadioGroup
                        id="cert_group"
                        row
                        defaultValue=""
                        onChange={props.handleAddToFilters}
                        name="cert_group"
                    >
                        <FormControlLabel value="true" key='cert_1' control={<Radio/>} label= 'Yes'/>
                        <FormControlLabel value="false" key='cert_2' control={<Radio/>} label= 'No'/>
                        <FormControlLabel value="" key='cert_3' control={<Radio/>} label= 'All'/>
                    </RadioGroup>
                </fieldset>
                <Divider />

                <fieldset>
                    <legend>Data Volume Limit</legend>
                    <RadioGroup
                        id="data_volume_group"
                        row
                        defaultValue=""
                        onChange={props.handleAddToFilters}
                        name="data_volume_group"
                    >
                        <FormControlLabel value="true" key='volume_1' control={<Radio/>} label= 'Yes'/>
                        <FormControlLabel value="false" key='volume_2' control={<Radio/>} label= 'No'/>
                        <FormControlLabel value="" key='volume_3' control={<Radio/>} label= 'All'/>
                    </RadioGroup>
                </fieldset>
                <Divider />

                <fieldset>
                    <legend>Is there a fee to submit data?</legend>
                    <RadioGroup
                        id="fee_group"
                        row
                        defaultValue=""
                        onChange={props.handleAddToFilters}
                        name="fee_group"
                    >
                        <FormControlLabel value="true" key='fee_1' control={<Radio/>} label= 'Yes'/>
                        <FormControlLabel value="false" key='fee_2' control={<Radio/>} label= 'No'/>
                        <FormControlLabel value="" key='fee_3' control={<Radio/>} label= 'All'/>
                    </RadioGroup>
                </fieldset>

                {/*<fieldset>
                    <legend>Data Volume Limit</legend>
                    <FormControlLabel control={<Checkbox id="volume_limit" onChange={props.handleAddToFilters}/>} label="No limit" />
                </fieldset>*/}
            </FormControl>
        </Box>
    </nav>) ;
}


const RecommendedRepositories = ({ compareIds, searchResultsLoaded, searchResults, handleAddToCompare, ...props }) => {

       return( <div>
            <Box className='repository-list'>

                <h3 className='panel-label' style={{ marginLeft: '20px' }}>Search Results ({searchResults.length})</h3>

                <ComparisonSelection compareIds={compareIds} />

                <RepositoryGrid compareIds={compareIds} searchResultsLoaded={searchResultsLoaded} searchResults={searchResults} handleAddToCompare={handleAddToCompare} queryParams={props.queryParams} />

            </Box>
        </div> );
}

const MainPage = () => {
    const [compareIds, setCompareIds] = useState([]);
    // var compare_repos = [];
    // var filters = {};
    const [ searchResults, setSearchResults] = useState([]);
    const [ filters/*, setFilters*/ ] = useState({});
    const [ queryStr, setQueryStr ] = useState("");
    const [ searchResultsLoaded, setSearchResultsLoaded] = useState(false);


    useEffect(() => {
        //console.log('banner var: ' + maintenanceBanner);
        var requestUrl = process.env.REACT_APP_API_BASE_URL + "repositories";

        if (queryStr) {
            // console.log(queryStr);
            requestUrl += queryStr;
        }

        fetch(requestUrl)
            .then(response => response.json())
            .then((responseJson) => {
                setSearchResults(responseJson['repositories']);
                setSearchResultsLoaded(true);
                // console.log("state");
                // console.log(responseJson, responseJson['repositories']);
            })
    }, [queryStr]);

    const handleFiltersChanged = () => {
        // console.log("filters changed!");
        // console.log(filters);
        setSearchResultsLoaded(false);
        let newQueryStr = "";

        if (Object.keys(filters).length > 0) {
            newQueryStr += "?";

            if (filters['names']) {
                newQueryStr.endsWith("?") ? newQueryStr += "names=[" : newQueryStr += "&names=[";
                newQueryStr+= filters['names'] + "]";
            }

            if (filters['branches']) {
                newQueryStr.endsWith("?") ? newQueryStr += "affiliation=" : newQueryStr += "&affiliation=";
                //newQueryStr += "affiliation=[" + filters['branches'] + "]";
                newQueryStr += filters['branches'];
            }
            if (filters['fee']) {
                newQueryStr.endsWith("?") ? newQueryStr += "fee=" : newQueryStr += "&fee=";
                newQueryStr+= filters['fee'];
            }
            if (filters['organisms']) {
                newQueryStr.endsWith("?") ? newQueryStr += "organisms=[" : newQueryStr += "&organisms=[";
                newQueryStr+= filters['organisms'] + "]";
            }
            if (filters['metadata']) {
                newQueryStr.endsWith("?") ? newQueryStr +="metadata=" : newQueryStr += "&metadata=";
                newQueryStr+= filters['metadata'];
            }
            if (filters['data_types']) {
                newQueryStr.endsWith("?") ? newQueryStr += "data_types=[" : newQueryStr += "&data_types=[";
                newQueryStr += filters['data_types'] + "]";
            }
            if(filters['data_formats']) {
                newQueryStr.endsWith("?") ? newQueryStr += "data_formats=[" : newQueryStr += "&data_formats=[";
                newQueryStr += filters['data_formats'] + "]";
            }
            if (filters['research_areas']) {
                newQueryStr.endsWith("?") ? newQueryStr += "research_areas=[" : newQueryStr += "&research_areas=[";
                newQueryStr += filters['research_areas'] + "]";
            }
            if (filters['access_control']) {
                newQueryStr.endsWith("?") ? newQueryStr += "ac=" : newQueryStr += "&ac=";
                newQueryStr += filters['access_control'];
            }
            if (filters['individual']) {
                newQueryStr.endsWith("?") ? newQueryStr += "individual=" : newQueryStr += "&individual=";
                newQueryStr += filters['individual'];
            }
            if (filters['cert_required']) {
                newQueryStr.endsWith("?") ? newQueryStr += "cert_required=" : newQueryStr += "&cert_required=";
                newQueryStr += filters['cert_required'];
            }
            if (filters['volume_limit']) {
                newQueryStr.endsWith("?") ? newQueryStr += "volume_limit=" : newQueryStr += "&volume_limit=";
                newQueryStr += filters['volume_limit'];
            }
        }
        // console.log('query string');
        // console.log(newQueryStr);

        setQueryStr(newQueryStr);
    };

    const handleAddToCompare = (event) => {
        // console.log("handle compare");
        // console.log(compareIds);
        var tempIds = [...compareIds];
        if ( event.target ) {
            if ( event.target.checked ) {
                if (compareIds.length === 3) {
                    // TODO Add popup for user
                    // console.log("Already selected 3 repos");
                } else {
                    // Add to compare_ids
                    tempIds.push(event.target.id);
                    // console.log(tempIds);
                }
            } else {
                tempIds = tempIds.filter(id => event.target.id !== id);
            }
            setCompareIds(tempIds);
        }
    };

    const handleAddToFilters = (event) => {

        if (event.target.name === 'fee_group') {
            filters['fee']= event.target.value;
        }
        if (event.target.name === 'metadata_group') {
            filters['metadata'] = event.target.value;
        }
        if (event.target.name === 'ac_group') {
            filters['access_control'] = event.target.value;
        }
        if (event.target.name === 'individual_group'){
            filters['individual'] = event.target.value;
        }
        if (event.target.name === "cert_group") {
            filters['cert_required'] = event.target.value;
        }
        if (event.target.name === "data_volume_group") {
            filters['volume_limit'] = event.target.value;
        }
        /*if (event.target.id=="volume_limit") {
            //filters['volume_limit'] = event.target.value;
            if (event.target.checked) {
                filters['volume_limit'] = false;
            } else {
                filters['volume_limit'] = true;
            }
        }*/
        // console.log(filters);

        handleFiltersChanged();
    };

    const convertValues = (value) => {
        var values = [];
        for (let i=0; i<value.length; i++) {
            // console.log(value[i]);
            var id = value[i].id;
            values.push(id)
        }

        return values;
    };

    const handleChangeNames = (event, value, reason) => {
      //let values = convertValues(value)
        console.log(value);
        let values = [];
        for (let i=0; i<value.length; i++) {
            // console.log(value[i]);
            let name = "'" + value[i].name + "'";
            values.push(name);
        }

      if (values.length>0) {
          filters['names'] = values;
          console.log(filters['names']);
      } else {
          delete filters.names;
      }

      handleFiltersChanged();
    };

    const handleChangeBranches = (event, value, reason) => {
        var values = convertValues(value)
        if (values.length>0) {
            filters['branches'] = values;
        } else {
            delete filters.branches;
        }

        handleFiltersChanged();
    };

    const handleChangeOrganisms = (event, value, reason) => {
        var values = convertValues(value)
        if (values.length>0) {
            filters['organisms'] = values;
        } else {
            delete filters.organisms;
        }

        handleFiltersChanged();
    };

    const handleChangeResearchAreas = (event, value, reason) => {
        var values = convertValues(value)
        if (values.length>0) {
            filters['research_areas'] = values;
        } else {
            delete filters.research_areas;
        }

        handleFiltersChanged();
    };

    const handleChangeDataTypes = (event, value, reason) => {
        var values = convertValues(value)
        if (values.length>0) {
            filters['data_types'] = values;
        } else {
            delete filters.data_types;
        }

        handleFiltersChanged();
    };

    const handleChangeDataFormats = (event, value, reason) => {
        var values = convertValues(value)
        if(values.length>0) {
            filters['data_formats'] = values;
        } else {
            delete filters.data_formats;
        }

        handleFiltersChanged();
    }

    /*const handleAddMultiToFilters = (event, value) => {
        if (event.target.id.includes('filter-branches')) {
            // console.log(value);
            let values = [];
            for (let i=0; i<value.length; i++) {
                // console.log(value[i]);
                var id = value[i].id;
                values.push(id)
            }
            filters['branches'] = values;
        } else if (event.target.id.includes('filter-organisms')) {
            filters['organisms'] = convertValues(value);
        } else if (event.target.id.includes('filter-data_types')) {
            filters['data_types'] = convertValues(value);
        } else if (event.target.id.includes('filter-research_areas')) {
            filters['research_areas'] = convertValues(value);
        }

        // console.log(filters);


        handleFiltersChanged();
    };*/


    return( <Container maxWidth='xl' style={{ height: '100%', padding: '0' }}>
        <main>
            <Grid container spacing={2}>
                <Grid xs={12} s={2} md={4}>
                    <SelectorInputs filters={filters} handleAddToFilters={handleAddToFilters}
                                                        handleChangeBranches={handleChangeBranches}
                                                        handleChangeOrganisms={handleChangeOrganisms}
                                                        handleChangeResearchAreas={handleChangeResearchAreas}
                                                        handleChangeDataTypes={handleChangeDataTypes}
                                                        handleChangeDataFormats={handleChangeDataFormats}
                                                        handleChangeNames={handleChangeNames} />
                </Grid>

                <Grid xs={12} s={10} md={8}>



                    <RecommendedRepositories compareIds={compareIds} searchResultsLoaded={searchResultsLoaded}
                                             searchResults={searchResults} handleAddToCompare={handleAddToCompare}
                                             />
                </Grid>
            </Grid>
        </main>
    </Container> );
}

const App = () => {
    const { authString, setAuthString, clearAuthString } = useAuthString();
    let maintenanceBanner = process.env.REACT_APP_MAINTENANCE_BANNER;

    useEffect(() => {
        document.title = "Data Repository Finder";
        //console.log(process.env.REACT_APP_MAINTENANCE_MODE);
        console.log('banner env: ' + process.env.REACT_APP_MAINTENANCE_BANNER);
    });



    return ( <div className='app-background'>
        <Container maxWidth='xl' style={{height:'100%'}}>
            <MainHeader authString={authString} clearAuthString={clearAuthString} maintenanceBanner={maintenanceBanner}/>

            <div className="content-wrapper">
                <Routes>
                    { process.env.REACT_APP_MAINTENANCE_MODE === 'true'
                        ?
                        <>
                        <Route path="/" index element={<MaintenancePage/>}/>
                        <Route path="/repository_list" element={<MaintenancePage/>} />
                        <Route path="/login" element={<MaintenancePage/>} />
                        <Route path="/data_definitions" element={<MaintenancePage/>} />
                        <Route path="/repositories/management" element={<MaintenancePage/>} />
                        </>
                        :
                        <>
                        <Route path="/" index element={<MainPage/>}/>
                        <Route path="/repository_list" element={<MainPage />} />
                        <Route path="/repositories/:id" element={<RepositoryHomePage />} />
                        <Route path="/repositories/compare" element={<RepositoryComparisonPage />} />
                        <Route path="/repositories/management" element={<RepositoryManagementHome authString={authString} setAuthString={setAuthString}/>} />
                        <Route path="/repositories/management/add" element={<RepositoryAddEditPage authString={authString} setAuthString={setAuthString} editMode={false}/>} />
                        <Route path="/repositories/management/edit/:id" element={<RepositoryAddEditPage authString={authString} setAuthString={setAuthString} editMode={true}/>} />
                        <Route path="/repositories/management/preview/:id" element={<RepositoryPreviewPage authString={authString} setAuthString={setAuthString}/>} />
                        {/*<Route path="/registration/repositories/add" element={<RepositoryRegistrationPage />} />*/}
                        {/*<Route path="/registrations/repositories/edit/:id" element={<RepositoryRegistrationPage />} />*/}
                        <Route path="/repositories/management/accepted" element={<RepositoryAcceptedForReview authString={authString} setAuthString={setAuthString}/>} />
                        <Route path="/repositories/management/accepted-publish" element={<RepositoryAcceptedForPublish authString={authString} setAuthString={setAuthString}/>} />
                        <Route path="/data_definitions" element={<DataDictionaryPage />} />
                        <Route path="/logout" element={<Login authString={authString} setAuthString={setAuthString} clearAuthString={clearAuthString} isLoggedIn={true} />} />
                        <Route path="/login" element={<Login authString={authString} setAuthString={setAuthString} clearAuthString={clearAuthString} isLoggedIn={false} />} />
                        </>
                    }
                </Routes>
            </div>

            <Footer />
        </Container>
    </div> );

}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
