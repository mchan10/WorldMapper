import React, { useState } from 'react';
import { WInput, WMFooter, WMHeader, WMMain, WModal, WButton } from 'wt-frontend';

const CreateMap = (props) => {
    const [input, setInput] = useState("New Map");

    const updateInput = (e) => {
        const updated = e.target.value;
        setInput(updated);
    }

    const handleCreateMap = () => {
        props.createMap(input);
        props.toggleCreateMap(false);
    }

    return(
        <WModal visible>
            <WMHeader style={{backgroundColor:"red", color:"white", textAlign:"center"}} onClose={() => props.toggleCreateMap(false)}>
                Create Map
            </WMHeader>
            <WMMain style={{backgroundColor:"black"}}>
                <WInput style={{backgroundColor:"white"}} 
                    className="" onBlur={updateInput} labelAnimation="shrink" defaultValue="New Map"
                    barAnimation="solid" labelText="Map Name" wType="outlined" inputType="text" 
                />
            </WMMain>
            <WMFooter style={{backgroundColor:"black"}}>
                <WButton style={{backgroundColor:"white", color:"black"}}
                    className="modal-button" onClick={handleCreateMap} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
                    Submit
                </WButton>
            </WMFooter>
        </WModal>
    );
}

export default CreateMap;