import React, {Component} from "react";
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Menu from "./component/header/Menu";
import gsap from "gsap";
import '@progress/kendo-theme-default/dist/all.css';
import "./App.css";
// import {NavLink, Route} from "react-router-dom";
// import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Admin, TourList, Tour} from './component/header/menus';

import MainPageComp from "./component/main/mainpage/MainPageComp";
import ReservationPageComp from "./component/main/reservation/ReservationPageComp";
import NoticePageComp from "./component/main/notice/NoticePageComp";
import ShareBoardPageComp from "./component/main/shareboard/ShareBoardPageComp";
import LoginPageComp from "./component/main/auth/LoginPageComp";
import MemberListPageComp from "./component/main/admin/MemberListPageComp";
import MypagePageComp from "./component/main/mypage/MypagePageComp";
import TourPageComp from "./component/main/tour/TourPageComp";
import SignupPageComp from "./component/main/join/SignupPageComp";
import FooterComp from "./component/footer/FooterComp";
import DetailTourComp from "./component/main/tour/DetailTourComp";
import ShareBoardFormComp from "./component/main/shareboard/ShareBoardFormComp";
import ShareBoardUpdateForm from "./component/main/shareboard/ShareBoardUpdateForm";
import NoticeContent from "./component/main/notice/NoticeContent";
import store from "./redux/store";
import {actionType} from "./redux/config";
import SearchResultComp from "./component/main/mainpage/SearchResultComp";
import MemberUpdateFormComp from "./component/main/mypage/MemberUpdateFormComp";

let confirmLs = localStorage.getItem("com.naver.nid.access_token");

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStaticHeader: true,
            mainview: "mainpage",
            // footerPositionType: "",

            logged: false,
            onLogin: this.onLogin,
            onLogout: this.onLogout

        }

        window.onmousewheel = function (e) {
            // console.log(window.scrollY);
            this.showHeader(window.scrollY);
        }.bind(this);
        window.onscroll = function (e) {
            // console.log(window.scrollY);
            this.showHeader(window.scrollY);
        }.bind(this);


        if (confirmLs !== undefined) {
            this.setState({
                logged: true,
            });
        } else {
            this.setState({
                logged: false,
            });
        }
    }


    showHeader = (scrollVal) => {
        const isStaticHeader = this.state.isStaticHeader;
        if (scrollVal > 0) {
            if (!isStaticHeader) {
                this.setState({
                    isStaticHeader: true
                });
                gsap.to("div.hide", {
                    y: 70,
                    duration: 1
                });
            }
        } else {
            this.setState({
                isStaticHeader: false
            });
            gsap.to("div.hide", {
                y: -70,
                duration: 1
            });
        }
    }


    // Login 함수
    onLogin = () => {
        this.setState({
            logged: true
        });
    }

    // Logout 함수
    onLogout = () => {
        this.setState({
            logged: false
        });
    }

    componentDidMount() {
        store.dispatch({
            type:actionType.setMainView,
        })
    }


    render() {
        let {logged} = this.state;

        return (
            <BrowserRouter>
                <Menu logged={logged}
                      type="hide"
                />
                <Menu logged={logged}
                      type="normal"
                />
                <div className="mainFrame"  >
                    <Switch>
                        <Route exact path="/" component={MainPageComp}/>

                        {/*test*/}
                        <Route path="/search/:category?/:keyword?" component={SearchResultComp}/>

                        <Route path="/admin/:name?" component={MemberListPageComp}/>
                        <Route path="/login/:name?">
                            <LoginPageComp/>
                        </Route>
                        <Route path="/join/:name?" component={SignupPageComp}/>
                        <Route exact path="/mypage" component={MypagePageComp}/>
                        <Route path="/mypage/update/:num?" component={MemberUpdateFormComp}/>
                        <Route exact path="/share" component={ShareBoardPageComp}/>
                        <Route path="/share/insert" component={ShareBoardFormComp}/>
                        <Route path="/share/update/:num?" component={ShareBoardUpdateForm}/>
                        <Route path="/tour/:name?" component={DetailTourComp}/>
                        <Route exact path="/notice" component={NoticePageComp}/>
                        <Route path="/notice/content/:num?" component={NoticeContent}/>
                        <Route path="/notice/content/:num?" component={NoticeContent}/>
                        <Route path="/reservation/:name?" component={ReservationPageComp}/>
                        <Route path="/tourlist/:name?/:pageNum?" component={TourPageComp}/>
                    </Switch>
                    <div className="footerComp"
                    >
                        <FooterComp/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
/*
    HeaderComp
        Title
            Home
            Notice
            Reservation
            Tour
                TourList
            ShareBoard
            MyPage
            Login / Logout
    MainComp
        Home
            -
            -
        검색
            - 검색 카테고리 select/option
            - 단어검색어 input
            - 검색 button
        관광명소 - 지도 클릭
            - 제주시 명소 링크.
            - 애월읍 명소 링크.
            ...
        공지사항
            - +버튼 -> 공지사항 페이지 이동. -button 안에 img
            - 공지사항 리스트중 하나 클릭. -table td a tag 안에 span 문자열
        공유게시판
            - +버튼 -> 공유게시판 페이지 이동. -button 안에 img
            - 공유게시판 리스트중 하나 클릭. -table td a tag 안에 span 문자열
    footer
        회사 정보
 */
