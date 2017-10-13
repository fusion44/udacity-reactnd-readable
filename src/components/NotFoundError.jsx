import React from "react"
import PropTypes from "prop-types"
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
    marginBottom: 5,
    textAlign: "center"
  },
  body: {}
})

const NotFoundError = props => {
  return (
    <div>
      <Card className={props.classes.card}>
        <CardContent>
          <h1 className={props.classes.h1}>{props.text}</h1>
          <Icon color="disabled" style={{ fontSize: 200 }}>
            sentiment_neutral
          </Icon>
        </CardContent>
      </Card>
    </div>
  )
}

NotFoundError.propTypes = {
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(NotFoundError)
