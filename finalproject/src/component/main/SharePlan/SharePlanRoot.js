import React, {Component} from "react";
import SharePlanSub from './SharePlanSub';
import axios from 'axios';
import {URL} from "../../../redux/config";
import './SharePlanCss.css';
import profile from './Img_profile.png';
import SharePlanProfile from "./SharePlanProfile";
import moment from 'moment';



class SharePlanRoot extends Component {

    constructor(props) {
        super(props);
        //console.log("SharePlanRoot constructor", props);

        this.state={
            clist:[],
            id:'',
            profile:[],
            comment:''
            //groupNum: this.props.row.groupNum
        }
        
    }

    setName=(value, com)=>{
        this.setState({
            id:value,
            comment: com
        })
        // this.getProfile();
    }
    // getList=()=>{
    //     let url=URL+"/plan/list";
    //     axios.get(url)
    //     .then(res=>{
    //         this.setState({
    //             list:res.data
    //         });
    //     }).catch(err=>{
    //         console.log("리스트 오류:"+err);
    //       })
    // }

    // componentDidMount(){
    //     this.getList();
    // }

    getGroupData=()=>{
        let url=URL+"/plan/groupdata?groupnum="+this.props.row.groupNum;
        //console.log("그룹넘버 : " + this.props.row.groupNum);
        axios.get(url)
        .then(res=>{
            //console.log(res.data);

            this.setState({
                clist:res.data
            });
        }).catch(err=>{
            console.log("목록 오류:"+err);
          })
    }

   

    componentDidMount(){
        this.getGroupData();
    }

    componentDidUpdate(){
        this.getProfile();
      
    }

    getProfile=()=>{
        let url=URL+"/member/getdata?id="+this.state.id;

        axios.get(url)
        .then(res=>{
            //console.log("profile : " + res.data);

            this.setState({
                profile:res.data
            });
        }).catch(err=>{
            console.log("프로필 오류:"+err);
          })
    }



    
    
    render(){
        const {row}=this.props.row;
        const {day}=this.props.day;
        var birth1=this.state.profile.birth;
        var today=moment();
        var age=today.diff(birth1,'year')+2;
        
        return(
            
            <div>
                {/* {this.props.row.memId} */}
                
            <div className="slide-list-item">
                <img src={profile} style={{width:100,height:100,marginRight:250}}/>
                <span style={{position:"relative",right:100,fontSize:30}}>{this.state.id}</span><br/>
                {/* <SharePlanProfile id={this.state.id}></SharePlanProfile> */}
                <span  style={{position:"relative",right:100,fontSize:30}}>{this.state.profile.gender}<br/>
                    {age}살
                </span>
                {this.state.comment}
                {/* 말풍선 */}
                
                {this.state.clist.map((row)=>(
                    <SharePlanSub row={row} day={day} setName={this.setName.bind(this)}></SharePlanSub>
                ))}

                
                    
                
               

               
                

                
                
            </div>
            </div> 
            
        )
    }

}

export default SharePlanRoot;