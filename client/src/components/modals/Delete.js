import React from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton } from 'wt-frontend';

const Delete = (props) => {
    const handleDelete = () => {
        props.deleteFunc();
        props.toggleDelete(false);
    }
    return(
    <WModal visible>
        <WMHeader onClose={() => props.toggleDelete(false)} style={{backgroundColor:"red", color:"white", textAlign:"center"}}>
            Delete
        </WMHeader>
        <WMMain style={{backgroundColor:"black", color:"white"}}>
            Are you sure?
        </WMMain>
        <WMFooter style={{backgroundColor:"black"}}>
            <WButton onClick={handleDelete} style={{height:"100%", width:"100%", justifyContent:"center"}}>
                Delete
            </WButton>
        </WMFooter>
    </WModal>);
}

export default Delete;