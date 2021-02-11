import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import {arrJejuLoc_en, arrJejuLoc_ko, URL} from "../../../redux/config";
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
import BoardSampleItem from './BoardSampleItem';
import ItemComp from "../tour/ItemComp";
import './MainPageComp.css';

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
        overflow: "auto",
        "& > *": {
            // flexShrink: "0",
            // margin: "10px",
            // padding: "10px",
            // width: "300px",
            // height: "300px",
            // overflow: "hidden",
            // textAlign: "center",
            // objectFit: "cover"
        }
    }
}));

export default function BoardSample(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [spotList, setSpotList] = useState([]);
    const idx = props.idx;

    useEffect(() => {
        getList();

        return () => {
            let divTemp = document.querySelector(".hotPlace_sample div div");
            if (divTemp) {
                divTemp.scrollTo(0, 0);
            }
        }
    }, [idx]);


    // 통신 메서드
    function getList() {
        const url = URL + '/spot/list' +
            '?start=0' +
            '&perPage=5' +
            '&label2=' + arrJejuLoc_en[idx];
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                setSpotList(response.data);
            })
            .catch(function (error) {
                console.log("실패", error);
            });
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <b className="HotSpotTitle"><strong style={{color: '#2BBBAD'}}>&nbsp;&nbsp;&nbsp;&nbsp;{arrJejuLoc_ko[idx]}</strong> 지역의 인기 명소</b>
            <hr/>
            <div className={classes.paperRoot}>
                {spotList.map((row, i) => {
                    // console.log(i, row, props.history);
                    return (
                        <ItemComp row={row} key={i}
                                  history={props.history}
                                  getList={getList.bind(this)}
                        ></ItemComp>
                    )
                })}
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
