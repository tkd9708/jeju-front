import React, { Component } from 'react';
import {FcPrevious,FcNext,FcList} from 'react-icons/fc';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './style/RCA.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ScheduleAdd  from './ScheduleAdd';
import ScheduleList from './ScheduleList';
import store from '../../../redux/store';
import moment from 'moment';

 class Header extends React.Component {
    constructor(props){
        super(props);

        this.state={
            open : false,
            setOpen : false,
            clist:[],
            listopen:false,
            setlistOpen:false
        }
        
    }

//     getList=()=>{
//         let url = URL + "/wish/daylist?memId="+store.getState().loginId + "&day=" + this.props.row.wishday ;
        
//         axios.get(url)
//         .then(res=>{
//           console.log("출력:"+res.data);
//           this.setState({
//               clist:res.data
//           });
//       }).catch(err=>{
//         console.log("목록 오류:"+err);
//       })
// }


// getData=()=>{

//     let url = URL + "/wish/list?memId="+store.getState().loginId;

//     axios.get(url)
//     .then(response=>{
//       //console.log("캘린더 출력 : " + response.data); 
//       this.setState({
//         list: response.data

//       });
//     }).catch(err=>{
//       console.log("캘린더 목록 오류:"+err);
//     })
// }

// componentDidMount(){
//     this.getData();
// }

  

    handleClose = () => {
        this.setState({
            open: false,
            listopen:false
        })
      };
    render() {
        // const [getMoment, setMoment]=useState(moment());     
        // const today = getMoment;   
        const {clist}=this.props;
        //console.log(clist);
        // var wishday=row.wishday;

       //var wishday=row.wishday;
       

        return (
            <div className="RCA-header-container">
                <h2 className="RCA-header-calendarYM RCA-header-middle">
                    {this.props.calendarYM}
                    <div className="RCA-header-list">
                        
                        <FcList onClick={
                            ()=>{
                                this.setState({
                                     listopen:true   
                                })
                            }
                        }/>
                               
                          
                        
                        <Button variant="outlined"  className="add-list" onClick={
                            ()=>{
                                this.setState({
                                    open:true
                                })
                                
                            }
                        }>
                        일정추가
                        </Button>
                        
                       
                    </div>

                </h2>
                <h3 className="RCA-header-today RCA-header-middle" style={{marginRight:30}}>
                    {this.props.today}
                </h3>
                <ul className="RCA-header-buttons RCA-header-middle">
                    <li>
                    <i className="move-button left icon" onClick={()=>{this.props.moveMonth(-1)}}>
                        <FcPrevious/>   
                    </i>
                    </li>
                    <li className="move" style={{fontSize:28}}>
                        이동
                    </li>
                    <li>
                    <i className="move-button right icon" onClick={()=>{this.props.moveMonth(1)}}>
                        <FcNext/>
                    </i>
                    </li>
                </ul>
                        

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="calModal"
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                    <div className="addlistpaper">
                        <ScheduleAdd></ScheduleAdd>
                        
                        
                    </div>
                    
                    </Fade>
                   
                </Modal>

                <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="calModal"
                open={this.state.listopen}
                onClose={this.handleClose.bind(this)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                >
                <Fade in={this.state.listopen}>
                  
                <div className="addlistmodal">
                    <h2 style={{textAlign:'center'}}>일정목록</h2><hr/>
                    {this.props.clist.map((row)=>(
                        <ScheduleList row={row} ></ScheduleList>
                    ))}
                    
                    
                    
                    
                    
                </div>
                 

                </Fade>

                </Modal>
                
            </div>
            
        )
    }
}





  
  
  
    


export default Header;


