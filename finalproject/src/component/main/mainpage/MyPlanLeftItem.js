import React, {Component} from 'react';
import './MyPlanComp.css';
import axios from 'axios';
import {URL} from '../../../redux/config';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';

class MyPlanLeftItem extends Component {
    
    constructor(props){
        super(props);

    }

    render(){
        
        const {row} = this.props;

        return (
            <div>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={row.wishtime} secondary="Jan 9, 2014"/>
                </ListItem>
                <Divider variant="inset" component="li"/>
            </div>
        )
    }
}

export default MyPlanLeftItem;
