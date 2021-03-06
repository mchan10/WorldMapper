import React, { useState, useEffect } from 'react';
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
import { SortRegions_Transaction, UpdateField_Transaction, AddRegion_Transaction, DeleteRegion_Transaction, AddLandmark_Transaction, RemoveLandmark_Transaction, EditLandmark_Transaction, ChangeParent_Transaction } from '../../utils/jsTPS.js';
import mapglobe from "./../../assets/mapglobe.png";

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
    const [UpdateField] = useMutation(mutations.UPDATE_FIELD);
    const [DeleteRegion] = useMutation(mutations.DELETE_REGION);
    const [AddMultipleRegions] = useMutation(mutations.ADD_MULTIPLE_REGIONS);
    const [AddLandmark] = useMutation(mutations.ADD_LANDMARK);
    const [RemoveLandmark] = useMutation(mutations.REMOVE_LANDMARK);
    const [EditLandmark] = useMutation(mutations.EDIT_LANDMARK);
    const [ChangeParent] = useMutation(mutations.CHANGE_PARENT);

    let mapq = useQuery(GET_DB_MAPS);
    if(mapq.loading) { console.log(mapq.loading, 'loading'); }
	if(mapq.error) { console.log(mapq.error, 'error'); }
	if(mapq.data) { maps = mapq.data.getAllMaps; }
    let regq = useQuery(GET_DB_REGIONS);
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
        /*
        let newRegionData = [];
        if (newmap && newmap.data){
            mapq = newmap;
            maps = newmap.data.getAllMaps;
        }
        if (newreg && newreg.data){
            console.log(newreg);
            regq = newreg;
            for (let i = 0; i < regq.data.getAllRegions.length; i++){
                newRegionData[regq.data.getAllRegions[i]._id] = regq.data.getAllRegions[i];
            }
            regions = newRegionData;
        }
        if(auth && (!newmap || !newreg)){
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

    const moveTo = (path, reset=true) => {
        props.history.push(path);
        if (reset){
            props.tps.clearAllTransactions();
        }
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
        const transaction = new AddRegion_Transaction(parentId, newRegion, AddSubregion, DeleteRegion)
        await props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const sortRegions = async (_id, field) => {
        const transaction = new SortRegions_Transaction(_id, regions, field, OrderSubregion);
        await props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const updateField = async (_id, field, newVal) => {
        const oldVal = regions[_id][field];
        if (newVal.valueOf() == oldVal.valueOf()){
            return;
        }
        const transaction = new UpdateField_Transaction(_id, field, newVal, oldVal, UpdateField);
        await props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const deleteRegion = async (_id, index) => {
        const transaction = new DeleteRegion_Transaction(_id, index, regions[_id].parent, DeleteRegion, AddMultipleRegions);
        await props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const addLandmark = async (_id, value) => {
        let cursor = regions[_id];
        while(cursor.parent.valueOf() !== "".valueOf()){
            cursor = regions[cursor.parent];
        }
        let stack = [];
        stack.push(cursor._id);
        while (stack.length > 0){
            let region = regions[stack.pop()];
            if (region.landmarks.indexOf(value) !== -1){
                return false;
            }
            stack.push(...region.children);
        }
        const transaction = new AddLandmark_Transaction(_id, value, AddLandmark, RemoveLandmark);
        await props.tps.addTransaction(transaction);
        tpsRedo();
        return true;
    }

    const removeLandmark = async (_id, index) => {
        const oldVal = regions[_id].landmarks[index];
        const transaction = new RemoveLandmark_Transaction(_id, oldVal, index, RemoveLandmark, AddLandmark);
        await props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const editLandmark = async (_id, value, index) => {
        let cursor = regions[_id];
        while(cursor.parent.valueOf() !== "".valueOf()){
            cursor = regions[cursor.parent];
        }
        let stack = [];
        stack.push(cursor._id);
        while (stack.length > 0){
            let region = regions[stack.pop()];
            if (region.landmarks.indexOf(value) !== -1){
                return false;
            }
            stack.push(...region.children);
        }
        const transaction = new EditLandmark_Transaction(_id, value, index, regions[_id].landmarks[index], EditLandmark);
        await props.tps.addTransaction(transaction);
        tpsRedo();
        return true;
    }
    
    const changeParent = async (_id, regionName) => {
        let cursor = regions[_id];
        while(cursor.parent.valueOf() !== "".valueOf()){
            cursor = regions[cursor.parent];
        }
        let stack = [];
        stack.push(cursor._id);
        let parentId = "";
        while (stack.length > 0){
            let region = regions[stack.pop()];
            if (region.name.valueOf() == regionName.valueOf()){
                parentId = region._id;
                break;
            }
            stack.push(...region.children);
        }
        if (parentId.valueOf() == regions[_id].parent.valueOf() || parentId.length === 0 || parentId.valueOf() == _id.valueOf()){
            return false;
        }
        stack = [];
        stack.push(...regions[_id].children)
        while (stack.length > 0){
            let regionId = stack.pop();
            if (regionId.valueOf() == parentId.valueOf()){
                return false;
            }
            stack.push(...regions[regionId].children);
        }
        let path = [];
        path.unshift(_id);
        stack.push(parentId);
        while (stack.length > 0){
            let regionId = stack.pop();
            path.unshift(regionId);
            if (regions[regionId].parent.length > 0){
                stack.push(regions[regionId].parent);
            }
        }
        path.unshift("", "viewer")
        path = path.join("/");
        const transaction = new ChangeParent_Transaction(_id, parentId, regions[_id].parent, path, props.history.location.pathname, ChangeParent, moveTo);
        await props.tps.addTransaction(transaction);
        tpsRedo();
        return true;
    }

    const keyboardHandle = (event) => {
		if (event.ctrlKey){
			if (event.which === 90){
				tpsUndo();
			}
			else if (event.which === 89){
				tpsRedo();
		  	}
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", keyboardHandle, false);
		return () => {
			document.removeEventListener("keydown", keyboardHandle, false);
		}
	});

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
                updateAccess={UpdateAccess} sortRegions={sortRegions} updateField={updateField} tpsRedo={tpsRedo} tpsUndo={tpsUndo} 
                deleteRegion={deleteRegion} canUndo={props.tps.hasTransactionToUndo()} canRedo={props.tps.hasTransactionToRedo()}
                addLandmark={addLandmark} removeLandmark={removeLandmark} editLandmark={editLandmark} changeParent={changeParent}> 
                </MainContents>:
                <div>
                    <img src={mapglobe} alt="no" style={{display: "block", marginLeft:"auto", marginRight:"auto",marginTop:"15%"}}/>
                    <div style={{color:"white", textAlign:"center", height:"25%%", verticalAlign:"middle"}}> 
                        Welcome To the World Data Mapper
                    </div>
                </div>}
            </WLMain>
            {showLogin ? <Login fetchUser={props.fetchUser} toggleLogin={toggleShowLogin} refetch={refetchData}> </Login> : null}
            {showCreate ? <CreateAccount fetchUser={props.fetchUser} toggleCreate={toggleShowCreate}></CreateAccount>: null}
            {showUpdate ? <UpdateAccount fetchUser={props.fetchUser} toggleUpdate={toggleShowUpdate} user={props.user}></UpdateAccount>: null}
            {showDelete ? <Delete toggleDelete={toggleShowDelete} deleteFunc={deleteFunc} changeDeleteFunc={changeDeleteFunc}></Delete>: null}
            {showCreateMap ? <CreateMap createMap={addNewMap} toggleCreateMap={toggleShowCreateMap}></CreateMap>: null}
        </WLayout>
        }
        </>
    );
}

export default withRouter(Homescreen);