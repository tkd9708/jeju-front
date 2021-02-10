import React, {Component} from "react";
import { Dialog, DialogTitle,DialogActions, DialogContent, DialogContentText,Button } from "@material-ui/core";
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {URL} from "../../../redux/config";
import './SharePlanCss.css';
import { FcCheckmark } from "react-icons/fc";




class SharePlanSub extends Component {

    constructor(props) {
        super(props);
        //console.log("SharePlanRoot constructor", props);

        this.state={
            deleteOpen:false,
            deleteSetOpen:false
            
        }

        
        
    }

    deleteOpen=()=>{
        this.setState({
            deleteOpen:true
        })
    };

    deleteClose=()=>{
        this.setState({
            deleteOpen:false
        })
    };


    onDelete=()=>{
        let url=URL+"/plan/delete?num="+this.props.row.num;
        
        console.log(this.props.row.num); 
        
        axios.get(url)
        .then(res=>{
            this.deleteClose();
            
        }).catch(err=>{
          console.log("삭제시 오류:"+err);
        });
       }

       onGroupDelete=()=>{
        let url=URL+"/plan/groupdelete?groupnum="+this.props.row.groupNum;
        
        console.log(this.props.row.groupNum); 
        
        axios.get(url)
        .then(res=>{
            this.deleteClose();
            
        }).catch(err=>{
          console.log("삭제시 오류:"+err);
        });
       }

    //    getProfile=()=>{
    //     let url=URL+"/plan/groupnum";

        
        
    //     axios.get(url)
    //     .then(res=>{
    //       //console.log("데이터 ; " + res.data);
    //         this.setState({
    //             profile:res.data
                
    //         });
    //     }).catch(err=>{
    //         console.log("리스트 오류:"+err);
    //       })
    // }

    componentDidMount(){
        // this.getProfile();
        this.props.setName(this.props.row.memId);
    }



    // onGroup=()=>{
    //     let url=URL+"/plan/group?memId="+store.getState().loginId + "&wishday="+this.refs.wishday.value;
    //     axios.get(url)
    //     .then(res=>{
    //         this.setState({
    //             list:res.data
    //         });
    //     }).catch(err=>{
    //         console.log("목록 오류:"+err);
    //       })
    // }



    render(){
        // const {row}=this.props;
        // const {glist}=this.props;
        // const day=this.props.day;
        // var wishday=row.wishday;
        // var title=row.title;
        // const {groupNum}=this.props.groupNum;
        return(
            
                <div>
                   
                        
                    
            <div>
              
               
               
                        <TimelineItem  >
                    <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        {this.props.row.wishtime}
                    </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot style={{width:30,backgroundColor:'white'}} >
                        <FcCheckmark/>
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    
                    <TimelineContent>
                    
                        <Typography variant="h6" component="h1" style={{cursor:'pointer',fontSize:20}} 
                         onClick={this.deleteOpen.bind(this)}>
                        {this.props.row.comment!==null?<div  class="arrow_box"><span class="comment_logo">{this.props.row.comment}
                        </span></div>:''}
                        {this.props.row.wishday===this.props.day?this.props.row.title:this.props.row.title}
                       
                        </Typography>
                        <Typography>{this.props.row.content}</Typography>
                    </TimelineContent>
                </TimelineItem>
               
               <Dialog 
                    open={this.state.deleteOpen} 
                    onClose={this.deleteClose.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                     <DialogTitle id="alert-dialog-title">{this.props.row.title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            해당 공유일정을 삭제하시겠습니까?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.deleteClose.bind(this)} color="primary">
                            닫기
                        </Button>
                        <Button  onClick={this.onDelete.bind(this)} color="primary" autoFocus>
                            삭제
                        </Button>
                        <Button  onClick={this.onGroupDelete.bind(this)} color="primary" autoFocus>
                            그룹전체삭제
                        </Button>
                        </DialogActions>
                 </Dialog>
                
                
                 
            </div>
            </div>
        )
    }

}

export default SharePlanSub;
