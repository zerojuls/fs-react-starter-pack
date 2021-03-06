import Path from 'path'
import Hapi from 'hapi'
import Inert from 'inert'
import Vision from 'vision'
import WebpackPlugin from 'hapi-webpack-plugin'
import HapiReactViews from 'hapi-react-views'

const Webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const wpConfig = require('../internals/webpack.dashboard.js')

const server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: Path.join(process.cwd(), 'assets')
			}
		}
	}
})

const host = 'localhost'
const port = 3000

const wpPluginAssets = {
	host,
	port,
	historyApiFallback: true,
	publicPath: wpConfig.output.publicPath,
	hot: true,
	quiet: true  // webpack-dashboard setup
}

server.connection({ host, port })

server.on('request-error', (request, err) => {
	console.log('Error response (500) sent for request: ' + request.id + ' because: ' + err.message)
	console.log(err.stack)
})

const compiler = Webpack(wpConfig)
compiler.apply(new DashboardPlugin())

server.register([Inert, Vision, {
	register: WebpackPlugin,
	options: {
		compiler: compiler,
		assets: wpPluginAssets,
		hot: {}
	}
}], (err) => {

	if (err) {
		console.log('Failed to load plugins.')
	}

	server.views({
		engines: {
			jsx: HapiReactViews
		},
		relativeTo: __dirname,
		path: 'components',
		compileOptions: {
			renderMethod: 'renderToString',
			layoutPath: Path.join(__dirname, 'components'),
			layout: 'HTML'
		}
	})

	server.route({ method: 'GET', path: '/fonts/{path*}',  handler: { directory: { path: 'fonts' } } })
	server.route({ method: 'GET', path: '/img/{path*}',  handler: { directory: { path: 'img' } } })
	server.route({ method: 'GET', path: '/styles/{param*}',  handler: { directory: { path: 'styles' } } })
	server.route({
		method: 'GET',
		path: '/{url*}',
		handler: (request, reply) => {

			// require transpiled es6 dependencies
			const routes = require('./config/routes').default
			const reactRouter = require('react-router')
			const match = reactRouter.match
			const createMemoryHistory = reactRouter.createMemoryHistory
			const initStore = require('./config/store').initStore
			const memoryHistory = createMemoryHistory(request.url.path)

			// initialize store (it syncs history with store)
			const store = initStore(memoryHistory)
			const history = require('./config/store').history

			// match application routes
			match({ history, routes, location: request.url.path }, (error, redirectLocation, renderProps) => {
				if (error) {
					reply({error: `${request.url.path} doesn't exist`})
				} else if (redirectLocation) {
					reply.redirect(redirectLocation.pathname + redirectLocation.search)
				} else if (renderProps) {
					reply.view('App', {
						renderProps: renderProps,
						storeState: `window.storeState = ${JSON.stringify(store.getState())}`
					})
				}
			})
		}
	})


	server.start((err) => {
		if (err) throw err
		console.log(`hapi server started on ${server.info.uri}`)
	})

})