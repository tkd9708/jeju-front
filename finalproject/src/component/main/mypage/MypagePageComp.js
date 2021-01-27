import React, {Component} from "react";
import MemberUpdateFormComp from "./MemberUpdateFormComp";
import axios from 'axios';
import {Route, Link} from "react-router-dom";
import {URL} from "../../../redux/config";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MySchedule from './MySchedule';
import MyReviwe from './MyReview';
import MyWishlist from './MyWishlist';

class MypagePageComp extends Component {
    
    constructor(props) {
        super(props);
        console.log("MypagePageComp constructor", props);

        this.state = {
            memberData: [],
            pageNum: '0',
            value: 0
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
    }

    componentDidMount() {
        this.getMyData(); //처음 시작시 백엔드로부터 데이타 가져오기
    }

    render() {
        console.log("MypagePageComp render()", this.props);

        return (
            <div>
                <h1><b>내 정보 관리</b></h1>
                <table>
                    <tr>
                        <div>
                            <Link to="./mypage/update">
                                <button type="button">정보수정</button>
                            </Link>
                        </div>
                        <span class="glyphicon glyphicon-leaf"></span>&nbsp;&nbsp;<b>I D &nbsp;:&nbsp;&nbsp; </b>
                        {this.state.memberData.id}<br/>
                        <span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;<b>이름 &nbsp;:&nbsp;&nbsp; </b>
                        {this.state.memberData.name}<br/>
                        <span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;<b>H P &nbsp;:&nbsp;&nbsp; </b>
                        {this.state.memberData.hp}<br/>
                        <span class="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;<b>Email &nbsp;:&nbsp;&nbsp; </b>
                        {this.state.memberData.email}@{this.state.memberData.email2}<br/>
                        <span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;<b>주소 &nbsp;:&nbsp;&nbsp; </b>
                        {this.state.memberData.address},&nbsp;{this.state.memberData.addrdetail}<br/>
                    </tr>
                </table>
                <AppBar position="static">
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

