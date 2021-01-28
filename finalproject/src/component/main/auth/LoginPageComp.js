import React, {Component} from "react";
import axios from 'axios';
import GoogleLoginBtnComp from "./GoogleLoginBtnComp";
import GoogleLogoutBtnComp from "./GoogleLogoutBtnComp";
import store from "../../../redux/store";
import { URL, actionType, mainViewType } from "../../../redux/config";
import NaverLoginBtnComp from "./NaverLoginBtnComp";
import FaceBookLoginBtnComp from "./FaceBookLoginBtnComp";

import TextField from "@material-ui/core/TextField";

import MakeLoginBtn from "./MakeLoginBtn";
import { FaThemeisle } from "react-icons/fa";
import {Route, Link} from "react-router-dom";

class LoginPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("LoginPageComp constructor", props);
        
        this.state={
            id:'',  //아이디를 저장하고 있을 state
            pass:'',
            pwCheck: "",//비밀번호 두개가 일치하는가
            name : "",
            birth_date: "",
            phone : "",
            email : "",
            address : "",
            idcanUse: false,//중복된 아이디찾기 true여야 로그인가능
            logged:this.props.logged,
            onLogin:this.onLogin,
        }

        //함수 선언
    }

    setLoginId = (loginId) => {
        console.log("LoginPage setLoginId()");
        store.dispatch({
            type: actionType.LOG_IN,
            // mainView: mainViewType.MainPage
            loginId: loginId,
            logged: true
        });
    }

    // 변수 선언시 state 영역에 추가했을 경우에만 나중에 값변경이 가능하다
    // 값 변경시에는 setState 를 이용해야만 한다
    // 이벤트
    changeEvent=(e)=>{
        
        // console.log(e.target.id+":"+e.target.value);
        // 만약 엔터 누를때만 변경되도록 하고 싶으면
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onLogin=()=>{
        // console.log("로그인할 아이디는 " + this.state.id + "비밀번호는 " + this.state.pass);
        const data = {
            id: this.state.id,
            pass: this.state.pass
        }
        let url = URL + "/member/login";

        axios.post(url, data)
        .then(response => {
            console.log(response.data);
            if(response.data){
                // this.props.onLogin();
                this.setLoginId(data.id);
                // alert(store.getState().loginId+ "가 스토어에 저장된 아이디입니다");
                this.props.history.push("/");
            }
            else{
                alert("아이디와 비밀번호가 맞지않습니다.");
                this.setState({
                    pass: '',
                })
            }
        }).catch(err => {
            console.log("로그인시 오류남:"+err);
        })
    }

    render() {
        // console.log("LoginPageComp render()", this.props);
        // console.log("스토어에 있는 로그인 아이디 상태는 : " + store.getState().loginId);
        const parentOnLoginHandler = this.onLogin.bind(this);
        return (
            <div>
                <h4>로그인</h4>
                <div>
                    {this.state.id}
                    <h4 className="showIdResult">{this.state.showIdResult}</h4>
                </div>
                <br />
                
                <TextField id="standard-secondary" label="아이디" color="secondary" 
                type="text" name="id" value={ this.state.id }
                onChange = { this.changeEvent.bind(this) } />

                <br />

                <TextField id="standard-secondary" label="비밀번호" color="secondary" 
                type="password" name="pass" value={ this.state.pass }
                onChange = { this.changeEvent.bind(this) } />

                <br />
                <button type="button"
                onClick={this.onLogin.bind(this)}>
                    Sign in
                </button>
                <MakeLoginBtn 
                parentOnLoginHandler={parentOnLoginHandler} />
                <h5>
                    내 아이디는 {this.state.id} 입니다
                    내 비밀번호는 {this.state.pass} 입니다
                </h5>
                {/* 회원가입 */}
                <Link to="/join"><button type="button" className="btn btn-warning">회원가입</button></Link>
                
                
                <GoogleLoginBtnComp />
                <GoogleLogoutBtnComp />
                <br />
                <br />
                <NaverLoginBtnComp />
                <br />
                <FaceBookLoginBtnComp />
            </div>
        )
    }

}

export default LoginPageComp;
