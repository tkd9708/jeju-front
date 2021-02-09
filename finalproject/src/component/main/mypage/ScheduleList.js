import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';
import { FcOk } from "react-icons/fc";
import store from '../../../redux/store';
import axios from 'axios';
import {URL} from "../../../redux/config";
import './style/RCA.css';


class ScheduleList extends Component{
    constructor(props){
        super(props);

        this.state={
            monthList: []
        }
    };

    // getList=()=>{
    //     let url = URL + "/wish/schedulelist?memId="+store.getState().loginId + "&wishday=" + this.props.row.wishday ;
    //     console.log("월별 가져오기 : " +  this.props.row.wishday);
        
    //     axios.get(url)
    //     .then(res=>{
    //       this.setState({
    //         monthList: res.data
    //       });
    //       console.log(res.data);
    //   }).catch(err=>{
    //     console.log("목록 오류:"+err);
    //   })
    // }

    // componentWillMount(){
    //     this.getList();
    // }
    
    render(){
        var wishday = moment(this.props.row.wishday).format("YYYY-MM-DD");

        return(
            
                <div className="ScheduleListLine">
                    {/* {tag} */}
                    {/* <FcOk/> */}
                    🔖&nbsp;&nbsp;<b>{wishday}</b>
                    &nbsp;&nbsp;&nbsp;{this.props.row.title}
                </div>
            
            
        )
    }
}

export default ScheduleList;