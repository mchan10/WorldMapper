import React, { useState }            from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WButton, WCard, WCContent, WCFooter } from 'wt-frontend';
import MapEntry from './MapEntry.js'
import { Switch, Route } from 'react-router-dom';
import SpreadsheetTable from './SpreadsheetTable.js'
import SpreadsheetControls from './SpreadsheetControls.js';
import SpreadsheetHeader from './SpreadsheetHeader.js';
import ViewerHeader from './ViewerHeader.js';
import ViewerRegion from './ViewerRegion.js';
import ViewerLandmarks from './ViewerLandmarks.js';

const MainContents = (props) => {

    return (
        <>
        {props.auth ? 
        <Switch>
            <Route exact path='/' render={() => 
                <div style={{backgroundColor:"black", width:"50%", height:"75%",left:"50%",top:"50%",position:"relative",transform: "translate(-50%, -50%)"}}>
                    <WLayout wLayout="header-rside"> 
                        <WLHeader style={{color:"white", textAlign:"center"}}>
                            Your Maps
                        </WLHeader>
                        <WLMain style={{backgroundColor:"#f76565", overflow:"auto"}}>
                            {props.maps.map(entry => (
                                <MapEntry 
                                map={entry} key={entry._id} moveTo={props.moveTo} changeMapName={props.changeMapName} refetch={props.refetch} deleteMap={props.deleteMap} changeDeleteFunc={props.changeDeleteFunc} toggleDelete={props.toggleDelete} updateAccess={props.updateAccess}>
                                </MapEntry>
                            ))}
                        </WLMain>
                        <WLSide>
                            <WCard wLayout="content-footer" style={{width:"100%", height:"100%"}}>
                                <WCContent>
                                    img
                                </WCContent>
                                <WCFooter>
                                    <WButton style={{backgroundColor:"red", width:"100%", justifyContent:"center", height:"100%"}} onClick={() => props.toggleCreateMap(true)}>
                                        Create New Map
                                    </WButton>
                                </WCFooter>
                            </WCard>
                        </WLSide>
                    </WLayout> 
                </div>}>
            </Route>
            <Route path='/spreadsheet/' render={()=>
                <div style={{width:"80%", height:"85%",left:"50%",top:"50%",position:"relative",transform: "translate(-50%, -50%)"}}>
                    <WLayout wLayout="header">
                        <WLHeader>
                            <SpreadsheetControls regions={props.regions} addSubregion={props.addSubregion} 
                            tpsRedo={props.tpsRedo} tpsUndo={props.tpsUndo} canUndo={props.canUndo} canRedo={props.canRedo}>
                            </SpreadsheetControls>
                        </WLHeader>
                        <WLMain>
                            <div style={{backgroundColor:"#e3dede", width:"100%", height:"100%",left:"50%",top:"50%",position:"relative",transform: "translate(-50%, -50%)"}}>
                                <WLayout wLayout="header">
                                    <WLHeader style={{backgroundColor:"red"}}>
                                        <SpreadsheetHeader sortRegions={props.sortRegions}></SpreadsheetHeader>
                                    </WLHeader>
                                    <WLMain style={{overflow:"auto"}}>
                                        <SpreadsheetTable moveTo={props.moveTo} regions={props.regions} updateField={props.updateField} 
                                        deleteRegion={props.deleteRegion}>
                                        </SpreadsheetTable>
                                    </WLMain>
                                </WLayout>
                            </div>
                        </WLMain>
                    </WLayout>
                </div>
            }>
            </Route>
            <Route path='/viewer/' render={() => 
                <div style={{width:"80%", height:"85%",left:"50%",top:"50%",position:"relative",transform: "translate(-50%, -50%)"}}>
                    <WLayout wLayout="header-lside">
                        <ViewerHeader tpsRedo={props.tpsRedo} tpsUndo={props.tpsUndo} canUndo={props.canUndo} canRedo={props.canRedo} 
                        moveTo={props.moveTo} regions={props.regions}>
                        </ViewerHeader>
                        <ViewerRegion regions={props.regions} moveTo={props.moveTo}>
                        </ViewerRegion>
                        <ViewerLandmarks regions={props.regions} addLandmark={props.addLandmark} removeLandmark={props.removeLandmark} 
                        editLandmark={props.editLandmark}>
                        </ViewerLandmarks>
                    </WLayout>
                </div>    
            }>
            </Route>
        </Switch>
        
        : null}
        </>
    );
};

export default MainContents;