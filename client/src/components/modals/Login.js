import React, { useState } 	from 'react';
import { LOGIN } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {

		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			//props.refetchTodos();
			toggleLoading(false);
			props.refetch();
			props.toggleLogin(false);
		};
	};

	return (
        // Replace div with WModal
		<WModal visible className="login-modal">
			<WMHeader className="modal-header" onClose={() => props.toggleLogin(false)} style={{backgroundColor:"red", textAlign:"center", color:"white"}}>
				Login
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className="main-login-modal" style={{backgroundColor:"black"}}>
						<WRow>
							<WCol size="6">
								<WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" barAnimation="solid" labelText="Email Address" wType="outlined" inputType='text' style={{backgroundColor:"white"}}/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow>
							<WCol size="6">
							<WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" labelText="Password" wType="outlined" inputType='password' style={{backgroundColor:"white"}}/>
							</WCol>
						</WRow>

						{
							showErr ? <div className='modal-error' style={{color:"white"}}>
								{errorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}

					</WMMain>
			}
			<WMFooter style={{backgroundColor:"black"}}>
				<WButton className="modal-button" onClick={handleLogin} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary" style={{backgroundColor:"white", color:"black"}}>
					Login
				</WButton>
			</WMFooter>
		</WModal>
	);
}

export default Login;