import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';


class ScheduleList extends Component{
    constructor(props){
        super(props);

        

    }

   ;
    
    
    render(){
          const {row}=this.props;
        // var wishday=moment(r.wishday).format("YYYY-MM-DD");
        return(
            
            <div>
                 {row.wishday}  
                
                
                
                
                </div>
            
            
        )
    }
}

export default ScheduleList;