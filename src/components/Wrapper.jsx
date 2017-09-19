import React from "react"
import App from "../App"
import { Route } from "react-router-dom"

const Wrapper = posts => {
  return (
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/:category" component={App} />
      <Route exact path="/:category/:post_id" component={App} />
    </div>
  )
}

export default Wrapper
