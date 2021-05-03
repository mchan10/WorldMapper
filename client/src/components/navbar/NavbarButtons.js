import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        props.moveTo("/");
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
        }
    };

    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton onClick={() => props.toggleUpdate(true)} wType="texted">
                    <span style={{color:"purple"}}>{props.name}</span>
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton onClick={handleLogout} wType="texted">
                    <span style={{color:"white"}}>Logout</span>
                </WButton>
            </WNavItem>
        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={() => props.toggleCreate(true)} wType="texted" hoverAnimation="text-primary"> 
                <span style={{color:"white"}}>Create Account</span>
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={() => props.toggleLogin(true)} wType="texted" hoverAnimation="text-primary">
                <span style={{color:"white"}}>Login</span>
                </WButton>
            </WNavItem>
        </>
    );
};

const NavbarButtons = (props) => {
    return(
        <>
        {
            props.auth === false ? <LoggedOut toggleLogin={props.toggleLogin} toggleCreate={props.toggleCreate} />
            : <LoggedIn fetchUser={props.fetchUser} logout={props.logout} name={props.name} toggleUpdate={props.toggleUpdate} moveTo={props.moveTo}/>
        }
        </>
    )
}

export default NavbarButtons;