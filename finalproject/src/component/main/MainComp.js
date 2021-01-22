import React, {Component} from "react";
import MainPageComp from "./mainpage/MainPageComp";
import ReservationPageComp from "./reservation/ReservationPageComp";
import NoticePageComp from "./notice/NoticePageComp";
import ShareBoardPageComp from "./shareboard/ShareBoardPageComp";
import LoginPageComp from "./auth/LoginPageComp";
import MemberListPageComp from "./admin/MemberListPageComp";
import store from "../../redux/store";
import {mainViewType} from "../../redux/config";
import MypagePageComp from "./mypage/MypagePageComp";
import TourPageComp from "./tour/TourPageComp";
import SignupPageComp from "./join/SignupPageComp";
import "./MainComp.css"
import DetailTourComp from "./tour/DetailTourComp";
import {MyPage, Tour, TourList} from "../header/menus";
import {Route} from "react-router-dom";

class MainComp extends Component {

    constructor(props) {
        super(props);
        console.log("MainComp constructor", props, store.getState().mainView);

        store.subscribe(function () {
            console.log("MainComp subscribe()", store.getState().mainView);
            this.setState({
                mainView: store.getState().mainView,
            });
        }.bind(this));
    }

    setMainView = () => {
        const _mainView = store.getState().mainView;
        console.log("MainComp setMainView()", _mainView, mainViewType.MainPage);

        if (_mainView == mainViewType.MainPage) {
            return (
                // <MainPageComp/>
                <Route exact path="/" component={MainPageComp}/>
            )
        } else if (_mainView == mainViewType.Reservation) {
            return (
                // <ReservationPageComp/>
                <Route exact path="/Reservation/:name?" component={ReservationPageComp}/>
            )
        } else if (_mainView == mainViewType.Notice) {
            return (
                // <NoticePageComp/>
                <Route exact path="/Notice/:name?" component={NoticePageComp}/>
            )
        } else if (_mainView == mainViewType.Tour) {
            return (
                // <DetailTourComp/>
                <Route exact path="/Tour/:name?" component={DetailTourComp}/>
            )
        } else if (_mainView == mainViewType.TourList) {
            return (
                // <TourPageComp/>
                <Route exact path="/TourList/:name?" component={TourPageComp}></Route>
            )
        } else if (_mainView == mainViewType.ShareBoard) {
            return (
                // <ShareBoardPageComp/>
                <Route exact path="/ShareBoard/:name?" component={ShareBoardPageComp}/>
            )
        } else if (_mainView == mainViewType.MyPage) {
            return (
                // <MypagePageComp/>
                <Route exact path="/MyPage/:name?" component={MainPageComp}/>
            )
        } else if (_mainView == mainViewType.Login) {
            return (
                // <LoginPageComp/>
                <Route exact path="/Login/:name?" component={LoginPageComp}/>
            )
        } else if (_mainView == mainViewType.Admin) {
            return (
                // <MemberListPageComp/>
                <Route exact path="/Admin:name?" component={MemberListPageComp}/>
            )
        } else if (_mainView == mainViewType.JoinForm) {
            return (
                // <SignupPageComp/>
                <Route exact path="/Join:name?" component={SignupPageComp}/>
            )
        } else {
            return (
                <p>
                    Not Found...
                </p>
            )
        }

    }

    render() {
        console.log("MainComp render()", this.props);
        var style_hr = {
            margin: "0px"
        }
        return (
            <div className="mainComp">
                {this.setMainView()}
            </div>
        )
    }

}

export default MainComp;
