import React, {Component} from 'react';
import './MyPlanComp.css';
import axios from 'axios';
import {URL} from '../../../redux/config';
import Paper from "@material-ui/core/Paper";

class MyPlanRightItem extends Component {
    
    constructor(props){
        super(props);

    }

    render(){
        
        const {row} = this.props;

        return (
            <Paper elevation={3}>
                <img src={row.thumbnail} alt="" style={{width: '300px'}}/><br/>
                <div id="myplanRightThumb">{row.title}</div>
            </Paper>
        )
    }
}

export default MyPlanRightItem;
