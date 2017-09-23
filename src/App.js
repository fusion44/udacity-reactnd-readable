import React, { Component } from "react"
import { connect } from "react-redux"
import "./App.css"
import AppBar from "material-ui/AppBar"
import Tabs, { Tab } from "material-ui/Tabs"
import PostList from "./components/PostList"
import CategoryNotFoundError from "./components/CategoryNotFoundError"
import { setCategory, fetchCategories, fetchPosts, setSort } from "./actions"
import { withStyles } from "material-ui/styles"
import Radio, { RadioGroup } from "material-ui/Radio"
import { FormControl, FormControlLabel } from "material-ui/Form"

const styles = theme => ({
  group: {
    flexDirection: "row"
  }
})

class App extends Component {
  componentDidMount() {
    const { category } = this.props.match.params
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())

    if (this.props.match.path !== "/") {
      this.props.dispatch(setCategory(category))
    }
  }

  handleChange(event, value) {
    this.props.dispatch(setCategory(value))
    let url = value === "all" ? "/" : "/" + value
    this.props.history.push(url)
  }

  handleSortChange(event, value) {
    this.props.dispatch(setSort(value))
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
    const { posts } = this.props
    if (!posts) {
      return <h1>Loading!</h1>
    } else {
      return <PostList posts={this.getPosts(current, posts)} />
    }
  }

  render() {
    const { showCategoryError } = this.props.categories
    const { classes } = this.props
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
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender"
            className={classes.group}
            value={this.props.local.sort}
            onChange={this.handleSortChange.bind(this)}
          >
            <FormControlLabel value="date" control={<Radio />} label="Date" />
            <FormControlLabel value="votes" control={<Radio />} label="Votes" />
          </RadioGroup>
        </FormControl>
        {showCategoryError ? <CategoryNotFoundError /> : this.genPostsList()}
      </div>
    )
  }
}

function mapStateToProps({ categories, posts, local }) {
  let sorted = posts.posts.sort((a, b) => {
    if (local.sort === "date") {
      return b.timestamp - a.timestamp
    } else {
      // at the moment there are only two choices, so just assume "votes"
      return b.voteScore - a.voteScore
    }
  })
  return { categories, posts: sorted, local }
}

let AppWithStyles = withStyles(styles)(App)
export default connect(mapStateToProps)(AppWithStyles)
