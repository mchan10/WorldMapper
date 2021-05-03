import React from 'react';
import { useLocation } from 'react-router-dom';
import { WNavItem } from 'wt-frontend';

const NavbarNavigation = (props) => {
    const location = useLocation();
    const path = location.pathname;
    const split = path.split("/")
    let namePath = [];
    for (let i = 2; i < split.length; i++){
        if (i === 2){
            namePath[0] = [props.regions[split[i]].name, "/spreadsheet/" + split[i]]
        }
        else{
            namePath[i-2] = [props.regions[split[i]].name, namePath[i-3][1] + "/" + split[i]]
        }  
    }
    namePath.pop();
    return(
        <>
        {namePath.map(pair => (
            <WNavItem hoverAnimation="lighten" onClick={() => {props.moveTo(pair[1])}} key={pair[1]} style={{cursor:"pointer"}}>
                {pair[0] + ">"}
            </WNavItem>
        ))}
        </>
    );
}

export default NavbarNavigation;