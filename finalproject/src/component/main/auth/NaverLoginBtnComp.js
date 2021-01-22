import { getSuggestedQuery } from '@testing-library/react';
import React , { Component, useEffect } from 'react';
import reactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { refreshTokenSetup } from "./refreshToken";

const { naver } = window;

export default function NaverLoginBtnComp () {

    const Login = () => {
        Naver();
        UserProfile();
    }

    useEffect(Login, []);

    const Naver = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: 'dPXRHN5aH3Xl6lXxm7bn',
            callbackUrl: "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot1",
            isPopup: false,
            loginButton: {color: "green", type: 3, height: 60},
            callbackHandle: true
        });
        naverLogin.init();
    }

    const UserProfile = () => {
        window.location.href.includes('access_token') && GetUser();
        function GetUser() {
            const location = window.location.href.split('=')[1];
            console.log(location);
        }
    }

    return (
        <div id="naverIdLogin" onClick={Login}>
            네이버로그인
        </div>
    );
}

// class NaverLoginBtnComp extends Component
// {
//     // 백엔드에 정보를 저장하기 위해 state에 id, name, provider를 저장함
//     constructor(props) {
//         super(props);
//         this.state = {
//             id: '',
//             name: '',
//             provider: '',
//             accessToken: ''
//         }
//     }

//     render() {
        
        
        
//         return (
//             <>
//             <br />
//             <br />
            
//             </>
//         );
//     }
// }

// export default NaverLoginBtnComp;