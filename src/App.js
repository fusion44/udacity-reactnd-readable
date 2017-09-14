import React, { Component } from "react"
import { connect } from "react-redux"
import "./App.css"
import AppBar from "material-ui/AppBar"
import Tabs, { Tab } from "material-ui/Tabs"
import { fetchCategories } from "./actions"

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>
}

class App extends Component {
  state = {
    value: 0
  }

  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  handleChange(event, value) {
    this.setState({ value })
  }

  genTabs() {
    const { categories } = this.props.categories
    if (!categories) {
      return <Tab label="loading" />
    } else {
      let cats = []
      cats.push(<Tab label="All" key="0" />)
      cats.push(
        categories.map((cat, index) => <Tab label={cat.name} key={index + 1} />)
      )
      return cats
    }
  }

  render() {
    const { value } = this.state
    return (
      <div className="App">
        <AppBar position="static">
          <Tabs
            centered
            fullWidth
            value={value}
            onChange={this.handleChange.bind(this)}
          >
            {this.genTabs()}
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>{"Item One"}</TabContainer>}
        {value === 1 && <TabContainer>{"Item Two"}</TabContainer>}
        {value === 2 && <TabContainer>{"Item Three"}</TabContainer>}
        {value === 3 && <TabContainer>{"Item Four"}</TabContainer>}
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(App)
