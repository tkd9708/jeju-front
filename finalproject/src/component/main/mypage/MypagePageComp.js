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
import {Route, Link} from "react-router-dom";

class MypagePageComp extends Component {
    
    constructor(props) {
        super(props);
        console.log("MypagePageComp constructor", props);

        this.state = {
            memberData: [],
            pageNum: '0',
            value: 0,
            wishCount: 0
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
        let url = URL + '/member/getdata?id=sanghee';
        axios.get(url)
            .then(response => {
                this.setState({
                    memberData: response.data
                })
            }).catch(err => {
            console.log("목록 오류:" + err);
        })

        url = URL + '/wish/wishcount?memId=sanghee';
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

    render() {
        // console.log("MypagePageComp render()", this.props);
        const url = URL + "/";
        const userimg = this.state.memberData.photo==null?userImg:url+this.state.memberData.photo;
        const address = this.state.memberData.addrdetail!==null?(this.state.memberData.addrdetail):"";

        return (
            <div>
                <div id="mypageInfo" style={{width: '100%', backgroundColor: '#f7f7f7'}}>
                    <p id="mypageInfoTitle">내 정보 관리</p>
                    <table>
                        <tr id="mypageInfoRow" bgcolor="#fff">
                            <td className="mypageInfoCol" style={{width:'20%', textAlign: 'center'}}>
                                <img src={userimg} alt="이미지없음" id="mypageUserImg"/><br/>
                            </td>
                            <td className="mypageInfoCol" style={{width:'40%', position: 'relative'}}>
                                <span class="fas fa-bookmark"></span>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.memberData.id}<br/>
                                <span class="fas fa-user-alt"></span>&nbsp;&nbsp;&nbsp;{this.state.memberData.name}<br/>
                                <span class="fas fa-phone-alt"></span>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.memberData.hp}<br/>
                                <span class="fas fa-envelope-open-text"></span>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.memberData.email}@{this.state.memberData.email2}<br/>
                                <span class="fas fa-home"></span>&nbsp;&nbsp;&nbsp;{this.state.memberData.address}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{address}
                                <button type="button" id="mypageInfoBtn" style={{border: 'none', borderRadius: '10px', position:'absolute'}}
                                    onClick={
                                        ()=>{
                                            this.props.history.push("/mypage/update");
                                        }
                                    }><b>회원정보 수정</b></button>
                            </td>
                            <td style={{width:'20%', textAlign: 'center'}}>
                                <span className="mypageInfoSubtitle">일정 갯수</span><br/>
                                <span className="mypageInfoSubContent">{this.state.wishCount}</span>
                            </td>
                            <td style={{width:'20%', textAlign: 'center'}}>
                                <span className="mypageInfoSubtitle">공유 일정 갯수</span><br/>
                                <span className="mypageInfoSubContent">0</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <AppBar position="static" style={{marginTop: '100px'}}>
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label="나의 일정" {...this.tabProps(0)} />
                        <Tab label="나의 후기" {...this.tabProps(1)} />
                        <Tab label="나의 예약" {...this.tabProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <MySchedule/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <MyReviwe/>
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <MyWishlist/>
                </TabPanel>
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

