import React from 'react';
import { WCol, WRow } from 'wt-frontend';

const MapEntry = (props) => {
    return(
        <WRow style={{height:"8%"}}>
            <WCol size="7" onClick={() => {props.moveTo('/viewer/' + props.map._id)}}>{props.map.name}</WCol>
        </WRow>
    );
}

export default MapEntry;