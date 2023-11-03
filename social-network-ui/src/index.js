import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>
)
