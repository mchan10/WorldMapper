import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: ''});
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.toggleCreate(false);

		};
	};

	return (
        // Replace div with WModal

		<WModal visible className="signup-modal">
			<WMHeader className="modal-header" onClose={() => props.toggleCreate(false)} style={{backgroundColor:"red", color:"white", textAlign:"center"}}>
				Sign Up
			</WMHeader>

			{
				loading ? <div />
					: <WMMain style={{backgroundColor:"black"}}>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="6">
								<WInput style={{backgroundColor:"white"}}
									className="" onBlur={updateInput} name="name" labelAnimation="up" 
									barAnimation="solid" labelText="Name" wType="outlined" inputType="text" 
								/>
							</WCol>
						</WRow>

						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="6">
								<WInput style={{backgroundColor:"white"}}
									className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
									barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
								/>
							</WCol>
						</WRow>
						
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="6">
								<WInput style={{backgroundColor:"white"}}
									className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
									barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
								/>
							</WCol>
						</WRow>
					</WMMain>
			}
			<WMFooter style={{backgroundColor:"black"}}>
				<WButton className="modal-button" onClick={handleCreateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary" style={{backgroundColor:"white", color:"black"}}>
					Submit
				</WButton>
			</WMFooter>	
		</WModal>
	);
}

export default CreateAccount;
