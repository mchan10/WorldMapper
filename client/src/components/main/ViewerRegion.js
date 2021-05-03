import React from 'react';
import { WCard, WLSide, WCContent, WCMedia } from 'wt-frontend';
import { useLocation } from 'react-router-dom'; 

const ViewerRegion = (props) => {
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];
    const region = props.regions[currentRegion];
    const parentRegion = props.regions[region.parent];
    let parentPath = (path.split("/"));
    parentPath.pop();
    parentPath = (parentPath.join("/"))
    parentPath = parentPath.replace("viewer","spreadsheet");
    return(
        <WLSide>
            <WCard wLayout="media-content" style={{height:"100%",width:"100%"}}>
                <WCMedia>image</WCMedia>
                <WCContent style={{backgroundColor:"#4b4a4a"}}>
                    <div>&nbsp;</div>
                    <div style={{color:"white",fontWeight:"bold"}}>{"Region Name: " + region.name}</div>
                    <div>&nbsp;</div>
                    <div style={{color:"white",fontWeight:"bold"}}>{"Parent Region: "} 
                        <span onClick={() => props.moveTo(parentPath)} style={{color:"blue",cursor:"pointer"}}>
                            {parentRegion.name}
                        </span>
                    </div>
                    <div>&nbsp;</div>
                    <div style={{color:"white",fontWeight:"bold"}}>{"Region Capital: " + region.capital}</div>
                    <div>&nbsp;</div>
                    <div style={{color:"white",fontWeight:"bold"}}>{"Region Leader: " + region.leader}</div>
                    <div>&nbsp;</div>
                    <div style={{color:"white",fontWeight:"bold"}}>{"# of Subregions: " + region.children.length}</div>
                </WCContent>
            </WCard>
        </WLSide>
    );
}

export default ViewerRegion;