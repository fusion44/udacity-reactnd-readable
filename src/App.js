import React, { Component } from "react"
import { connect } from "react-redux"
import "./App.css"
import AppBar from "material-ui/AppBar"
import Tabs, { Tab } from "material-ui/Tabs"
import PostList from "./components/PostList"
import { setCategory, fetchCategories, fetchPosts } from "./actions"

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
  }

  handleChange(event, value) {
    this.props.dispatch(setCategory(value))
  }

  getPosts(current, posts) {
    if (current === "all") {
      return posts
    } else {
      return posts.filter(post => {
        return post.category === current
      })
    }
  }

  genTabs() {
    const { categories } = this.props.categories
    if (!categories) {
      return <Tab value="all" label="loading" />
    } else {
      let cats = []
      cats.push(<Tab value="all" label="All" key="0" />)
      cats.push(
        categories.map((cat, index) => (
          <Tab value={cat.name} label={cat.name} key={index + 1} />
        ))
      )
      return cats
    }
  }

  genPostsList() {
    const { current } = this.props.categories
    const { posts } = this.props.posts
    if (!posts) {
      return <h1>Loading!</h1>
    } else {
      return <PostList posts={this.getPosts(current, posts)} />
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Tabs
            centered
            fullWidth
            value={this.props.categories.current}
            onChange={this.handleChange.bind(this)}
          >
            {this.genTabs()}
          </Tabs>
        </AppBar>
        {this.genPostsList()}
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return { categories, posts }
}

export default connect(mapStateToProps)(App)
