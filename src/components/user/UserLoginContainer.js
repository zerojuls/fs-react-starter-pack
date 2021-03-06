import { connect } from 'react-redux'

import auth from 'react-jwt-auth-redux'

import UserLogin from './UserLogin'
import { history } from '../../config/store'

const mapDispatchToProps = (dispatch, ownProps) => ({
	onLoginFormSubmit: loginData => auth
		.login(loginData)
		.then(() => history.push('/'))
		.catch(err => console.error(err)),
	onSignInSuccess: () => history.push('/')
})

export default connect(false, mapDispatchToProps)(UserLogin)