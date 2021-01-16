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

class MainComp extends Component {

    constructor(props) {
        super(props);
        console.log("MainComp constructor", props, store.getState().mainView);

        store.subscribe(function () {
            console.log("MainComp subscribe()");
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
                <MainPageComp/>
            )
        } else if (_mainView == mainViewType.Reservation) {
            return (
                <ReservationPageComp/>
            )
        } else if (_mainView == mainViewType.Notice) {
            return (
                <NoticePageComp/>
            )
        } else if (_mainView == mainViewType.Tour) {
            return (
                <TourPageComp/>
            )
        } else if (_mainView == mainViewType.ShareBoard) {
            return (
                <ShareBoardPageComp/>
            )
        } else if (_mainView == mainViewType.MyPage) {
            return (
                <MypagePageComp/>
            )
        } else if (_mainView == mainViewType.Login) {
            return (
                <LoginPageComp/>
            )
        } else if (_mainView == mainViewType.Admin) {
            return (
                <MemberListPageComp/>
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
        return (
            <div>
                <h1>MainComp</h1>
                {this.setMainView()}
            </div>
        )
    }

}

export default MainComp;
