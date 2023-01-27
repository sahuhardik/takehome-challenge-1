import './Profile.css';

import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';

import NFTList from './NFTList';
import { Auth } from '../types';

interface Props {
	auth: Auth;
	onLoggedOut: () => void;
}

interface State {
	loading: boolean;
	user?: {
		id: number;
		username: string;
	};
	username: string;
}

interface JwtDecoded {
	payload: {
		id: string;
		publicAddress: string;
	};
}

export const Profile = ({ auth, onLoggedOut }: Props) => {
	const [state, setState] = useState<State>({
		loading: false,
		user: undefined,
		username: '',
	});

	useEffect(() => {
		const { accessToken } = auth;
		// Need to define this function in UserService. Want this method to return loading state and relevant info, like react-query does
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((user) => setState({ ...state, user }))
			.catch(window.alert);
	}, []);


	const { accessToken } = auth;

	const {
		payload: { publicAddress },
	} = jwtDecode<JwtDecoded>(accessToken);

	return (
		<div className="Profile">
			<div>
				Logged in with publicAddress :<pre>{publicAddress}</pre>
			</div>
			<p>
				<button onClick={onLoggedOut}>Logout</button>
				<NFTList accessToken={accessToken} />
			</p>
		</div>
	);
};
