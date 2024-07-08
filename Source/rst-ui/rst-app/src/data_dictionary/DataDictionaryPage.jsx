 // Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
 // Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
 // SPDX-License-Identifier: MIT
 // See LICENSE.txt

import React, {useState} from 'react';
import Papa from 'papaparse';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";

async function fetchCsv() {
    const response = await fetch('RST Data Dictionary_Working.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}

const DataDictionaryPage = (props) => {
    const [tableRows, setTableRows] = useState([]);

    const [values, setValues] = useState([]);

    React.useEffect( () => {
        GetData();
    }, []);

    async function GetData() {
        const data = Papa.parse(await fetchCsv(),
            {
                header:true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray = [];
                    const valuesArray = [];

                    // Iterating data to get column name and their values
                    results.data.map((d) => {
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });

                    // Filtered Column Names
                    setTableRows(rowsArray[0]);

                    // Filtered Values
                    setValues(valuesArray);
                }
            }
        );
        return data;
    }

    return ( <React.Fragment>
        <Container maxWidth='xl' style={{height:'100%'}}>

            <main>
                <div>
                    <Box className='repository-page'>

                        <h3 className='panel-label'>Field Dictionary</h3>

                        <div>
                            <TableContainer>
                                <Table aria-label="data dictionary table">
                                <TableHead>
                                    <TableRow>
                                    {tableRows.map((rows, index) => {
                                        return <TableCell key={index}>{rows}</TableCell>;
                                    })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {values.map((value, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {value.map((val, i) => {
                                                return <TableCell key={i}>{val}</TableCell>;
                                            })}
                                        </TableRow>
                                    );
                                })}
                                </TableBody>
                                </Table>
                            </TableContainer>
                        </div>

                    </Box>
                </div>
            </main>

        </Container>
    </React.Fragment>
    );
}

export default DataDictionaryPage;
