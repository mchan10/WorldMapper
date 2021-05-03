import React from 'react';
import { useLocation } from 'react-router-dom';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadsheetControls = (props) => {
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];
    return(
        <WRow>
            <WCol size="1">
                <i onClick={() => props.addSubregion(currentRegion)} className="material-icons" style={{color:"green", cursor:"pointer"}}>
                    add
                </i>
            </WCol>
            <WCol size="1">
                <i className="material-icons" style={{color:"white", cursor:"pointer"}}>undo</i>
            </WCol>
            <WCol size="1">
                <i className="material-icons" style={{color:"white", cursor:"pointer"}}>redo</i>
            </WCol>
            <WCol size="6">
                <span style={{color:"white"}}>{"Region Name: " + props.regions[currentRegion].name}</span>
            </WCol>
        </WRow>
    );
}

export default SpreadsheetControls;