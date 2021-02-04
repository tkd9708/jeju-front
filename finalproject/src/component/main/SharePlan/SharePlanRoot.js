import React, {Component} from "react";
import SharePlanSub from './SharePlanSub';
import axios from 'axios';
import {URL} from "../../../redux/config";
import SharePlanPageComp from "./SharePlanPageComp";
import store from '../../../redux/store';
import './SharePlanCss.css';

class SharePlanRoot extends Component {

    constructor(props) {
        super(props);
        console.log("SharePlanRoot constructor", props);

        this.state={
            clist:[]
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
        let url=URL+"/plan/groupdata?groupnum="+this.props.row.groupNum
        axios.get(url)
        .then(res=>{
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
        const {row}=this.props;
        const {list}=this.props;
        const {value}=this.props;
        // var wishday=row.wishday;
        // var title=row.title;
        return(
            <div>
                {/* {row.groupNum} */}
                {this.state.clist.map((row)=>(
                    <SharePlanSub row={row} value={value}></SharePlanSub>
                ))}
                {/* <SharePlanSub glist={this.state.glist}></SharePlanSub> */}
                
            </div>
            
        )
    }

}

export default SharePlanRoot;