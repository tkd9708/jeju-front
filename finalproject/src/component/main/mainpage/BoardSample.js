import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {red} from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    },
    paperRoot: {
        display: "flex",
        // flexWrap: "wrap",
        overflow:"scroll",
        "& > *": {
            flexShrink:"0",
            margin: "10px",
            padding: "10px",
            width: "400px",
            height: "500px",
            overflow: "hidden",
        }
    }
}));

export default function BoardSample(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    // console.log(props);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <h1>{props.location}</h1>
            <hr/>
            <div className={classes.paperRoot}>
                <Paper elevation={3}>
                </Paper>
                <Paper elevation={3}>
                </Paper>
                <Paper elevation={3}>
                </Paper>
                <Paper elevation={3}>
                </Paper>
            </div>
        </div>

    )
}


/*
<Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                YK
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the
                            mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
 */
