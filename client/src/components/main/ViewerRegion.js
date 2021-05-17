import React, { useState } from 'react';
import { WCard, WLSide, WCContent, WCMedia, WInput } from 'wt-frontend';
import { useLocation } from 'react-router-dom'; 

const ViewerRegion = (props) => {
    const [image, changeImage] = useState(null);
    const [editing, toggleEdit] = useState(false);
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
    let pathBuilder = [];
    for (let i = 2; i < split.length; i++){
        pathBuilder.push(props.regions[split[i]].name);
    }
    let flagPath = pathBuilder.join("/");
    flagPath = flagPath + " Flag.png";
    console.log(flagPath);
    const importFile = async () => {
        await changeImage(await import(`./../../assets/${flagPath}`).catch((e)=>{console.log("no img")}));
    }
    importFile();

    const handleChangeParent = async (e) => {
        await props.changeParent(currentRegion, e.target.value);
        toggleEdit(false);
    }

    return(
        <WLSide>
            <WCard wLayout="media-content" style={{height:"100%",width:"100%"}}>
                <WCMedia>
                    <img src={image ? image.default: null} alt="No Flag" />
                </WCMedia>
                <WCContent style={{backgroundColor:"#4b4a4a"}}>
                    <div>&nbsp;</div>
                    <div style={{color:"white",fontWeight:"bold"}}>{"Region Name: " + region.name}</div>
                    <div>&nbsp;</div>
                    <div style={{color:"white",fontWeight:"bold"}}>{"Parent Region: "} 
                        {editing ? 
                        <WInput autoFocus onBlur={handleChangeParent}></WInput>
                        :<span onClick={() => props.moveTo(parentPath)} style={{color:"blue",cursor:"pointer"}}>
                            {parentRegion.name}
                        </span>}
                        <i className="material-icons" style={{color:"white", cursor:"pointer"}} onClick={() => toggleEdit(true)}>edit</i>
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