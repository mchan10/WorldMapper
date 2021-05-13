import React from 'react';
import { useLocation } from 'react-router-dom';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadsheetHeader = (props) => {
    const style = {
        display:"grid", 
        alignItems:"center", 
        color:"white"
    }
    const styleSort = {
        display:"grid", 
        alignItems:"center", 
        color:"white",
        cursor:"pointer"
    }
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];

    return(
        <WRow style={{height:"100%"}}>
            <WCol size="1" style={style}></WCol>
            <WCol size="2" style={styleSort} onClick={() => props.sortRegions(currentRegion, "name")}> Name </WCol>
            <WCol size="2" style={styleSort} onClick={() => props.sortRegions(currentRegion, "capital")}> Capital </WCol>
            <WCol size="2" style={styleSort} onClick={() => props.sortRegions(currentRegion, "leader")}> Leader </WCol>
            <WCol size="1" style={style}> Flag </WCol>
            <WCol size="4" style={style}> Landmarks </WCol>
        </WRow>
    );
}

export default SpreadsheetHeader;