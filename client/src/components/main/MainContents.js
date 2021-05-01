import React            from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WButton } from 'wt-frontend';
import MapEntry from './MapEntry.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
                                <MapEntry map={entry} key={entry._id} moveTo={props.moveTo}>
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
            <Route path='/viewer/' render={()=>
                <></>
            }>
            </Route>
        </Switch>
        
        : null}
        </>
    );
};

export default MainContents;