import React , { Component } from 'react';
import reactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { refreshTokenSetup } from "./refreshToken";
import store from "../../../redux/store";
import { URL, actionType, mainViewType } from "../../../redux/config";

class GoogleLoginBtnComp extends Component
{
    // 백엔드에 정보를 저장하기 위해 state에 id, name, provider를 저장함
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
            accessToken: ''
        }
    }

    setLoginId = (loginId) => {
        console.log("LoginPage setLoginId()");
        store.dispatch({
            type: actionType.LOG_IN,
            // mainView: mainViewType.MainPage
            loginId: loginId
        });
    }

    setGoogleOn = () => {
        console.log("구글로 로그인했습니다");
        store.dispatch({
            type: actionType.googleLogin,
            googleOn: true
        });
    }

    render() {
        const responseGoogle = (response) => {
            console.log(response);
        }
        
        // 로그인에 성공하면 json을 반환해줌 => onSuccess함수에서 state에 id, name을 저장
        const onSuccess = (res) => {
            console.log('[Login Success] 로그인한 사용자:', res.profileObj);
            console.log('로그인한 사용자 id : ' +  res.googleId);

            this.setState({
                id: res.googleId,
                name: res.profileObj.name,
                provider: 'google'
            });

            // initializing the setup
            refreshTokenSetup(res);
        };

        // 로그인에 실패한 경우에는 에러를 넘겨줌 => onFailure함수에서 error 출력
        const onFailure = (res) => {
            console.log('[Login failed] res:', res);
        };

        return (
            <>
            <br />
            <br />
            <GoogleLogin
                clientId="256166181377-83u2uuteqgosooa3um2i3o36ho1325md.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            </>
        );
    }
}

export default GoogleLoginBtnComp;