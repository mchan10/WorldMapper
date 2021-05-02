import React from 'react';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadsheetEntry = (props) => {
    let accumulator = "";
    for (let i = 0; i < props.region.landmarks.length; i++){
        accumulator += props.region.landmarks[i];
    }
    return(
        <WRow>
            <WCol size="1">
                <WButton>
                    <i className="material-icons">clear</i>
                </WButton>
            </WCol>
            <WCol size="2">
                {props.region.name}
            </WCol>
            <WCol size="2">
                {props.region.capital}
            </WCol>
            <WCol size="2">
                {props.region.leader}
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