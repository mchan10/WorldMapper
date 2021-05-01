import React, { useState } from 'react';
import { GET_DB_MAPS, GET_DB_REGIONS } from '../../cache/queries.js';
import * as mutations from '../../cache/mutations.js';
import { WLayout, WLHeader, WLMain, WNavbar } from 'wt-frontend';
import { useMutation, useQuery } from '@apollo/client';
import NavbarButtons from '../navbar/NavbarButtons.js';
import Login from '../modals/Login.js';
import CreateAccount from '../modals/CreateAccount.js';
import MainContents from '../main/MainContents.js';

const Homescreen = (props) => {
    const auth = props.user === null ? false : true;
    let maps = [];
    let regions = [];
    const [showLogin, toggleShowLogin] 	= useState(false);
    const [showCreate, toggleShowCreate] = useState(false);
    
    const [AddNewMap] = useMutation(mutations.ADDNEWMAP);
    
    const mapq = useQuery(GET_DB_MAPS);
    if(mapq.loading) { console.log(mapq.loading, 'loading'); }
	if(mapq.error) { console.log(mapq.error, 'error'); }
	if(mapq.data) { maps = mapq.data.getAllMaps; }
    const regq = useQuery(GET_DB_REGIONS);
    if(regq.loading) { console.log(regq.loading, 'loading'); }
	if(regq.error) { console.log(regq.error, 'error'); }
	if(regq.data) { regions = regq.data.getAllRegions; }
    
    const refetchData = async () => {
        const newmap = await mapq.refetch();
        const newreg = await regq.refetch();
        if (newmap.data){
            maps = newmap.data;
        }
        if (newreg.data){
            regions = newreg.data;
        }
    }

    const addNewMap = async () => {
        const { data } = await AddNewMap();
        refetchData();
    }

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
                <MainContents auth = {auth} maps={maps} newMap={addNewMap}></MainContents>
            </WLMain>
            {showLogin ? <Login fetchUser={props.fetchUser} toggleLogin={toggleShowLogin}> </Login> : null}
            {showCreate ? <CreateAccount fetchUser={props.fetchUser} toggleCreate={toggleShowCreate}></CreateAccount>: null}
        </WLayout>
    );
}

export default Homescreen;