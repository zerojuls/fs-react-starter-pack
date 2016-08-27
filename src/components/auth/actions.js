export const AUTH_LOGIN 					= '@@auth/LOGIN'
export const AUTH_LOGIN_SUCCESS 	= '@@auth/LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILED 		= '@@auth/LOGIN_FAILED'
export const AUTH_LOGOUT 					= '@@auth/LOGOUT'
export const AUTH_LOGOUT_SUCCESS 	= '@@auth/LOGOUT_SUCCESS'
export const AUTH_SIGNUP 					= '@@auth/SIGNIN'
export const AUTH_SIGNUP_SUCCESS 	= '@@auth/SIGNUP_SUCCESS'
export const AUTH_SIGNUP_FAILED 	= '@@auth/SIGNUP_FAILED'

export const login = (userData) => ({
	type: AUTH_LOGIN,
	payload: userData
})

export const logout = () => ({
	type: AUTH_LOGOUT
})

export const signup = (userData) => ({
	type: AUTH_SIGNUP,
	payload: userData
})
