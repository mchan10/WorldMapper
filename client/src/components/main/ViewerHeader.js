import React from 'react';
import { WLHeader, WRow, WCol } from 'wt-frontend';
import { useLocation } from 'react-router-dom';

const ViewerHeader = (props) => {
    const disableFunc = () => {};
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];
    const prevRegion = split[split.length - 2];
    let canBack = false;
    let canForward = false;
    const position = props.regions[prevRegion].children.indexOf(currentRegion);
    if (position !== 0){
        canBack = true;
    }
    if (position !== props.regions[prevRegion].children.length - 1){
        canForward = true;
    }
    let editablePath = [...split];
    editablePath.pop();
    const newPath = editablePath.join("/");
    return(
        <WLHeader>
            <WRow>
                <WCol size="1">
                    <i className="material-icons" style={{color: props.canUndo?"white":"black", cursor: props.canUndo?"pointer":"default"}} 
                    onClick={props.canUndo ? () => props.tpsUndo(): disableFunc}>undo</i>
                </WCol>
                <WCol size="1">
                    <i className="material-icons" style={{color: props.canRedo?"white":"black", cursor: props.canRedo?"pointer":"default"}} 
                    onClick={props.canRedo ? () => props.tpsRedo(): disableFunc}>redo</i>
                </WCol>
                <WCol size="1">
                    <i className="material-icons" style={{color: canBack?"white":"black", cursor: canBack?"pointer":"default"}}
                    onClick={canBack ? () => props.moveTo(newPath + "/" + props.regions[prevRegion].children[position - 1]): disableFunc}>arrow_back</i>
                </WCol>
                <WCol size="1">
                    <i className="material-icons" style={{color: canForward?"white":"black", cursor: canForward?"pointer":"default"}}
                    onClick={canForward ? () => props.moveTo(newPath + "/" + props.regions[prevRegion].children[position + 1]): disableFunc}>arrow_forward</i>
                </WCol>
            </WRow>    
        </WLHeader>
    );
}

export default ViewerHeader;