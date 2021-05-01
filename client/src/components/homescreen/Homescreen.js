import React, { useState } from 'react';
import { GET_DB_MAPS, GET_DB_REGIONS } from '../../cache/queries.js';
import { WLayout, WLHeader, WLMain, WNavbar } from 'wt-frontend';
import NavbarButtons from '../navbar/NavbarButtons.js';
import Login from '../modals/Login.js';
import CreateAccount from '../modals/CreateAccount.js'

const Homescreen = (props) => {
    const auth = props.user === null ? false : true;
    const [showLogin, toggleShowLogin] 	= useState(false);
    const [showCreate, toggleShowCreate] = useState(false);
    
    return(
        <WLayout wLayout='header'>
            <WLHeader>
                <WNavbar>
                    <ul>
                        <li>
                            World Mapper
                        </li>
                    </ul>
                    <ul>
                        <NavbarButtons
                            fetchUser={props.fetchUser} auth={auth}
                            toggleLogin={toggleShowLogin} toggleCreate={toggleShowCreate}
                        >
                        </NavbarButtons>
                    </ul>
                </WNavbar>
            </WLHeader>
            <WLMain>

            </WLMain>
            {showLogin ? <Login fetchUser={props.fetchUser} toggleLogin={toggleShowLogin}> </Login> : null}
            {showCreate ? <CreateAccount fetchUser={props.fetchUser} toggleCreate={toggleShowCreate}></CreateAccount>: null}
        </WLayout>
    );
}

export default Homescreen;