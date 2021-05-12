import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpreadsheetEntry from './SpreadsheetEntry.js';

const SpreadsheetTable = (props) => {
    const [inputRow, setInputRow] = useState(-1);
    const [inputCol, setInputCol] = useState(-1);
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];

    const keyboardHandle = (event) => {
        if(event.key == "ArrowUp"){
            if (inputRow >= 1){
                setInputRow(inputRow - 1);
            }
        }
        if (event.key == "ArrowDown"){
            if (inputRow !== -1 && inputRow < props.regions[currentRegion].children.length - 1){
                setInputRow(inputRow + 1);
            }
        }
        if (event.key == "ArrowLeft"){
            if (inputCol >= 1){
                setInputCol(inputCol - 1);
            }
        }
        if (event.key == "ArrowRight"){
            if (inputCol !== -1 && inputCol < 2){
                setInputCol(inputCol + 1);
            }
        }
	}

	useEffect(() => {
		document.addEventListener("keydown", keyboardHandle, false);
		return () => {
			document.removeEventListener("keydown", keyboardHandle, false);
		}
	});
    return(
        <>
            {props.regions[currentRegion].children.map((region, index) => (
                <SpreadsheetEntry region={region} key={region} regions={props.regions} moveTo={() => props.moveTo(path + "/" + region)} 
                moveViewer={() => props.moveTo((path + "/" + region).replace("spreadsheet","viewer"))} inputRow={inputRow} inputCol={inputCol}
                index={index} setInputRow={setInputRow} setInputCol={setInputCol}>
                </SpreadsheetEntry>
            ))}
        </>
    );
}

export default SpreadsheetTable;