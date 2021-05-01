import React from 'react';
import { WCol, WRow } from 'wt-frontend';

const MapEntry = (props) => {
    return(
        <WRow style={{height:"8%"}}>
            <WCol size="7">{props.map.name}</WCol>
            
        </WRow>
    );
}

export default MapEntry;