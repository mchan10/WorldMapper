import React, { useState, useEffect } from 'react';
import { WRow, WCol, WButton, WInput } from 'wt-frontend';

const SpreadsheetEntry = (props) => {
    const [image, changeImage] = useState(null);
    const currentRegion = props.regions[props.region];
    const selected = props.index === props.inputRow;
    let flagPath = props.flagPath + "/" + currentRegion.name + " Flag.png";
    const importFile = async () => {
        await changeImage(await import(`./../../assets/${flagPath}`).catch((e)=>{console.log("no img")}));
    }
    importFile();

    const handleFieldChange = async (e) => {
        const field = e.target.name;
        const value = e.target.value;
        props.updateField(props.region, field, value);
        props.setInputRow(-1);
        props.setInputCol(-1);
    }
    
    const activateField = async (col) => {
        console.log(props.index,col)
        props.setInputRow(props.index);
        props.setInputCol(col);
    }

    const handleKeySwap = async (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const region = e.target.id;
        props.updateField(region, field, value);
    }

    const keyboardHandle = (event) => {
        if(event.key === "ArrowUp"){
            if (props.inputRow >= 1){
                handleKeySwap(event);
                props.setInputRow(props.inputRow - 1);
            }
        }
        if (event.key === "ArrowDown"){
            if (props.inputRow !== -1 && props.inputRow < props.length - 1){
                handleKeySwap(event);
                props.setInputRow(props.inputRow + 1);
            }
        }
        if (event.key === "ArrowLeft"){
            if (props.inputCol >= 1){
                handleKeySwap(event);
                props.setInputCol(props.inputCol - 1);
            }
        }
        if (event.key === "ArrowRight"){
            if (props.inputCol !== -1 && props.inputCol < 2){
                handleKeySwap(event);
                props.setInputCol(props.inputCol + 1);
            }
        }
	}

	useEffect(() => {
		document.addEventListener("keydown", keyboardHandle, false);
		return () => {
			document.removeEventListener("keydown", keyboardHandle, false);
		}
	}, [props.inputRow, props.inputCol]);
    
    const deleteFunction = () => {
        props.deleteRegion(props.region, props.index);
    }

    const handleDelete = () => {
        props.changeDeleteFunc(() => deleteFunction);
        props.toggleDelete(true);
    }

    return(
        <WRow>
            <WCol size="1">
                <i className="material-icons" onClick={handleDelete} style={{color:"red", cursor:"pointer"}}>clear</i>
            </WCol>
            <WCol size="2">
                {selected && props.inputCol === 0 ? 
                <WInput defaultValue={currentRegion.name} name="name" autoFocus onBlur={handleFieldChange} id={props.region}>
                </WInput>
                :
                <WButton onClick={props.moveTo} hoverAnimation="darken" style={{width:"95%"}}>
                    {currentRegion.name}
                </WButton>}
            </WCol>
            <WCol size="2" style={{display:"grid", alignItems:"center"}}>
                {selected && props.inputCol === 1 ? 
                <WInput defaultValue={currentRegion.capital} name="capital" autoFocus onBlur={handleFieldChange} id={props.region}>
                </WInput>
                :
                <div onClick={() => activateField(1)}>
                    {currentRegion.capital}
                </div>
                }
            </WCol>
            <WCol size="2" style={{display:"grid", alignItems:"center"}}>
                {selected && props.inputCol === 2 ? 
                <WInput defaultValue={currentRegion.leader} name="leader" autoFocus onBlur={handleFieldChange} id={props.region}>
                </WInput>
                :
                <div onClick={() => activateField(2)}>
                    {currentRegion.leader}
                </div>
                }
            </WCol>
            <WCol size="1" style={{display:"grid", alignItems:"center"}}>
                {<img src={image ? image.default: null} alt="No Flag" style={{height:"70%", width:"44%"}}/>}
            </WCol>
            <WCol size="4" style={{display:"grid", alignItems:"center"}}> 
                <WButton onClick={props.moveViewer} hoverAnimation="darken" style={{height:"100%"}}>
                    {currentRegion.landmarks.join()}
                </WButton>
            </WCol>
        </WRow>
    );
}

export default SpreadsheetEntry;