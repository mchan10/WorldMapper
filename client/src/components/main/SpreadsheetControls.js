import React from 'react';
import { useLocation } from 'react-router-dom';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadsheetControls = (props) => {
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];
    const disableFunc = () => {};
    return(
        <WRow>
            <WCol size="1">
                <i onClick={() => props.addSubregion(currentRegion)} className="material-icons" style={{color:"green", cursor:"pointer"}}>
                    add
                </i>
            </WCol>
            <WCol size="1">
                <i className="material-icons" style={{color: props.canUndo?"white":"black", cursor: props.canUndo?"pointer":"default"}} 
                onClick={props.canUndo ? () => props.tpsUndo(): disableFunc}>undo</i>
            </WCol>
            <WCol size="1">
                <i className="material-icons" style={{color: props.canRedo?"white":"black", cursor: props.canRedo?"pointer":"default"}} 
                onClick={props.canRedo ? () => props.tpsRedo(): disableFunc}>redo</i>
            </WCol>
            <WCol size="6">
                <div style={{color:"white", textAlign:"center"}}>{"Region Name: " + props.regions[currentRegion].name}</div>
            </WCol>
        </WRow>
    );
}

export default SpreadsheetControls;