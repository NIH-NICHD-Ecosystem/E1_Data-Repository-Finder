// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import base64 from 'base-64';

import './Login.css';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Login({authString, isLoggedIn, setAuthString, clearAuthString}) {
    const navigate = useNavigate();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [wasLoggedOut, setWasLoggedOut] = useState(false);
    const [error, setError] = useState(null);

    React.useEffect( () => {
        if (isLoggedIn){
            clearAuthString();
            setWasLoggedOut(true);
        }
    }, [clearAuthString, isLoggedIn]);

    const handleSubmit = async e => {
        e.preventDefault();

        await loginUser({
            username,
            password
        }).then( () => {
                setAuthString(base64.encode(username + ':' + password));
                navigate('/repositories/management');
        }).catch((e)=>{
            console.log("Error logging in." + e);
        });

    }

    async function loginUser(credentials) {
        if(credentials.username === null || credentials.password === null) {
            setError("Please enter username and password to log in.");
            return null;
        } else {

            const requestUrl = process.env.REACT_APP_API_BASE_URL + 'admin/whoami';

            await fetch(requestUrl, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${base64.encode(`${credentials.username}:${credentials.password}`)}`
                })
            }).then(response => {
                if(response.status===401) {
                    setError("Invalid username and/or password.")
                    throw Error("Invalid username and/or password.");
                } else if (response.status!==200){
                    setError(response.error);
                    return response.error;
                } else {
                    return response.json();
                }

            });
        }
    }


    return(
        <Box>
        <div className="login-wrapper">
            { wasLoggedOut &&
                <div><p>You have been logged out.</p></div>
            }
            { error &&
                <div className='red-icon'>{error}</div>
            }
            <h2>Please Log In</h2>
            <p>Management features are only available to Data Repository Finder administrators.</p>
            <br />

            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <br />
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <br />
                <br />
                <label>
                    Password
                    <br />
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <br />
                <br />
                <div>
                    <Button type="submit" size="small" variant="contained" className="large-button">Login</Button>
                </div>
            </form>
        </div>
        </Box>
    )
}


Login.propTypes = {
    setAuthString: PropTypes.func.isRequired
}
