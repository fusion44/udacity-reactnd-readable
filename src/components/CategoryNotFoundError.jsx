import React from "react"
import { withStyles } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Icon from "material-ui/Icon"
import Button from "material-ui/Button"

const styles = theme => ({
  card: {
    marginTop: 20,
    margin: "auto",
    maxWidth: 750,
    marginBottom: 5
  },
  body: {}
})

const CategoryNotFoundError = props => {
  return (
    <div>
      <Card className={props.classes.card}>
        <CardContent>
          <h1>Unknown Category</h1>
          <Icon style={{ fontSize: 100 }}>sentiment_neutral</Icon>
        </CardContent>
        <CardActions>
          <Button dense>Show All</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(CategoryNotFoundError)
