import React from 'react';
import { WLHeader, WRow, WCol, WButton } from 'wt-frontend';

const ViewerHeader = (props) => {
    return(
        <WLHeader>
            <WRow>
                <WCol size="1">
                    <i className="material-icons">undo</i>
                </WCol>
                <WCol size="1">
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