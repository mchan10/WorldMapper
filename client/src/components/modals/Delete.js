import React from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton } from 'wt-frontend';

const Delete = (props) => {
    const disableFunc = () => {};

    const handleDelete = () => {
        props.deleteFunc();
        props.toggleDelete(false);
        props.changeDeleteFunc(disableFunc);
    }

    const closeModal = () => {
        props.toggleDelete(false);
        props.changeDeleteFunc(disableFunc);
    }

    return(
    <WModal visible>
        <WMHeader onClose={closeModal} style={{backgroundColor:"red", color:"white", textAlign:"center"}}>
            Delete
        </WMHeader>
        <WMMain style={{backgroundColor:"black", color:"white"}}>
            Are you sure you want to delete this? It may affect other regions.
        </WMMain>
        <WMFooter style={{backgroundColor:"black"}}>
            <WButton onClick={handleDelete} style={{height:"100%", width:"100%", justifyContent:"center"}}>
                Delete
            </WButton>
        </WMFooter>
    </WModal>);
}

export default Delete;