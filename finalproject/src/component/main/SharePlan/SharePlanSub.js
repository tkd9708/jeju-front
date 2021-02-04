import React, {Component} from "react";
import SharePlanPageComp from './SharePlanPageComp';
import store from '../../../redux/store';
import axios from 'axios';
import {URL} from "../../../redux/config";

class SharePlanSub extends Component {

    constructor(props) {
        super(props);
        console.log("SharePlanRoot constructor", props);

        this.state={
            list:[]
        }
        
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
        const {row}=this.props;
        const {glist}=this.props;
        const {value}=this.props;
        var wishday=row.wishday;
        var title=row.title;
        // const {groupNum}=this.props.groupNum;
        return(
            <div className="slide-list-item">
                {wishday===value?title:''}
            </div>
        )
    }

}

export default SharePlanSub;
