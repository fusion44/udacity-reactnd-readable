import React, { Component } from "react"
import { connect } from "react-redux"
import "./App.css"
import AppBar from "material-ui/AppBar"
import Tabs, { Tab } from "material-ui/Tabs"
import PostList from "./components/PostList"
import { fetchCategories, fetchPosts } from "./actions"

class App extends Component {
  state = {
    value: 0
  }

  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
  }

  handleChange(event, value) {
    this.setState({ value })
  }

  getPosts(category, posts) {
    // Since we have a fixed number of categories we can get away with hardcoding
    // the values here
    let stringval = "udacity"
    if (category === 1) {
      stringval = "react"
    } else if (category === 2) {
      stringval = "redux"
    }

    return posts.filter(post => {
      return post.category === stringval
    })
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
    const { posts } = this.props.posts
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
        {value === 0 && <PostList posts={posts} />}
        {value === 1 && <PostList posts={this.getPosts(value, posts)} />}
        {value === 2 && <PostList posts={this.getPosts(value, posts)} />}
        {value === 3 && <PostList posts={this.getPosts(value, posts)} />}
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return { categories, posts }
}

export default connect(mapStateToProps)(App)
