export interface User {
	username: string;
	// ...other user fields
}
export interface Auth {
	accessToken: string;
	user: User
}
