import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';
import { FcOk } from "react-icons/fc";


class ScheduleList extends Component{
    constructor(props){
        super(props);

        

    }

   ;
    
    
    render(){
          const {row}=this.props;
         var wishday=moment(row.wishday).format("YYYY-MM-DD");
        return(
            
            <div>

                    <FcOk></FcOk>{wishday}
                     &nbsp;&nbsp;{row.title}

            </div>
            
            
        )
    }
}

export default ScheduleList;