import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';
import { FcOk } from "react-icons/fc";
import store from '../../../redux/store';
import ScheduleItem from './ScheduleItem';
import axios from 'axios';


class ScheduleList extends Component{
    constructor(props){
        super(props);

        this.state={
            monthList: []
        }
    };

    getList=()=>{
        let url = URL + "/wish/schedulelist?memId="+store.getState().loginId + "&wishday=" + this.props.row.wishday ;
        // console.log("월별 가져오기 : " +  this.props.YM);
        
        axios.get(url)
        .then(res=>{
          this.setState({
            monthList: res.data
          });
      }).catch(err=>{
        console.log("목록 오류:"+err);
      })
    }
    
    render(){
        // const {row}=this.props;
        // var wishday = moment(row.wishday).format("YYYY-MM-DD");
        var tag = '';
        // console.log(this.props.groupOfDay + "," + wishday);
        // if(this.props.groupOfDay==''){
        //     this.props.setGroupOfDay(wishday);
        // }
        // else if(this.props.groupOfDay==wishday){
        //     this.props.setGroupOfDay(wishday);
        //     tag = <div><FcOk/>&nbsp;{wishday}&nbsp;&nbsp;{row.title}</div>;
        // }
        // else{
        //     tag = <div>&nbsp;&nbsp;{row.title}</div>;
        // }
        for(var i=0; i<this.props.clist.length; i++){
            tag += this.props.clist[i];
        }

        return(
            
                <div>
                    {tag}
                    {/* <FcOk/>&nbsp;{this.props.clist[0]} */}
                    {/* &nbsp;&nbsp;{row.title} */}
                    {/* {this.state.monthList.map((row)=>(
                        <ScheduleItem row={row}/>
                    ))} */}
                </div>
            
            
        )
    }
}

export default ScheduleList;