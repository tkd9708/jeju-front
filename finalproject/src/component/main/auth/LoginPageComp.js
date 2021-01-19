import React, {Component} from "react";
import axios from 'axios';
import GoogleLoginBtnComp from "./GoogleLoginBtnComp";
import GoogleLogoutBtnComp from "./GoogleLogoutBtnComp";
import store from "../../../redux/store";
import { actionType, mainViewType } from "../../../redux/config";

class LoginPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("LoginPageComp constructor", props);
        
        this.state={
            id:'',  //아이디를 저장하고 있을 state
            password:'',
            pwCheck: "",//비밀번호 두개가 일치하는가
            name : "",
            birth_date: "",
            phone : "",
            email : "",
            address : "",
            idcanUse: false,//중복된 아이디찾기 true여야 로그인가능
        }

        //함수 선언
        this.onIdChk=this.onIdChk.bind(this);
    }



    // 변수 선언시 state 영역에 추가했을 경우에만 나중에 값변경이 가능하다
    // 값 변경시에는 setState 를 이용해야만 한다
    // 이벤트
    changeEvent=(e)=>{
        
        console.log(e.target.id+":"+e.target.value);
        // 만약 엔터 누를때만 변경되도록 하고 싶으면
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    //방법2
    onIdChk=(e)=>{
        e.preventDefault();
        console.log(this.state.id);
        const data = {
            id: this.state.id//현재 id state 값을 data.id에 넣는다
        }
        // ↓은 백엔드로 fetch해서 입력된 값을 POST
        fetch("http://localhost:9002/member/checkid", 
                {//localhost 9002번 포트 checkid라우터를 찾는다
                    method: "POST",
                    headers: {
                    "Content-Type" : "application/json"
                    },
                body: JSON.stringify(data),//json화 해버리기
                })
            .then(response => response.json())
            .then(json=> {
                console.log("확인입니다");
                if(json.idcanUse == true){  //uson을받아왔는데idcanUse값이true면사용가능
                    alert("사용가능한 ID입니다");
                    this.setState({
                        idcanUse: true
                    })
                }
                else{
                    alert("다른 ID를 입력해주세요");
                }
            });
    }

    render() {
        console.log("LoginPageComp render()", this.props);
        return (
            <div>
                <h4>로그인</h4>
                <div>
                    {this.state.id}
                    <h4 className="showIdResult">{this.state.showIdResult}</h4>
                </div>
                <br />
                아이디 :
                <input type="text" name="id"
                onChange={this.changeEvent.bind(this)}
                ref="id" value={this.state.id}
                />
                <br />
                비밀번호 : 
                <input type="password" name="password"
                onChange={this.changeEvent.bind(this)}
                ref="password" value={this.state.password}
                />
                <br />
                <button type="button">
                    Sign in
                </button>
                <h5>
                    내 아이디는 {this.state.id} 입니다
                    내 비밀번호는 {this.state.password} 입니다
                </h5>
                <GoogleLoginBtnComp />
                <GoogleLogoutBtnComp />
            </div>
        )
    }

}

export default LoginPageComp;
