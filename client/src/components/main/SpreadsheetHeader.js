import React from 'react';
import { useLocation } from 'react-router-dom';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadsheetHeader = (props) => {
    const style = {
        display:"grid", 
        alignItems:"center", 
        color:"white"
    }
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];
    let canSort = false;
    if (props.regions[currentRegion].children.length > 0){
        canSort = true;
    }
    else{
        canSort = false;
    }

    return(
        <WRow style={{height:"100%"}}>
            <WCol size="1" style={style}></WCol>
            <WCol size="2" style={style}> 
                <span style={{ gridRow: "1 / 1"}}> Name </span> 
                <i className="material-icons" style={{gridRow: "1 / 1", width:"24px", cursor:"pointer", color:canSort?"white":"black"}} 
                onClick={() => props.sortRegions(currentRegion, "name")}> arrow_downward </i>
            </WCol>
            <WCol size="2" style={style}> 
                <span style={{ gridRow: "1 / 1"}}> Capital </span> 
                <i className="material-icons" style={{gridRow: "1 / 1", width:"24px", cursor:"pointer", color:canSort?"white":"black"}} 
                onClick={() => props.sortRegions(currentRegion, "capital")}> arrow_downward </i>
            </WCol>
            <WCol size="2" style={style}>
                <span style={{ gridRow: "1 / 1"}}> Leader </span> 
                <i className="material-icons" style={{gridRow: "1 / 1", width:"24px", cursor:"pointer", color:canSort?"white":"black"}} 
                onClick={() => props.sortRegions(currentRegion, "leader")}> arrow_downward </i>
            </WCol>
            <WCol size="1" style={style}> Flag </WCol>
            <WCol size="4" style={style}> Landmarks </WCol>
        </WRow>
    );
}

export default SpreadsheetHeader;