import React, {Component} from 'react';
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
import store from '../../../redux/store';
import './MyPlanComp.css';

class MyPlanComp extends Component {

    render(){
        const tag = store.getState().logged==true?
            <div className="myPlanLeft">
                    <h1>MyPlan</h1>
                    <List style={{width: '100%'}}>
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
                </div>:"";

        let date = new Date();
        let today = date.getFullYear() + "-" + date.getMonth()+1 + "-" + date.getDate();
        const myplanTitle = store.getState().logged==true?<h2>MyPlan on {today}</h2>:<h2>오늘의 제주 News</h2>

        return (
            <div className="myPlanComp myPlanParent">
                {tag}
                <div className="myPlanRight">
                    {myplanTitle}
                    <div className="myPlanpagesRoot">
                        <Paper elevation={3}>
                            
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
}

export default MyPlanComp;
