import React, {Component} from "react";
import MemberUpdateFormComp from "./MemberUpdateFormComp";
import axios from 'axios';
import { Route,Link } from "react-router-dom";

class MypagePageComp extends Component {

    constructor(props) {
        super(props);
        console.log("MypagePageComp constructor", props);

        this.state={
            memberData:[],
        }
    }
    
    // 스프링에서 목록 가져오기
    getData = () => {
        let url = "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/member/getdata?id=sanghee";
        axios.get(url)
        .then(response=>{
            this.setState({
                memberData:response.data
            })
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }
    componentDidMount() {
        this.getData(); //처음 시작시 백엔드로부터 데이타 가져오기
    }
    render() {
        console.log("MypagePageComp render()", this.props);
        return (
            <div>
                <h1><b>내 정보 관리</b></h1>
                <table>
                    <tr>
                        <div>
                        <Link to="./mypage/MemberUpdateFormComp">
                        <button type="button">정보수정</button>
                        </Link>
                        <Route exact path="/mypage/MemberUpdateFormComp" component={MemberUpdateFormComp} />
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

                <h1><b>나의 리뷰</b></h1>
            </div>
        )
    }

}

export default MypagePageComp;
