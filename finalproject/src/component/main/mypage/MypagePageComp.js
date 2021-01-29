import React, {Component} from "react";
import MemberUpdateFormComp from "./MemberUpdateFormComp";
import axios from 'axios';
import {URL} from "../../../redux/config";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MySchedule from './MySchedule';
import MyReviwe from './MyReview';
import MyWishlist from './MyWishlist';
import './style/MyinfoCss.css';
import userImg from '../../../image/user.png';
import Paper from '@material-ui/core/Paper';
import PassCheck from './PassCheck';
import store from "../../../redux/store";

class MypagePageComp extends Component {
    
    constructor(props) {
        super(props);
        console.log("MypagePageComp constructor", props);

        this.state = {
            memberData: [],
            pageNum: '0',
            value: 0,
            wishCount: 0,
            passOk: false
        }
    }
    tabProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      handleChange = (event, newValue) => {
        this.setState({ value: newValue });
      }
    // 스프링에서 목록 가져오기
    // member
    getMyData = () => {
        let url = URL + '/member/getdata?id=' + store.getState().loginId;
        axios.get(url)
            .then(response => {
                this.setState({
                    memberData: response.data
                })
            }).catch(err => {
            console.log("목록 오류:" + err);
        })

        url = URL + '/wish/wishcount?memId=' + store.getState().loginId;
        axios.get(url)
            .then(res=>{
                this.setState({
                    wishCount: res.data
                })
            }).catch(err=>{
                console.log("wishlist 일정갯수 가져오기 오류 : " + err);
            })
    }

    componentDidMount() {
        this.getMyData(); //처음 시작시 백엔드로부터 데이타 가져오기
    }

    passOk=()=>{
        this.setState({
            passOk: true
        })
    }

    render() {
        // console.log("MypagePageComp render()", this.props);
        const url = URL + "/";
        const userimg = this.state.memberData.photo==null?userImg:url+this.state.memberData.photo;
        const address = this.state.memberData.addrdetail!==null?"(" + this.state.memberData.addrdetail + ")":"";
        const passOkTab = this.state.passOk==true?<MemberUpdateFormComp num={this.state.memberData}/>:<PassCheck passOk={this.passOk.bind(this)}/>;
        
        return (
            <div>
                <div id="mypageInfo" style={{width: '100%', backgroundColor: '#f7f7f7', position: 'relative'}}>
                    <p id="mypageInfoTitle">내 정보 관리</p>
                    {/* <button type="button" id="mypageInfoBtn" style={{border: 'none', borderRadius: '10px', position:'absolute'}}
                                    onClick={
                                        ()=>{
                                            this.props.history.push("/mypage/update");
                                        }
                                    }><b>정보수정</b></button> */}
                    <table>
                        <tr id="mypageInfoRow" bgcolor="#fff">
                            <td className="mypageInfoCol" style={{width:'20%', textAlign: 'center'}}>
                                <img src={userImg} alt="이미지없음" id="mypageUserImg"/><br/>
                            </td>
                            <td className="mypageInfoCol" style={{width:'40%'}}>
                                <table>
                                    <tr style={{borderBottom: '1px dotted #eee'}}>
                                        <td>
                                            <span class="fas fa-bookmark"></span>
                                        </td>
                                        <td style={{paddingLeft: '10px'}}>
                                            {this.state.memberData.id}
                                        </td>
                                    </tr>
                                    <tr style={{borderBottom: '1px dotted #eee'}}>
                                        <td>
                                        <span class="fas fa-user-alt"></span>
                                        </td>
                                        <td style={{paddingLeft: '10px'}}>
                                            {this.state.memberData.name}
                                        </td>
                                    </tr>
                                    <tr style={{borderBottom: '1px dotted #eee'}}>
                                        <td>
                                        <span class="fas fa-phone-alt"></span>
                                        </td>
                                        <td style={{paddingLeft: '10px'}}>
                                            {this.state.memberData.hp}
                                        </td>
                                    </tr>
                                    <tr style={{borderBottom: '1px dotted #eee'}}>
                                        <td>
                                            <span class="fas fa-envelope-open-text"></span>
                                        </td>
                                        <td style={{paddingLeft: '10px'}}>
                                            {this.state.memberData.email}@{this.state.memberData.email2}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span class="fas fa-home"></span>
                                        </td>
                                        <td style={{paddingLeft: '10px'}}>
                                            {this.state.memberData.address}<br/>{address}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style={{width:'20%', textAlign: 'center'}}>
                                <span className="mypageInfoSubtitle">일정</span><br/>
                                <span className="mypageInfoSubContent">{this.state.wishCount}</span>
                            </td>
                            <td style={{width:'20%', textAlign: 'center'}}>
                                <span className="mypageInfoSubtitle">공유한 일정</span><br/>
                                <span className="mypageInfoSubContent">0</span>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <Paper square style={{marginTop: '100px'}}>
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="나의 일정" {...this.tabProps(0)}/>
                        <Tab label="나의 후기" {...this.tabProps(1)}/>
                        <Tab label="나의 예약" {...this.tabProps(2)}/>
                        <Tab label="나의 정보" {...this.tabProps(3)}/>
                    </Tabs>
                    <TabPanel value={this.state.value} index={0}>
                        <MySchedule/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <MyReviwe/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        <MyWishlist/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={3}>
                        {/* <MemberUpdateFormComp/> */}
                        {passOkTab}
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
          <Box p={3}>{this.props.children}</Box>
        </Typography>
      );
    }
  }
export default MypagePageComp;

