import React, { useState } from 'react';
import { WCol, WRow, WButton, WInput } from 'wt-frontend';

const MapEntry = (props) => {

    const [editingName, toggleEditName] = useState(false);

    const handleNameChange = async (e) => {
        const newName = e.target.value;
        const old = await props.changeMapName({variables:{_id: props.map._id, name: newName}});
        toggleEditName(false);
        props.refetch();
    }

    const handleDeleteMap = async () => {
        const del = await props.deleteMap({variables:{_id: props.map._id}});
        props.refetch();
    }

    const deleteFunc = async () => {
        props.toggleDelete(true);
        props.changeDeleteFunc(() => handleDeleteMap);
    }

    return(
        <WRow style={{height:"8%"}}>
            {editingName?
                <WCol size="11" style={{borderStyle:"hidden solid solid hidden"}}>
                    <WInput style={{height:"100%"}} defaultValue={props.map.name} onBlur={handleNameChange}>

                    </WInput>
                </WCol>
                :
                <WCol size="11" style={{borderStyle:"hidden solid solid hidden"}} onClick={() => {props.moveTo('/spreadsheet/' + props.map.region)}}>
                    {props.map.name}
                </WCol>
            }
            <WCol size="1"> 
                <WButton style={{padding:"0", backgroundColor:"#f76565",width:"50%"}} hoverAnimation="darken" onClick={() => {toggleEditName(true)}}>
                    <i className="material-icons">edit</i> 
                </WButton> 
                <WButton style={{padding:"0", backgroundColor:"#f76565",width:"50%"}} hoverAnimation="darken" onClick={deleteFunc}>
                    <i className="material-icons">delete</i> 
                </WButton> 
            </WCol>
        </WRow>
    );
}

export default MapEntry;