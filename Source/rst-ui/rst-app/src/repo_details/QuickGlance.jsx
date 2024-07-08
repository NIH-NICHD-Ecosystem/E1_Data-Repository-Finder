// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";
import QuickView from "../quick_view/QuickView";

const QuickGlance = (props) => {
    // console.log(props);

    return (
        <React.Fragment>
            <h3>Quick Glance</h3>
            <QuickView repository={props.repository}></QuickView>
        </React.Fragment>
    );

}

export default QuickGlance;
