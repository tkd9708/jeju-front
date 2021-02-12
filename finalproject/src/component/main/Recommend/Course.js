import React,{Component} from 'react';
import {URL} from "../../../redux/config";
import axios from 'axios';
import store from '../../../redux/store';
import CourseDay from './CourseDay';
import Button from '@material-ui/core/Button';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

class Course extends Component {

    constructor(props){
        super(props);

        this.state={
            list: [],
            startDay:'',
        }
    }
    
    getList=()=>{
        let url = URL + "/hotspot/day?groupNum=" + this.props.groupNum;

        axios.get(url)
            .then(res=>{
                this.setState({
                    list: res.data
                })
            })
            .catch(err=>{
                console.log("코스추천 day list 오류 : " + err);
            })
    }

    componentWillMount(){
        this.getList();
    }

    insertHotspot = () => {
        let memId = store.getState().loginId;        
        let startDay = this.refs.startDay.value;
        let url = URL + "/hotspot/insert?groupNum="+this.props.groupNum+"&startDay="+startDay
        +"&memId="+memId;

        console.log(memId);
        console.log(startDay);
        if(startDay == '')
            alert("날짜를 선택해주세요.");
        else{
            axios.post(url
            ).then(res => {
                console.log(url);
                this.toggle();
                this.setState({
                    alertOpen: true
                })
            }).catch(err=>{
                console.log("예약 내용 저장시 오류:"+err);
            })
        }
    } 

    // modal 함수
    handleOpen = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            this.setState({
                open: true
            })
        }
        
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    toggle = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            
            this.setState({
                open: !this.state.open
            })
        }
    }

    render() {
        
        return (
            <span>
                {/* 추천일정 저장 모달 */}
                <MDBModal isOpen={this.state.open} toggle={this.toggle} centered className="SpotAddModal">
                    <MDBModalHeader toggle={this.toggle} className="RentAddModal">업체 추가정보</MDBModalHeader>
                    <MDBModalBody>
                        <div className="SpotAddModal">
                             <b>일정 추가</b><br/>
                            📆&nbsp;&nbsp;여행 시작일 선택
                            <input type="date" class="form-control form-control-sm" ref="startDay"></input>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="dark-green" onClick={this.toggle.bind(this)}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={this.insertHotspot.bind(this)}>추가</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                <Button color="primary" onClick={this.toggle.bind(this)}>
                일정 찜하기
                </Button><br/>
                {this.state.list.map((row, idx)=>(
                    <CourseDay groupNum={this.props.groupNum} day={row.day}/>
                ))}
                <br/>
                {/* alert 창 */}
                <Dialog
                    open={this.state.alertOpen}
                    onClose={()=>{this.setState({alertOpen:false})}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"일정 추가 완료"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Mypage로 이동하여 확인하시겠습니까?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>{this.setState({alertOpen:false})}} color="primary">
                        NO
                    </Button>
                    <Button onClick={
                        ()=>{
                                this.setState({
                                    alertOpen: false
                                })
                                this.props.history.push("/mypage");
                            }
                    } color="primary" autoFocus>
                        YES
                    </Button>
                    </DialogActions>
                </Dialog>
            </span>
        );
    }
}

export default Course;