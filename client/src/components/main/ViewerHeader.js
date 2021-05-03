import React from 'react';
import { WLHeader, WRow, WCol, WButton } from 'wt-frontend';

const ViewerHeader = (props) => {
    return(
        <WLHeader>
            <WRow>
                <WCol size="1">
                    <WButton>
                        <i className="material-icons">undo</i>
                    </WButton>
                </WCol>
                <WCol size="1">
                    <WButton>
                        <i className="material-icons">redo</i>
                    </WButton>
                </WCol>
                <WCol size="1">
                    <WButton>
                        <i className="material-icons">arrow_back</i>
                    </WButton>
                </WCol>
                <WCol size="1">
                    <WButton>
                        <i className="material-icons">arrow_forward</i>
                    </WButton>
                </WCol>
            </WRow>    
        </WLHeader>
    );
}

export default ViewerHeader;