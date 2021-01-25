
import React, {Component} from "react";
import MemberUpdateFormComp from "./MemberUpdateFormComp";
import axios from 'axios';
import {Route, Link} from "react-router-dom";
import {URL} from "../../../redux/config";
import MySchedule from './MySchedule';

class MypagePageComp extends Component {

    constructor(props) {
        super(props);
        console.log("MypagePageComp constructor", props);


        this.state = {
            memberData: [],
            reviewList: [],
            pageNum: '0'
        }
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
    getMyReview = () => {
        let url = URL + '/reivew/getdata?id=sanghee';
        axios.get(url)
            .then(response => {
                this.setState({
                    reviewList: response.data
                })
            }).catch(err => {
            console.log("목록 오류:" + err);
        })
    }

    // getWishlist = () => {
    //     let url = URL + '/reivew/getdata?id=sanghee';
    //     axios.get(url)
    //     .then(response=>{
    //         this.setState({
    //             reviewList:response.data
    //         })
    //     }).catch(err=>{
    //         console.log("목록 오류:"+err);
    //     })
    // }

    componentDidMount() {
        this.getMyData(); //처음 시작시 백엔드로부터 데이타 가져오기
        this.getMyReview();
        //this.getWishlist();
    }

    render() {
        return (

            <div>
                <h1><b>내 정보 관리</b></h1>
                <table>
                    <tr>
                        <div>
                            <Link to="./mypage/MemberUpdateFormComp">
                                <button type="button">정보수정</button>
                            </Link>
                            <Route exact path="/mypage/MemberUpdateFormComp" component={MemberUpdateFormComp}/>
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
                <h1><b>나의 일정</b></h1>
                    <MySchedule></MySchedule>
                <h1><b>나의 리뷰</b></h1>
                <table>
                    <tr>
                        <span class="glyphicon glyphicon-leaf"/>
                    </tr>
                </table>
            </div>
        )
    }
}

export default MypagePageComp;
