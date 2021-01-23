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
        onClose();
    }

    useEffect(Login, []);
    
       


    //client_id 와 redirect_uri 등록
    //JavaScript용 라이브러리 동작에 필요한 기본정보를 설정하는 코드

    //사용 가능한 Option
    //color: 버튼 색상. white, green
    //type: 버튼 타입. 1(버튼형), 2(작은 배너), 3(큰 배너)
    //height: 배너 및 버튼 높이 (사용자 지정값 px)
    const Naver = () => {
        
        

        let naverLogin = new naver.LoginWithNaverId({
            clientId: 'dPXRHN5aH3Xl6lXxm7bn',
            callbackUrl: "http://localhost:3000?naver=true",
            isPopup: true, // 팝업을 통한 연동처리 여부
            loginButton: {color: "green", type: 3, height: 60},
            callbackHandle: true
            // callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다
        });
        

        // 설정정보를 초기화하고 연동을 준비
        naverLogin.init();
        console.log(naverLogin.getLoginStatus());

        window.addEventListener('load', function() {
            naverLogin.getLoginStatus(function (status) {
                if (status && naver) {
                    // 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크
                    var email = naverLogin.user.getEmail();
                    if( email == undefined || email == null ) {
                        alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                        // 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함
                        naverLogin.reprompt();
                        return;
                    }
                    
                    window.self.close();
                    // window.location.replace("http://localhost:3000?naver=true");
                    window.opener.location.replace("http://localhost:3000?naver=true");
                } else {
                    console.log("callback 처리에 실패하였습니다.");
                    console.log(status);
                }
            });
        });

        naverLogin.getLoginStatus((status) => {
            if (status) {
                console.log(status);
                const email = naverLogin.user.getEmail();
                const name = naverLogin.user.getNickName();
                const profileImage = naverLogin.user.getProfileImage();
                const birthday = naverLogin.user.getBirthday();
                const id = naverLogin.user.getId();
                const age = naverLogin.user.getAge();
                const hp = naverLogin.user.getMobile();
                console.log(email, name, profileImage, birthday, id, age, hp);
            } else {
                console.log('AccessToken이 올바르지 않습니다.');
            }
        });
    }

    const UserProfile = () => {
        window.location.href.includes('access_token') && GetUser();
        function GetUser() {
            const location = window.location.href.split('=')[1];
            console.log(location);
        }
    }

    const onClose = () => {
        window.opener = null;
        window.open("", "_self");
        window.close();
    };

    return (
        //네이버 아이디로 로그인 버튼 생성
        //자바스크립트용 라이브러리는 네이버 아이디로 로그인 버튼을
        //자동으로 생성해주는 스크립트 기능이 포함되어있습니다.
        //사용 가능한 로그인 버튼은 크기별 3가지 색상별 2가지씩
        //총 6가지가 제공되며 
        //각각 스크립트 내에 loginButton option을 통하여 세팅
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