import React            from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WButton } from 'wt-frontend';
import MapEntry from './MapEntry.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SpreadsheetTable from './SpreadsheetTable.js'
import SpreadsheetControls from './SpreadsheetControls.js';
import SpreadsheetHeader from './SpreadsheetHeader.js';
import ViewerHeader from './ViewerHeader.js';

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
                        <WLMain style={{backgroundColor:"#f76565"}}>
                            {props.maps.map(entry => (
                                <MapEntry 
                                map={entry} key={entry._id} moveTo={props.moveTo} changeMapName={props.changeMapName} refetch={props.refetch} deleteMap={props.deleteMap}>
                                </MapEntry>
                            ))}
                        </WLMain>
                        <WLSide>
                            <WButton style={{backgroundColor:"red", width:"100%", float:"bottom", textAlign:"center"}} onClick={() => props.newMap()}>
                                Create New Map
                            </WButton>
                        </WLSide>
                    </WLayout> 
                </div>}>
            </Route>
            <Route path='/spreadsheet/' render={()=>
                <div style={{width:"80%", height:"85%",left:"50%",top:"50%",position:"relative",transform: "translate(-50%, -50%)"}}>
                    <WLayout wLayout="header">
                        <WLHeader>
                            <SpreadsheetControls regions={props.regions} addSubregion={props.addSubregion}></SpreadsheetControls>
                        </WLHeader>
                        <WLMain>
                            <div style={{backgroundColor:"#e3dede", width:"100%", height:"100%",left:"50%",top:"50%",position:"relative",transform: "translate(-50%, -50%)"}}>
                                <WLayout wLayout="header">
                                    <WLHeader style={{backgroundColor:"red"}}>
                                        <SpreadsheetHeader></SpreadsheetHeader>
                                    </WLHeader>
                                    <WLMain>
                                        <SpreadsheetTable moveTo={props.moveTo} regions={props.regions}>

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
                        <ViewerHeader>
                        </ViewerHeader>

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