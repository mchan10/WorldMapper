import React from 'react';
import { WLHeader, WRow, WCol, WButton } from 'wt-frontend';

const ViewerHeader = (props) => {
    const disableFunc = () => {};
    return(
        <WLHeader>
            <WRow>
                <WCol size="1" style={{color: props.canUndo?"white":"black", cursor: props.canUndo?"pointer":"default"}} 
                onClick={props.canUndo ? () => props.tpsUndo(): disableFunc}>
                    <i className="material-icons">undo</i>
                </WCol>
                <WCol size="1" style={{color: props.canRedo?"white":"black", cursor: props.canRedo?"pointer":"default"}} 
                onClick={props.canRedo ? () => props.tpsRedo(): disableFunc}>
                    <i className="material-icons">redo</i>
                </WCol>
                <WCol size="1">
                    <i className="material-icons">arrow_back</i>
                </WCol>
                <WCol size="1">
                    <i className="material-icons">arrow_forward</i>
                </WCol>
            </WRow>    
        </WLHeader>
    );
}

export default ViewerHeader;