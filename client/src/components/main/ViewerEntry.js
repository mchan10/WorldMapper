import React from 'react';
import { WRow, WCol } from 'wt-frontend';

const ViewerEntry = (props) => {

    const removeLandmark = () => {
        props.removeLandmark(props.region, props.index);
    }

    return(
        <WRow style={{height:"5%"}}>
            <WCol size="1">
                {props.delete ? 
                    <i className="material-icons" style={{color:"red", cursor:"pointer"}} onClick={removeLandmark} >close</i>
                : null}
            </WCol>
            <WCol size="1">
                <i className="material-icons" style={{color:"white", cursor:"pointer"}}>edit</i>
            </WCol>
            <WCol size="10" style={{color:"white"}}>
                {props.name}
            </WCol>
        </WRow>
    );
}  

export default ViewerEntry;