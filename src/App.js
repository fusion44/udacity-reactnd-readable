import React, { Component } from "react"
import { connect } from "react-redux"
import "./App.css"
import AppBar from "material-ui/AppBar"
import Tabs, { Tab } from "material-ui/Tabs"
import PostList from "./components/PostList"
import NotFoundError from "./components/NotFoundError"
import {
  setCategory,
  fetchCategories,
  fetchPosts,
  submitPost,
  setSort,
  addPostDialogChange
} from "./actions"
import { withStyles } from "material-ui/styles"
import Radio, { RadioGroup } from "material-ui/Radio"
import { FormControl, FormControlLabel } from "material-ui/Form"
import Button from "material-ui/Button"
import AddIcon from "material-ui-icons/Add"
import PostAddDialog from "./components/PostAddDialog"

const styles = theme => ({
  group: {
    flexDirection: "row"
  },
  fab: {
    position: "fixed",
    right: 45,
    bottom: 45
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
    const { posts, postsByCategory } = this.props
    if (!posts) {
      return <h1>Loading!</h1>
    } else {
      return current === "all" ? (
        <PostList posts={posts} />
      ) : (
        <PostList posts={postsByCategory[current]} />
      )
    }
  }

  handleAddPost() {
    this.props.dispatch(addPostDialogChange(true, "", "", "", ""))
  }

  handleSubmitNewPost() {
    this.props.dispatch(submitPost())
    this.props.dispatch(addPostDialogChange(false, "", "", "", ""))
  }

  handleCancelNewPost() {
    this.props.dispatch(addPostDialogChange(false, "", "", "", ""))
  }

  render() {
    const { showCategoryError } = this.props.categories
    const { classes, sort } = this.props
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
            value={sort}
            onChange={this.handleSortChange.bind(this)}
          >
            <FormControlLabel value="date" control={<Radio />} label="Date" />
            <FormControlLabel value="votes" control={<Radio />} label="Votes" />
          </RadioGroup>
        </FormControl>
        {showCategoryError ? (
          <NotFoundError text="Category not found" />
        ) : (
          this.genPostsList()
        )}

        <Button
          onClick={this.handleAddPost.bind(this)}
          fab
          color="primary"
          aria-label="add"
          className={classes.fab}
        >
          <AddIcon />
        </Button>

        <PostAddDialog
          onSubmit={this.handleSubmitNewPost.bind(this)}
          onCancel={this.handleCancelNewPost.bind(this)}
        />
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    sort: posts.sort,
    posts: posts.posts,
    postsByCategory: posts.postsByCategory
  }
}

let AppWithStyles = withStyles(styles)(App)
export default connect(mapStateToProps)(AppWithStyles)
