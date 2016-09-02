import Storage from '../storage/storage'
import uid from 'uid'

const defaults = {
	config: {
		tokenName: 'if-token',
		baseUrl: '/',
		loginUrl: 'auth/login',
		signupUrl: 'auth/signup',
		store: null
	},
	state: {
		authenticating: false,
		authenticated: false,
		token: null,
		error: null,
		updated: false,
	},
	fetchOpts: {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}
}

const internals = {
	initialized: false,
	subscribers: [],
	config: Object.assign({}, defaults.config),
	state: Object.assign({}, defaults.state),
	storage: new Storage()
}

internals.notifySubscribers = () => {
	setTimeout(() => {
		internals.subscribers.forEach(subscriber => {
			subscriber.fn(Object.assign(internals.state))
		})
	})
}

internals.checkResponseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

internals.parseResponseToJSON = (response) => {
  return response.json()
}

const init = opts => {
	for (var key in opts) {
		if (internals.config.hasOwnProperty(key)) {
			internals.config[key] = opts[key]
		}
	}
	internals.initialized = true
}

const subscribe = fn => {
	let id = uid()
	internals.subscribers.push({ id: id, fn: fn})
	return id
}

const unsubscribe = id => {
	internals.subscribers = internals.subscribers.filter(s => (s.id !== id))
}

const setToken = (token) => internals.storage.set(internals.config.tokenName, token)

const getToken = () => (internals.storage.get(internals.config.tokenName))

const removeToken = () => internals.storage.remove(internals.config.tokenName)

const isAuthenticated = () => (!!getToken())

const signup = (user, options) => {
	let baseUrl, signupUrl
	({baseUrl, signupUrl} = internals.config)
	let url = baseUrl + signupUrl
	let opts = Object.assign(defaults.fetchOpts, {
		body: JSON.stringify(userData)
	})

	return fetch(url, opts)
		.then(internals.checkResponseStatus)
		.then(internals.parseResponseToJSON)
		.then((data) => (setToken(data.token)))
}

const login = (userData, options) => {
	let baseUrl, loginUrl
	({baseUrl, loginUrl} = internals.config)
	let url = baseUrl + loginUrl
	let opts = Object.assign(defaults.fetchOpts, {
		body: JSON.stringify(userData)
	})

	return fetch(url, opts)
		.then(internals.checkResponseStatus)
		.then(internals.parseResponseToJSON)
		.then((data) => (setToken(data.token)))
}

const logout = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!!getToken()) {
				removeToken()
				resolve({success: true})
			} else {
				reject(new Error('You are trying to log out unauthenticated user.'))
			}
		})
	})
}

const interceptState = (reducer) => (state, action) => {
	internals.state = reducer(state, action)
	if (internals.state.updated) {
		internals.notifySubscribers()
	}
	return internals.state
}

export default {
	init: init,
	interceptState: interceptState,
	config: internals.config,
	defaults: defaults,
	isAuthenticated: isAuthenticated,
	login: login,
	logout: logout,
	signup: signup,
	getToken: getToken,
	setToken: setToken,
	removeToken: removeToken,
	subscribe: subscribe,
	unsubscribe: unsubscribe
}