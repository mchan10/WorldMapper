import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SpreadsheetEntry from './SpreadsheetEntry.js';

const SpreadsheetTable = (props) => {
    const [inputRow, setInputRow] = useState(-1);
    const [inputCol, setInputCol] = useState(-1);
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];

    return(
        <>
            {props.regions[currentRegion].children.map((region, index) => (
                <SpreadsheetEntry region={region} key={region} regions={props.regions} moveTo={() => props.moveTo(path + "/" + region)} 
                moveViewer={() => props.moveTo((path + "/" + region).replace("spreadsheet","viewer"))} inputRow={inputRow} inputCol={inputCol}
                index={index} setInputRow={setInputRow} setInputCol={setInputCol} length={props.regions[currentRegion].children.length}>
                </SpreadsheetEntry>
            ))}
        </>
    );
}

export default SpreadsheetTable;