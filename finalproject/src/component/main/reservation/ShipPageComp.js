import React, {Component} from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ShipTableA1 from "./ShipTable/ShipTableA1";
import ShipTableA2 from "./ShipTable/ShipTableA2";
import ShipTableA3 from "./ShipTable/ShipTableA3";
import ShipTableA4 from "./ShipTable/ShipTableA4";
import ShipTableB1 from "./ShipTable/ShipTableB1";
import ShipTableB2 from "./ShipTable/ShipTableB2";
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import store from '../../../redux/store';
import {URL} from '../../../redux/config';
import Button from '@material-ui/core/Button';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import UdoImg from '../../../image/Reser_udo.jpg';
import './ShipPageCss.css';
import {WOW} from 'wowjs';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

class ShipPageComp extends Component {
    constructor(props) {
        super(props);
        console.log("ShipPageComp constructor", props);

        this.state = {
            value: 0,
            month:'',
            memId:'',  
            content:'',
            wishday:'',
            wishtime:'',
            open: false
        }
    }

    componentDidMount(){
        new WOW().init();
    }

    insertContent = () => {
        let url = URL + "/wish/insertcontent";
        let memId = store.getState().loginId;        
        let content = '배,' + this.state.content;
        let wishday = this.refs.wishday.value;
        let wishtime = this.refs.wishtime.value;
        
        console.log(memId);
        console.log(content);
        console.log(wishday);
        if(wishday == '' || wishtime == '')
            alert("날짜와 시간을 모두 선택해주세요.");
        else{
            axios.post(url, {memId, content, wishday, wishtime
            }).then(res => {
                alert("저장 완료");
            }).catch(err=>{
                console.log("예약 내용 저장시 오류:"+err);
            })
        }
    } 

    tabProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleTabChange = (event,newValue) => {
        this.setState({ value: newValue });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    changeMonth = (e) => {
        console.log("changeMonth 함수");
        this.setState({
            month: e.target.value
        })
    }
    
    changeDestination = (e) => {
        console.log("Destination 함수");
        this.setState({
            content: e.target.value
        })
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
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const tag1 = this.state.month==1?<ShipTableA1/>:this.state.month==2?<ShipTableA2/>:
                    this.state.month==3?<ShipTableA3/>:this.state.month==4?<ShipTableA4/>:
                    "";
        const tag2 = this.state.month==11?<ShipTableB1/>:this.state.month==12?<ShipTableB2/>:
                    "";
                    
        return (
            <div>
                {/* <img src={UdoImg} alt="" style={{width: '100%'}}/> */}
                {/* <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor: 'white', color: '#036E38'}}>
                        &nbsp;&nbsp;우도행 배편&nbsp;&nbsp;
                    </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    우도를 안가면 제주도 여행이라 할 수 없다!<br/>
                    날짜, 시간과 금액을 미리 확인해보세요.<br/>

                    <MDBBtn size="sm" color="dark-green" type="button"
                            className="ShareListBtn"
                            style={{marginTop: '1.3%'}}
                            onClick={() => {
                                if (store.getState().loginId != null && store.getState().loginId != "") {
                                    this.toggle();
                                } else {
                                    let _result = window.confirm("로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?");

                                    if (_result) {
                                        this.props.history.push("/login");
                                    }
                                }
                            }}
                    > <b>일정추가</b>
                    </MDBBtn>
                </div> */}

                <section class="my-md-5">

                    <div class="rgba-black-strong rounded ShipIntro">
                        <div class="col-md-12 mb-4 white-text text-center ShipTitle">
                                <h1 class="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 wow fadeInDown"
                                data-wow-delay="0.3s"><strong>UDO</strong></h1>
                                <p class="wow fadeInDown" data-wow-delay="0.4s">______________________</p>
                                <h5 class="text-uppercase mb-4 white-text wow fadeInDown" data-wow-delay="0.4s">
                                    <strong>우도를 안가면 제주도 여행이라 할 수 없다!<br/>
                                    우도행 배편 시간과 금액을 미리 확인해보세요.</strong></h5>
                                
                                {/*/!* 공유버튼 *!/*/}
                                <MDBBtn size="sm" color="dark-green" type="button"
                                        className="ShareListBtn wow fadeInDown"
                                        data-wow-delay="0.4s"
                                        style={{marginTop: '1.3%'}}
                                        onClick={() => {
                                            if (store.getState().loginId != null && store.getState().loginId != "") {
                                                this.toggle();
                                            } else {
                                                let _result = window.confirm("로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?");

                                                if (_result) {
                                                    this.props.history.push("/login");
                                                }
                                            }
                                        }}
                                > <b>일정추가</b>
                                </MDBBtn>
                                
                            </div>

                        <div style={{textAlign: 'center'}} className="ShipTabs">
                            
                            <div class="white-text wow fadeInDown" style={{border: '1px solid white', margin: '0 auto'}} data-wow-delay="0.7s">

                            {/* <Paper square> */}
                                <Tabs
                                    TabIndicatorProps={{style: {background:'green'}}}
                                    value={this.state.value}
                                    // indicatorColor="secondary"
                                    textColor="white"
                                    variant="fullWidth"
                                    onChange={this.handleTabChange}
                                    aria-label="disabled tabs example"
                                >
                                    <Tab label="성산 ↔ 우도" {...this.tabProps(0)}/>
                                    <Tab label="종달 ↔ 우도" {...this.tabProps(1)}/>
                                </Tabs>
                                <TabPanel value={this.state.value} index={0} style={{padding: '20px'}}>
                                     성산 ↔ 우도행<br/>
                                    <select class="browser-default custom-select" onClick={this.changeMonth}>
                                        <option disabled selected>가는 날짜</option>
                                        <option value="1">1~2월, 11,12월</option>
                                        <option value="2">3월, 10월</option>
                                        <option value="3">4월, 9월</option>
                                        <option value="4">5 ~ 8월</option>
                                    </select>
                                </TabPanel>
                                <TabPanel value={this.state.value} index={1}>
                                    종달 ↔ 우도행<br/>
                                    <select class="browser-default custom-select" onClick={this.changeMonth}>
                                        <option disabled selected>가는 날짜</option>
                                        <option value="11">1~3월, 10~12월</option>
                                        <option value="12">4월 ~ 9월</option>
                                    </select>
                                    {/* <br/>{tag2} */}
                                </TabPanel>
                            {/* </Paper> */}

                            </div>
                        </div>

                    </div>

                </section>
                {tag1}{tag2}
                {/* <Button variant="outlined" id="thumbAddBtn" 
                    onClick={this.handleOpen.bind(this)}>일정추가</Button> */}
                    {/* 우도일정 저장 모달 */}
                {/* <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={this.state.open}>
                        <div className="rentcar">
                            <span>우도배 일정 저장</span><br/>
                            <input type="text" ref="content" className="selectDestination" 
                            value={this.state.content} onChange={this.changeMonth}/>
                            <select className="selectDestination" onClick={this.changeDestination}>
                                <option>성산→우도</option>
                                <option>종달→우도</option>
                                <option>우도→성산</option>
                                <option>우도→종달</option>
                            </select>
                            <br/><br/>
                            🗓&nbsp;&nbsp;승선일
                            <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                            ⏰&nbsp;&nbsp;승선 시간
                            <input type="time" class="form-control form-control-sm" ref="wishtime"></input><br/>
                            <div style={{textAlign: 'center'}}>
                                <button type="button" class="btn btn-warning spotmodalBtn" 
                                onClick={this.insertContent.bind(this)}><b>추가</b></button>
                            </div>
                        </div>
                        </Fade>
                </Modal> */}


                {/* <Paper square style={{marginTop: '100px'}}>
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleTabChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="성산↔우도행" {...this.tabProps(0)}/>
                        <Tab label="종달↔우도행" {...this.tabProps(1)}/>
                    </Tabs>
                    <TabPanel value={this.state.value} index={0}>
                        성산 ↔ 우도행<br/>
                        <select className="selectmonth" onClick={this.changeMonth}>
                            <option disabled selected>선택하세요</option>
                            <option value="1">1~2월, 11,12월</option>
                            <option value="2">3월, 10월</option>
                            <option value="3">4월, 9월</option>
                            <option value="4">5 ~ 8월</option>
                        </select>
                        <br/>{tag1}                 
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        종달 ↔ 우도행<br/>
                        <select className="selectmonth" onClick={this.changeMonth}>
                            <option disabled selected>선택하세요</option>
                            <option value="11">1~3월, 10~12월</option>
                            <option value="12">4월 ~ 9월</option>
                        </select>
                        <br/>{tag2}
                    </TabPanel>
                </Paper> */}


                {/* 일정 추가 모달 */}
                <MDBModal isOpen={this.state.open} toggle={this.toggle} centered>
                        <MDBModalHeader toggle={this.toggle} className="RCA-planAddModal">일정 추가</MDBModalHeader>
                        <MDBModalBody>
                            <div className="RCA-planAddModal">
                                <input type="text" ref="content" className="selectDestination" 
                                value={this.state.content} onChange={this.changeMonth}/>
                                <select className="selectDestination" onClick={this.changeDestination}>
                                    <option>성산→우도</option>
                                    <option>종달→우도</option>
                                    <option>우도→성산</option>
                                    <option>우도→종달</option>
                                </select>
                                <br/><br/>
                                🗓&nbsp;&nbsp;승선일
                                <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                                ⏰&nbsp;&nbsp;승선 시간
                                <input type="time" class="form-control form-control-sm" ref="wishtime"></input>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color="dark-green" onClick={this.insertContent.bind(this)}>추가</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
            </div>
        )
    }
}
class TabPanel extends Component {
    render() {
      return (
        <Typography component="div" hidden={this.props.value !== this.props.index}>
          <Box p={2}>{this.props.children}</Box>
        </Typography>
      );
    }
  }
export default ShipPageComp;
