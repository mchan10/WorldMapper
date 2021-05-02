import React, { useState } from 'react';
import { UPDATE_ACCOUNT }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {

    const [input, setInput] = useState({ email: props.user.email, password: '', name: props.user.name});
	const [loading, toggleLoading] = useState(false);
	const [UpdateAccount] = useMutation(UPDATE_ACCOUNT);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to update');
				return;
			}
		}
		const { loading, error, data } = await UpdateAccount({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			props.toggleUpdate(false);
            props.fetchUser();
		};
	};

	return (
        // Replace div with WModal

		<WModal visible className="signup-modal">
			<WMHeader className="modal-header" onClose={() => props.toggleUpdate(false)}>
				Sign Up
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="6">
								<WInput 
									className="" onBlur={updateInput} name="name" labelAnimation="up" defaultValue={props.user.name}
									barAnimation="solid" labelText="Name" wType="outlined" inputType="text" 
								/>
							</WCol>
						</WRow>

						<div className="modal-spacer">&nbsp;</div>
                        <WRow className="modal-col-gap signup-modal">
							<WCol size="6">
                            <WInput 
                                className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" defaultValue={props.user.email}
                                barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
                            />
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
                        <WRow className="modal-col-gap signup-modal">
							<WCol size="6">
                            <WInput 
                                className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
                                barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
                            />
							</WCol>
						</WRow>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>	
		</WModal>
	);
}

export default UpdateAccount;