import React from 'react';
import { useLocation } from 'react-router-dom';
import SpreadsheetEntry from './SpreadsheetEntry.js';

const SpreadsheetTable = (props) => {
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];
    return(
        <>
            {props.regions[currentRegion].children.map(region => (
                <SpreadsheetEntry region={region} key={region} regions={props.regions} moveTo={() => props.moveTo(path + "/" + region)}>
                </SpreadsheetEntry>
            ))}
        </>
    );
}

export default SpreadsheetTable;