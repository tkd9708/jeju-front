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
import Noticeinsert from './component/main/notice/Noticeinsert';
import store from "./redux/store";
import {actionType} from "./redux/config";
import SearchResultComp from "./component/main/mainpage/SearchResultComp";
import MemberUpdateFormComp from "./component/main/mypage/MemberUpdateFormComp";
import SharePlanPageComp from "./component/main/SharePlan/SharePlanPageComp";

let confirmLs = localStorage.getItem("com.naver.nid.access_token");

const footerStyle = {
    sizeIn: {
        position: "absolute",
        width: "100%",
        bottom: "2.0%",
    },
    sizeOver: {
        width: "100%",
    }
}

const setPositionFooter = () => {
    let menuElement = document.querySelector(".menu");
    let mainFrameElement = document.querySelector(".mainFrame");

    let menuHeight = (menuElement) ? menuElement.offsetHeight : 0;
    let mainFrameHeight = (mainFrameElement) ? mainFrameElement.offsetHeight : 0;
    let footerComp = document.querySelector(".footerComp");
    let topContentHeight = menuHeight + mainFrameHeight;
    // console.log(mainFrameHeight, menuHeight, topContentHeight, window.visualViewport.height);

    if (footerComp) {
        if (window.visualViewport.height > topContentHeight) {
            footerComp.style.width = footerStyle.sizeIn.width;
            footerComp.style.position = footerStyle.sizeIn.position;
            footerComp.style.bottom = footerStyle.sizeIn.bottom;
        } else {
            footerComp.style.width = footerStyle.sizeOver.width;
            footerComp.style.position = "";
            footerComp.style.bottom = "";
        }
    }
}

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

        // window.onmousewheel = function (e) {
        //     // console.log(window.scrollY);
        //     this.showHeader(window.scrollY);
        // }.bind(this);
        // window.onscroll = function (e) {
        //     // console.log(window.scrollY);
        //     this.showHeader(window.scrollY);
        // }.bind(this);

        window.addEventListener("scroll", this.showHeader);

        if (confirmLs !== undefined) {
            this.setState({
                logged: true,
            });
        } else {
            this.setState({
                logged: false,
            });
        }

        // store.subscribe(()=>{
        //     window.setTimeout(setPositionFooter, 100);
        // });
    }


    showHeader = () => {
        let scrollVal = window.scrollY;
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
        });
    }

    componentWillMount() {
        window.setTimeout(setPositionFooter, 1000);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        window.setTimeout(setPositionFooter, 1000);
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
                <div className="mainFrame"
                >
                    <Switch>
                        <Route exact path="/" component={MainPageComp}/>

                        {/*test*/}
                        <Route path="/search/:category?/:keyword?/:pageNum?" component={SearchResultComp}/>

                        <Route path="/admin/:name?" component={MemberListPageComp}/>
                        <Route path="/login/:name?">
                            <LoginPageComp/>
                        </Route>
                        <Route path="/join/:name?" component={SignupPageComp}/>
                        <Route exact path="/mypage" component={MypagePageComp}/>
                        <Route path="/mypage/update/:num?" component={MemberUpdateFormComp}/>
                        <Route path="/share/:pageNum?" component={ShareBoardPageComp}/>
                        <Route path="/share/insert" component={ShareBoardFormComp}/>
                        <Route path="/share/update/:num?" component={ShareBoardUpdateForm}/>
                        <Route path="/tour/:name?" component={DetailTourComp}/>
                        <Route exact path="/notice" component={NoticePageComp}/>
                        <Route path="/notice/insert" component={Noticeinsert}/>
                        <Route path="/notice/content/:num?" component={NoticeContent}/>
                        <Route path="/reservation/:name?" component={ReservationPageComp}/>
                        <Route path="/tourlist/:name?/:pageNum?" component={TourPageComp}/>
                        <Route path="/shareplan/:name?/" component={SharePlanPageComp}/>
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

