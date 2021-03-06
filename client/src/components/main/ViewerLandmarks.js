import React, { useState, useEffect } from 'react';
import { WLMain, WLayout, WLFooter, WLHeader, WRow, WCol, WInput } from 'wt-frontend';
import ViewerEntry from './ViewerEntry.js';
import { useLocation } from 'react-router-dom'; 

const ViewerLandmarks = (props) => {
    const [input, changeInput] = useState("");
    const [errorMessage, toggleError] = useState(false);
    const [errorEdit, toggleErrorEdit] = useState(false);
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    const currentRegion = split[split.length - 1];
    const region = props.regions[currentRegion];
    let stack = [];
    let accum = [];
    stack.push(...region.children);
    while (stack.length > 0){
        const id = stack.pop();
        const nextRegion = props.regions[id];
        for (let lm in nextRegion.landmarks){
            accum.push(nextRegion.landmarks[lm] + " - " + nextRegion.name);
        }
        stack.push(...nextRegion.children);
    }

    const updateInput = (e) => {
        changeInput(e.target.value);
    }

    const addInput = async () => {
        if (await props.addLandmark(currentRegion, input)){
            toggleError(false);
        }
        else{
            toggleError(true);
        }
    }

    const keyboardHandle = (e) => {
		if (e.key === "Enter"){
            addInput();
        }
	}

	useEffect(() => {
		document.addEventListener("keydown", keyboardHandle, false);
		return () => {
			document.removeEventListener("keydown", keyboardHandle, false);
		}
	});

    return(
        <WLMain style={{marginLeft:"45%", width:"50%"}}>
            <WLayout wLayout="header-footer">
                <WLHeader>
                    <div style={{textAlign:"center",color:"white"}}>Region Landmarks:</div>
                    {errorEdit ? <div style={{textAlign:"center",color:"white"}}>Landmark already within the map</div>: null}
                </WLHeader>
                <WLMain style={{overflow:"auto", backgroundColor:"black"}}>
                    {region.landmarks.map((landmark,index) => (
                        <ViewerEntry name={landmark} key={index} delete={true} region={currentRegion} index={index} 
                        removeLandmark={props.removeLandmark} editLandmark={props.editLandmark} toggleErrorEdit={toggleErrorEdit}
                        changeDeleteFunc={props.changeDeleteFunc} toggleDelete={props.toggleDelete}></ViewerEntry>
                    ))}
                    {accum.map((landmark, index) => (
                        <ViewerEntry name={landmark} key={index} delete={false} ></ViewerEntry>
                    ))}
                </WLMain>
                <WLFooter>
                    <WRow>
                        <WCol size="1">
                            <i className="material-icons" style={{color:"green", cursor:"pointer"}} onClick={addInput}>add</i>
                        </WCol>
                        <WCol size="11">
                            <WInput onBlur={updateInput} onChange={updateInput}></WInput>
                        </WCol>
                    </WRow>
                    {errorMessage ?
                    <WRow>
                        <WCol size="12">
                            Landmark already in map.
                        </WCol>
                    </WRow>:null}
                </WLFooter>
            </WLayout>
        </WLMain>
    );
}

export default ViewerLandmarks;