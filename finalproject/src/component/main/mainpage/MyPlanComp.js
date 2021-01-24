import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import Divider from '@material-ui/core/Divider';

import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    pagesRoot: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: "10px",
            padding: "10px",
            width: "300px",
            height: "400px",
            overflow: "hidden",
        }
    }
}));

export default function MyPlanComp() {
    const classes = useStyles();
    const styles = {
        left: {
            minWidth: "400px",
            maxWidth: "400px",
            height: "500px",
            borderRight: "1px solid black",
            padding: "20px",
        },
        right: {
            flexGrow: "1",
            height: "500px",
            padding: "20px",
            overflow: "scroll",
            // borderRight: "1px solid black",
        },
        parent: {
            display: "flex",
        }
    }

    return (
        <div className="myPlanComp" style={styles.parent}>
            <div style={styles.left}>
                <h1>MyPlan</h1>
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WorkIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Work" secondary="Jan 7, 2014"/>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EventAvailableIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FlightLandIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </List>
            </div>
            <div style={styles.right}>
                <h2>MyPlan on Jan 9, 2014</h2>
                <div className={classes.pagesRoot}>
                    <Paper elevation={3}>
                        <List className={classes.root}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Work" secondary="Jan 7, 2014"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BeachAccessIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EventAvailableIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FlightLandIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                        </List>
                    </Paper>
                    <Paper elevation={3}></Paper>
                    <Paper elevation={3}></Paper>
                    <Paper elevation={3}></Paper>
                    <Paper elevation={3}></Paper>
                    <Paper elevation={3}></Paper>
                    <Paper elevation={3}></Paper>
                </div>
            </div>
        </div>
    )
}
