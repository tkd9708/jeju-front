import React, {Component} from "react";
import SharePlanSub from './SharePlanSub';
import axios from 'axios';
import {URL} from "../../../redux/config";
import './SharePlanCss.css';
import profile from './Img_profile.png';
import SharePlanProfile from "./SharePlanProfile";



class SharePlanRoot extends Component {

    constructor(props) {
        super(props);
        //console.log("SharePlanRoot constructor", props);

        this.state={
            clist:[],
            id:'',
            
            //groupNum: this.props.row.groupNum
        }
        
    }

    setName=(value)=>{
        this.setState({
            id:value
        })
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
        // this.getProfile();
    }

   



    
    
    render(){
        const {row}=this.props.row;
        const {day}=this.props.day;
        
        return(
            
            <div>
                {/* {this.props.row.memId} */}
                
            <div className="slide-list-item">
                <img src={profile} style={{width:100,height:100,marginRight:250}}/>
                <span style={{position:"relative",right:310,fontSize:30}}>{this.state.id}</span>
                <SharePlanProfile id={this.state.id}></SharePlanProfile>
                
                {this.state.clist.map((row)=>(
                    <SharePlanSub row={row} day={day} setName={this.setName.bind(this)}></SharePlanSub>
                ))}

                
                    
                
               

               
                

                
                
            </div>
            </div> 
            
        )
    }

}

export default SharePlanRoot;