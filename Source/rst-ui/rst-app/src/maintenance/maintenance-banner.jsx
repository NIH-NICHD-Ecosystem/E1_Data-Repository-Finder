// Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
// Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
// SPDX-License-Identifier: MIT
// See LICENSE.txt

import React, {useEffect} from "react";

const MaintenanceBanner = () => {

    const maintenanceStart = process.env.REACT_APP_MAINTENANCE_START;
    const maintenanceEnd = process.env.REACT_APP_MAINTENANCE_END;

    useEffect(() => {
        console.log('start: ' + maintenanceStart);
        console.log('end: ' + maintenanceEnd);
    })

    return (
        <React.Fragment>
        <div className="maintenance-banner">
            <div>
                <strong>Scheduled Maintenance </strong>-
                Data Repository Finder will be undergoing scheduled maintenance from {maintenanceStart} to {maintenanceEnd}.
                We
                apologize for any inconvenience caused during this time.
            </div>
        </div>
        </React.Fragment>
    );

};

export default MaintenanceBanner;
