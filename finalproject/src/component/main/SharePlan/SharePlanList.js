import React, {Component} from "react";
import axios from 'axios';
import SharePlanListData from "./SharePlanListData";
import {URL} from "../../../redux/config";
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class SharePlanList extends Component{
    constructor(props) {
        super(props);
        //console.log("SharePlanPageComp constructor", props);

        this.state={
            list:[]
        }



    
    }

    getPlan=()=>{
        let url=URL+"/plan/groupnum";

        axios.get(url)
        .then(res=>{
            this.setState({
                list:res.data
                
            });
        }).catch(err=>{
            console.log("리스트 num 오류:"+err);
          })

    }

    // getPlanCount=()=>{
    //     let url=URL+"/plan/plancount?groupnum="+this.props.row.groupNum;

    //     axios.get(url)
    //     .then(res=>{
    //       //console.log("데이터 ; " + res.data);
    //         this.setState({
    //             list:res.data
                
    //         });
    //     }).catch(err=>{
    //         console.log("리스트 갯수 오류:"+err);
    //       })
    // }


    componentDidMount(){
        this.getPlan();
    }


    render(){
        return(
            <div className="react-out">
                {this.state.list.map((row,idx)=>(
                    <SharePlanListData row={row} idx={row.groupNum}></SharePlanListData>
                ))}   
    
      
      
    
            </div>
        )
    }
}


export default SharePlanList;
