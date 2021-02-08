import React, {Component} from "react";
import SharePlanListSub from "./SharePlanListSub";
import axios from 'axios';
import {URL} from "../../../redux/config";



class SharePlanListData extends Component{
    constructor(props) {
        super(props);
        //console.log("SharePlanPageComp constructor", props);

        this.state={
            group:[]
        }



    
    }

    getGroupData=()=>{
        let url=URL+"/plan/groupdata?groupnum="+this.props.row.groupNum;
        //console.log("그룹넘버 : " + this.props.row.groupNum);
        
        axios.get(url)
        .then(res=>{
            console.log(res.data);

            this.setState({
                group:res.data
            });
        }).catch(err=>{
            console.log("목록 오류:"+err);
          })
    }

    componentDidMount(){
        this.getGroupData();
    }



    // getGroupData=()=>{
    //     let url=URL+"/plan/groupdata?groupnum="+this.props.row.groupNum;
    //     console.log("그룹넘버 : " + this.props.row.groupNum);
    //     axios.get(url)
    //     .then(res=>{
    //         console.log(res.data);

    //         this.setState({
    //             clist:res.data
    //         });
    //     }).catch(err=>{
    //         console.log("목록 오류:"+err);
    //       })
    // }

    


    render(){
        
        return(
            
            <div>
               
               {this.props.row.groupNum==1?this.state.group.map((row)=>(
                   <SharePlanListSub row={row}></SharePlanListSub>
               )):''}
                
            </div>
            
           
        )
    }
}

export default SharePlanListData;