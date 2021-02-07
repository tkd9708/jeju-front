import React, {Component} from "react";
import SharePlanSub from './SharePlanSub';
import axios from 'axios';
import {URL} from "../../../redux/config";
import './SharePlanCss.css';

class SharePlanRoot extends Component {

    constructor(props) {
        super(props);
        //console.log("SharePlanRoot constructor", props);

        this.state={
            clist:[],
            //groupNum: this.props.row.groupNum
        }
        
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
        console.log("그룹넘버 : " + this.props.row.groupNum);
        axios.get(url)
        .then(res=>{
            console.log(res.data);

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


    
    
    render(){
        const {row}=this.props.row;
       // const {list}=this.props;
        const {day}=this.props.day;
        //const {list}=this.props.list
        // var wishday=row.wishday;
        // var title=row.title;
        return(
            <div className="slide-list-item">
                {/* {row.groupNum} */}
                {this.state.clist.map((row)=>(
                    <SharePlanSub row={row} day={day}></SharePlanSub>
                ))}
                {/* <SharePlanSub glist={this.state.glist}></SharePlanSub> */}
                
            </div>
            
        )
    }

}

export default SharePlanRoot;