import React from 'react';
import { WRow, WCol } from 'wt-frontend';

const ViewerEntry = (props) => {
    return(
        <WRow style={{height:"5%"}}>
            <WCol size="1">
                {props.delete ? 
                    <i className="material-icons">close</i>
                : null}
            </WCol>
            <WCol size="11" style={{color:"white"}}>
                {props.name}
            </WCol>
        </WRow>
    );
}  

export default ViewerEntry;