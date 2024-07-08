// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import Icon from "@mui/material/Icon";
import React from "react";

export function RepoIconImg(props) {
    return (
        <Icon sx={{ height:50, width:50 }}>
            <img alt={props.altText} src={process.env.REACT_APP_BASE_URL + props.imageUri} height={50} width={50} />
        </Icon>
    );
}

export default RepoIconImg;
