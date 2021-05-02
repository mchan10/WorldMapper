import React from 'react';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadsheetEntry = (props) => {
    let accumulator = "";
    const currentRegion = props.regions[props.region]
    for (let i = 0; i < currentRegion.landmarks.length; i++){
        accumulator += currentRegion.landmarks[i];
    }
    return(
        <WRow>
            <WCol size="1">
                <WButton>
                    <i className="material-icons">clear</i>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton onClick={props.moveTo} hoverAnimation="darken">
                    {currentRegion.name}
                </WButton>
            </WCol>
            <WCol size="2" style={{display:"grid", alignItems:"center"}}>
                {currentRegion.capital}
            </WCol>
            <WCol size="2" style={{display:"grid", alignItems:"center"}}>
                {currentRegion.leader}
            </WCol>
            <WCol size="1" style={{display:"grid", alignItems:"center"}}>
                flag
            </WCol>
            <WCol size="4" style={{display:"grid", alignItems:"center"}}> 
                {accumulator}
            </WCol>
        </WRow>
    );
}

export default SpreadsheetEntry;