import React from "react"
import { withStyles } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"

const styles = theme => ({
  card: {
    margin: "auto",
    maxWidth: 750,
    marginBottom: 5
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
    color: theme.palette.text.secondary
  },
  author: {
    marginBottom: 20,
    fontSize: 14
  },
  body: {}
})

const PostItem = props => {
  return (
    <div>
      <Card className={props.classes.card}>
        <CardContent>
          <Typography type="body1" className={props.classes.title}>
            {props.post.title}
          </Typography>
          <div className={props.classes.author}>
            by <i>{props.post.author}</i>
          </div>
          <Typography component="p">{props.post.body}</Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(PostItem)
