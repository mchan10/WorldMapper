import React, { useState } from 'react';
import { GET_DB_MAPS, GET_DB_REGIONS } from '../../cache/queries.js';
import * as mutations from '../../cache/mutations.js';
import { WLayout, WLHeader, WLMain, WNavbar, WNavItem } from 'wt-frontend';
import { useMutation, useQuery } from '@apollo/client';
import NavbarButtons from '../navbar/NavbarButtons.js';
import Login from '../modals/Login.js';
import CreateAccount from '../modals/CreateAccount.js';
import MainContents from '../main/MainContents.js';
import { withRouter } from 'react-router-dom';
import NavbarNavigation from '../navbar/NavbarNavigation.js';
import UpdateAccount from '../modals/UpdateAccount.js';
import Delete from '../modals/Delete.js'
import CreateMap from '../modals/CreateMap.js';
import { SortRegions_Transaction } from '../../utils/jsTPS.js';

const Homescreen = (props) => {
    const auth = props.user === null ? false : true;
    let maps = [];
    let regions = [];
    const [showLogin, toggleShowLogin] 	= useState(false);
    const [showCreate, toggleShowCreate] = useState(false);
    const [showUpdate, toggleShowUpdate] = useState(false);
    const [showDelete, toggleShowDelete] = useState(false);
    const [deleteFunc, changeDeleteFunc] = useState(function (){});
    const [showCreateMap, toggleShowCreateMap] = useState(false);

    const [AddNewMap] = useMutation(mutations.ADD_NEW_MAP);
    const [ChangeMapName] = useMutation(mutations.CHANGE_MAP_NAME);
    const [DeleteMap] = useMutation(mutations.DELETE_MAP);
    const [AddSubregion] = useMutation(mutations.ADD_SUBREGION);
    const [UpdateAccess] = useMutation(mutations.UPDATE_ACCESS);
    const [OrderSubregion] = useMutation(mutations.ORDER_SUBREGION);

    const mapq = useQuery(GET_DB_MAPS);
    if(mapq.loading) { console.log(mapq.loading, 'loading'); }
	if(mapq.error) { console.log(mapq.error, 'error'); }
	if(mapq.data) { maps = mapq.data.getAllMaps; }
    const regq = useQuery(GET_DB_REGIONS);
    if(regq.loading) { console.log(regq.loading, 'loading'); }
	if(regq.error) { console.log(regq.error, 'error'); }
	if(regq.data) {
        for (let i = 0; i < regq.data.getAllRegions.length; i++){
            regions[regq.data.getAllRegions[i]._id] = regq.data.getAllRegions[i];
        }
    }

    const refetchData = async () => {
        const newmap = await mapq.refetch();
        const newreg = await regq.refetch();
        let newRegionData = []
        if (newmap && newmap.data){
            maps = newmap.data.getAllMaps;
        }
        if (newreg && newreg.data){
            for (let i = 0; i < regq.data.getAllRegions.length; i++){
                newRegionData[regq.data.getAllRegions[i]._id] = regq.data.getAllRegions[i];
            }
            regions = newRegionData;
        }
        /*if(auth && (!newmap || !newreg)){
            await refetchData();
        }*/
    }

    const tpsUndo = async () => {
		const retVal = await props.tps.undoTransaction();
		await refetchData();
		return retVal;
	}

	const tpsRedo = async () => {
		const retVal = await props.tps.doTransaction();
		await refetchData();
		return retVal;
	}

    const addNewMap = async (name) => {
        const { data } = await AddNewMap({variables: {name: name}});
        await refetchData();
        moveTo("/spreadsheet/" + data.addNewMap);
    }

    const moveTo = (path) => {
        props.history.push(path);
    }

    const addSubregion = async (parentId) => {
        let newRegion = {}
        newRegion._id = "";
        newRegion.name = "New Subregion";
        newRegion.capital = "No Capital";
        newRegion.leader = "No Leader";
        newRegion.parent = "";
        newRegion.children = [];
        newRegion.landmarks = [];
        newRegion.owner = "";
        const data = await AddSubregion({variables:{_id: parentId, region: newRegion}});
        refetchData();
    }

    const sortRegions = async (_id, field) => {
        const transaction = new SortRegions_Transaction(_id, regions, field, OrderSubregion);
        props.tps.addTransaction(transaction);
        tpsRedo();
    }

    return(
        <>
        {regq.loading || mapq.loading ? null :
        <WLayout wLayout='header'>
            <WLHeader>
                <WNavbar style={{backgroundColor:"black"}}>
                    <ul>
                        <WNavItem hoverAnimation="lighten" onClick={() => {moveTo("/")}} style={{color:"red", cursor:"pointer"}}>
                            The World Data Mapper
                        </WNavItem>
                        <WNavItem style={{padding:"25px"}}>

                        </WNavItem>
                        <NavbarNavigation moveTo={moveTo} regions={regions}></NavbarNavigation>
                    </ul>
                    <ul>
                        <NavbarButtons
                            fetchUser={props.fetchUser} auth={auth} name={auth ? props.user.name : ""}  moveTo={moveTo}
                            toggleLogin={toggleShowLogin} toggleCreate={toggleShowCreate} toggleUpdate={toggleShowUpdate}
                        >
                        </NavbarButtons>
                    </ul>
                </WNavbar>
            </WLHeader>
            <WLMain style={{backgroundColor:"#4b4a4a"}}>
                {auth ? 
                <MainContents 
                auth={auth} maps={maps} moveTo={moveTo} changeMapName={ChangeMapName} refetch={refetchData} deleteMap={DeleteMap}regions={regions} 
                addSubregion={addSubregion} toggleDelete={toggleShowDelete} changeDeleteFunc={changeDeleteFunc} toggleCreateMap={toggleShowCreateMap}
                updateAccess={UpdateAccess} sortRegions={sortRegions}> 
                </MainContents>:
                <div style={{color:"white", textAlign:"center", height:"25%%", verticalAlign:"middle", marginTop:"25%"}}> 
                    Welcome To the World Data Mapper
                </div>}
            </WLMain>
            {showLogin ? <Login fetchUser={props.fetchUser} toggleLogin={toggleShowLogin} refetch={refetchData}> </Login> : null}
            {showCreate ? <CreateAccount fetchUser={props.fetchUser} toggleCreate={toggleShowCreate}></CreateAccount>: null}
            {showUpdate ? <UpdateAccount fetchUser={props.fetchUser} toggleUpdate={toggleShowUpdate} user={props.user}></UpdateAccount>: null}
            {showDelete ? <Delete toggleDelete={toggleShowDelete} deleteFunc={deleteFunc}></Delete>: null}
            {showCreateMap ? <CreateMap createMap={addNewMap} toggleCreateMap={toggleShowCreateMap}></CreateMap>: null}
        </WLayout>
        }
        </>
    );
}

export default withRouter(Homescreen);