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
                <WButton onClick={props.moveTo}>
                    {currentRegion.name}
                </WButton>
            </WCol>
            <WCol size="2">
                {currentRegion.capital}
            </WCol>
            <WCol size="2">
                {currentRegion.leader}
            </WCol>
            <WCol size="1">
                flag
            </WCol>
            <WCol size="4">
                {accumulator}
            </WCol>
        </WRow>
    );
}

export default SpreadsheetEntry;