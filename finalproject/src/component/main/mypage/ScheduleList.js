import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';
import { FcOk } from "react-icons/fc";


class ScheduleList extends Component{
    constructor(props){
        super(props);

    };
    
    render(){
        const {row}=this.props;
        var wishday = moment(row.wishday).format("YYYY-MM-DD");
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
        return(
            
                <div>
                    <FcOk/>&nbsp;{wishday}&nbsp;&nbsp;{row.title}
                    
                </div>
            
            
        )
    }
}

export default ScheduleList;