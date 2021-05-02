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
                <WButton>
                    <i className="material-icons">add</i>
                </WButton>
            </WCol>
            <WCol size="1">
                <WButton>
                    <i className="material-icons">undo</i>
                </WButton>
            </WCol>
            <WCol size="1">
                <WButton>
                    <i className="material-icons">redo</i>
                </WButton>
            </WCol>
            <WCol size="6">
                <span style={{color:"white"}}>{"Region Name: " + props.regions[currentRegion].name}</span>
            </WCol>
        </WRow>
    );
}

export default SpreadsheetControls;