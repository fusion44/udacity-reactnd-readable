import React from "react"
import { withStyles } from "material-ui/styles"
import Card, { CardContent } from "material-ui/Card"
import Icon from "material-ui/Icon"

const styles = theme => ({
  h1: {
    color: "grey"
  },
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
          <h1 className={props.classes.h1}>Unknown Category</h1>
          <Icon color="disabled" style={{ fontSize: 200 }}>
            sentiment_neutral
          </Icon>
        </CardContent>
      </Card>
    </div>
  )
}

export default withStyles(styles)(CategoryNotFoundError)
