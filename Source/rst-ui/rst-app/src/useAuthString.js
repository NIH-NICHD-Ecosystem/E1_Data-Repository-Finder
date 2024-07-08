// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import { useState } from 'react';

export default function useAuthString() {
    const getAuthString = () => {
        const tokenString = sessionStorage.getItem('flask');
        const userToken = tokenString;
        return userToken;
    };

    const [authString, setAuthString] = useState(getAuthString());

    const saveAuthString = userToken => {
        sessionStorage.setItem('flask', userToken);
        setAuthString(userToken);
    };

    const clearAuthString = () => {
        sessionStorage.removeItem('flask');
        setAuthString(null);
        console.log("User has been logged out.");
    }

    return {
        clearAuthString,
        setAuthString: saveAuthString,
        authString
    }
}
