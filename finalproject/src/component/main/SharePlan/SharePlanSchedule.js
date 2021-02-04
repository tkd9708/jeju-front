import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';



class SharePlanSchedule extends Component{

constructor(props) {
        super(props);
        console.log("SharePlanPageComp constructor", props);

        
    
    }

    render(){
        const {row}=this.props;
        const {value}=this.props;
        var wishday=row.wishday;
        var title=row.title;
        var wishtime=row.wishtime;
        return(
            <div className="react-body">
                {wishday===value?title+"🗓-"+wishtime:''}
                
            </div>
        )
    }




}    

export default SharePlanSchedule;