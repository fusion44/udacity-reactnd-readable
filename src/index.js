import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import "typeface-roboto"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import Wrapper from "./components/Wrapper"
import reducer from "./reducers"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Wrapper />
    </Router>
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
