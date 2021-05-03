import React from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton } from 'wt-frontend';

const Delete = (props) => {
    const handleDelete = () => {
        props.deleteFunc();
        props.toggleDelete(false);
    }
    return(
    <WModal visible>
        <WMHeader onClose={() => props.toggleDelete(false)}>
            Delete
        </WMHeader>
        <WMMain>
            Are you sure?
        </WMMain>
        <WMFooter>
            <WButton onClick={handleDelete} style={{height:"100%", backgroundColor:"red", width:"100%"}}>
                Delete
            </WButton>
        </WMFooter>
    </WModal>);
}

export default Delete;