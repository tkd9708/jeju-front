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
import {MDBIcon} from 'mdbreact';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

 class Header extends React.Component {
    constructor(props){
        super(props);

        this.state={
            open : false,
            setOpen : false,
            clist:[],
            listopen:false,
            setlistOpen:false,
            // groupOfDay:''
        }
        this.groupOfDay='';
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
      }

      listToggle = () => {
        this.setState({
            listopen: !this.state.listopen
        });
      }

      setGroupOfDay=(value)=>{
        this.groupOfDay = value;
      }

      insertContent=()=>{
        let url=URL+"/wish/insertcontent";
        let memId=store.getState().loginId;
        let content=this.refs.content.value;
        let wishday=this.refs.wishday.value;
        let wishtime=this.refs.wishtime.value;

        if(content=='' || wishday=='' || wishtime=='')
            alert("정보를 모두 입력해주세요.");
        else{
            axios.post(url,{memId,content,wishday,wishtime})
            .then(res=>{
                this.setState({
                    open: false
                })
                this.props.getData();
            }).catch(err=>{
                console.log("schedulewish insert 오류 : " + err);
            })   
        }    
    }

    render() {
        const {clist}=this.props;
        const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        return (
            <div className="RCA-header-container">
                <div className="RCA-header-Title" style={{textAlign: 'center', position:'relative'}}>
                    <MDBIcon icon="align-justify" style={{float: 'left', cursor: 'pointer'}} onClick={
                            ()=>{
                                this.setState({
                                     listopen:true   
                                })
                            }
                        } />
                        <ul className="RCA-header-buttons RCA-header-middle">
                            <li className="RCA-title-year">
                                {this.props.year}
                            </li>
                            <li>
                            <i className="move-button left icon" onClick={()=>{this.props.moveMonth(-1)}}>
                                {/* <FcPrevious/>    */}
                                <MDBIcon icon="angle-left" />
                            </i>
                            </li>
                            <li className="move">
                                {this.props.month}
                            </li>
                            <li>
                            <i className="move-button right icon" onClick={()=>{this.props.moveMonth(1)}}>
                                <MDBIcon icon="angle-right" />
                            </i>
                            </li>
                            <li className="RCA-title-month">
                                {month[Number(this.props.month)-1]}
                            </li>
                        </ul>

                        <Button variant="outlined" className="add-list"  style={{float: 'right'}} onClick={
                            ()=>{
                                this.setState({
                                    open: true
                                })
                            }
                        }>
                        일정추가
                        </Button>
                    </div>
                    
                    {/* 일정 추가 모달 */}
                    <MDBModal isOpen={this.state.open} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>일정 추가</MDBModalHeader>
                        <MDBModalBody>
                            <div className="RCA-planAddModal">
                                {/* <span className="addtitle">일정 추가</span><br/> */}
                                📆&nbsp;&nbsp;나의 일정
                                <input type="text" className="form-control" style={{height: '50px'}} ref="content"></input><br/>
                                🗓&nbsp;&nbsp;여행 날짜
                                <input type="date" class="form-control form-control-sm" ref="wishday"></input><br/>
                                ⏰&nbsp;&nbsp;예정 시간
                                <input type="time" class="form-control form-control-sm" ref="wishtime"></input>
                                {/* <div style={{textAlign: 'center'}}>
                                    <button type="button" class="btn btn-warning planAddBtn" onClick={this.insertContent.bind(this)}><b>추가</b></button>
                                </div> */}
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                        {/* <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn> */}
                        <MDBBtn color="dark-green" onClick={this.insertContent.bind(this)}>추가</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    {/* 일정 리스트 모달 */}
                    <MDBModal isOpen={this.state.listopen} toggle={this.listToggle}>
                        <MDBModalHeader toggle={this.listToggle}>일정 목록</MDBModalHeader>
                        <MDBModalBody>
                            <div className="RCA-planAddModal">
                                {this.props.clist.map((row)=>(
                                    <ScheduleList row={row} groupOfDay={this.groupOfDay} setGroupOfDay={this.setGroupOfDay}></ScheduleList>
                                ))}
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color="dark-green" onClick={this.listToggle}>닫기</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                {/* <Modal
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
                   
                </Modal> */}

                {/* <Modal
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
                </Modal> */}
                
            </div>
            
        )
    }
}





  
  
  
    


export default Header;


