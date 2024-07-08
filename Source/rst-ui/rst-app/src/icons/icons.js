// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React from "react";

import rstLogo from "../img/rst-logo.png";
import rstLogoFooter from "../img/rst-logo-footer.png";

export function RSTLogo() {
    return (
        <img alt='Data Repository Finder logo' src={rstLogo} />
    )
}

export function RSTFooterLogo() {
    return (
        <img alt='Data Repository Finder logo for footer' src={rstLogoFooter} height='65px' />
    )
}
