import React from 'react';
import { WRow, WCol, WButton, WInput } from 'wt-frontend';

const SpreadsheetEntry = (props) => {
    const currentRegion = props.regions[props.region];
    const selected = props.index === props.inputRow;

    const handleFieldChange = async (e) => {
        const field = e.target.name;
        const value = e.target.value;
        console.log(field,value);
        props.setInputRow(-1);
        props.setInputCol(-1);
    }
    
    const activateField = async (col) => {
        console.log(props.index,col)
        props.setInputRow(props.index);
        props.setInputCol(col);
    }
    return(
        <WRow>
            <WCol size="1">
                <WButton>
                    <i className="material-icons">clear</i>
                </WButton>
            </WCol>
            <WCol size="2">
                {selected && props.inputCol === 0 ? 
                <WInput defaultValue={currentRegion.name} name="name" autoFocus onBlur={handleFieldChange}>

                </WInput>
                :
                <WButton onClick={props.moveTo} hoverAnimation="darken">
                    {currentRegion.name}
                </WButton>}
            </WCol>
            <WCol size="2" style={{display:"grid", alignItems:"center"}}>
                {selected && props.inputCol === 1 ? 
                <WInput defaultValue={currentRegion.capital} name="capital" autoFocus onBlur={handleFieldChange}>
                </WInput>
                :
                <div onClick={() => activateField(1)}>
                    {currentRegion.capital}
                </div>
                }
            </WCol>
            <WCol size="2" style={{display:"grid", alignItems:"center"}}>
                {selected && props.inputCol === 2 ? 
                <WInput defaultValue={currentRegion.leader} name="leader" autoFocus onBlur={handleFieldChange}>
                </WInput>
                :
                <div onClick={() => activateField(2)}>
                    {currentRegion.leader}
                </div>
                }
            </WCol>
            <WCol size="1" style={{display:"grid", alignItems:"center"}}>
                flag
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