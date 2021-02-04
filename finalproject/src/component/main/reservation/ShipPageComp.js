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
        }
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

    render() {
        const tag1 = this.state.month==1?<ShipTableA1/>:this.state.month==2?<ShipTableA2/>:
                    this.state.month==3?<ShipTableA3/>:this.state.month==4?<ShipTableA4/>:
                    <span>여행가는 달을 선택하세요</span>;
        const tag2 = this.state.month==11?<ShipTableB1/>:this.state.month==12?<ShipTableB2/>:
                    <span>여행가는 달을 선택하세요</span>;
        return (
            <div>
                <td><Button variant="outlined" id="thumbAddBtn" 
                    onClick={this.handleOpen.bind(this)}>일정추가</Button></td>
                    {/* 우도일정 저장 모달 */}
                <Modal
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
                </Modal>
                <Paper square style={{marginTop: '100px'}}>
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
                </Paper>
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
