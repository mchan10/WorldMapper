import React, { useState } from 'react';
import { WRow, WCol, WInput } from 'wt-frontend';

const ViewerEntry = (props) => {

    const [editing, toggleEditing] = useState(false);

    const removeLandmark = () => {
        props.removeLandmark(props.region, props.index);
    }

    const editLandmark = async (e) => {
        if (await props.editLandmark(props.region, e.target.value, props.index)){
            props.toggleErrorEdit(false);
        }
        else{
            props.toggleErrorEdit(true);
        }
        toggleEditing(false);
    }

    return(
        <WRow style={{height:"5%"}}>
            <WCol size="1">
                {props.delete ? 
                <i className="material-icons" style={{color:"red", cursor:"pointer"}} onClick={removeLandmark} >close</i>
                : null}
            </WCol>
            <WCol size="1">
                {props.delete ?
                <i className="material-icons" style={{color:"white", cursor:"pointer"}} onClick={() => toggleEditing(true)}>edit</i>
                : null}
            </WCol>
            <WCol size="10" style={{color:"white"}}>
                {editing ?
                <WInput defaultValue={props.name} onBlur={editLandmark} style={{color:"white"}} autoFocus></WInput>
                : props.name}
            </WCol>
        </WRow>
    );
}  

export default ViewerEntry;