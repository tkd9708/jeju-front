import React, {Component} from "react";
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Menu from "./component/header/Menu";
import gsap, {Cubic, Quint} from "gsap";
import '@progress/kendo-theme-default/dist/all.css';
import "./App.css";
// import {NavLink, Route} from "react-router-dom";
// import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Admin, TourList, Tour} from './component/header/menus';

import MainPageComp from "./component/main/mainpage/MainPageComp";
import ReservationPageComp from "./component/main/reservation/ReservationPageComp";
import RentCarPageComp from "./component/main/reservation/RentCarPageComp";
import ShipPageComp from "./component/main/reservation/ShipPageComp";
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
import NoticeAddForm from "./component/main/notice/NoticeAddForm";
import NoticeUpdate from './component/main/notice/NoticeUpdateForm';
import store from "./redux/store";
import {actionType} from "./redux/config";
import SearchResultComp from "./component/main/mainpage/SearchResultComp";
import SharePlanPageComp from "./component/main/SharePlan/SharePlanPageComp";
import MySchedule from "./component/main/mypage/MySchedule";
import MyReview from "./component/main/mypage/MyReview";
import MyWishlist from "./component/main/mypage/MyWishlist";
import PassCheck from "./component/main/mypage/PassCheck";
import SocialUpdateForm from "./component/main/mypage/SocialUpdateForm";
import MemberUpdateFormComp from "./component/main/mypage/MemberUpdateFormComp";
import ChattingRoom from './component/main/SharePlan/ChattingRoom';
import ChatIcon from '@material-ui/icons/Chat';
import ChatCompPage from "./component/main/SharePlan/ChatCompPage";
import ChattingLogic from "./ChattingLogic";
import RecommendCourse from "./component/main/Recommend/RecommendCourse";

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
        this.intervalOfChattingBackgroundUpdate = null;
        this.state = {
            isStaticHeader: true,
            mainview: "mainpage",
            // footerPositionType: "",

            logged: false,
            onLogin: this.onLogin,
            onLogout: this.onLogout,

            chattingRoomListInfo: [],
            isNewChattingIcon: false,
        }

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

        store.dispatch({
            type: actionType.setChatWindow,
            isOpenChatWindow: false,
        });
        store.dispatch({
            type: actionType.setIsChatAutoUpdate,
            isChatAutoUpdate: false,
        });
        store.dispatch({
            type: actionType.setIsChatAutoBackgroundUpdate,
            setIsChatAutoBackgroundUpdate: false,
        });

        store.subscribe(function () {
            if (store.getState().publishFunctionMsg == "chattingRoomListInfo") {
                let chat = new ChattingLogic();
                chat.getRoomList((res) => {
                    console.log("res", res, "chattingRoomListInfo", store.getState().chattingRoomListInfo);
                    let roomListInfo = store.getState().chattingRoomListInfo;
                    let newList = [];   //속성마다 isNew 가 추가된것
                    let resultIsNewChattingIcon = false;

                    //compare previous to current. by count.
                    //res.data 을 순회, num 을 보고 기존데이터에서 find() 로 찾아냄.
                    // 요소마다 isNew t/f를 적절히 넣어줌.
                    // 중간에 새로생긴 채팅방이 있다면, _temp 가 undefined.
                    for (let _newRoomInfo of res.data) {
                        //num 으로 find.
                        let _temp = roomListInfo.find(e => e.num == _newRoomInfo.num);
                        console.log(11111, _temp);

                        if (_temp) {
                            //기존에 있던것이니까, 새로운거랑 비교를 해봐야 함.
                            if (_temp.msgCnt < _newRoomInfo.msgCnt) {
                                _temp = _newRoomInfo;
                                _temp.isNew = true;
                            } else {
                                _temp.isNew = false;
                            }
                        } else {
                            //_temp 가 undefined 이기때문에 _newRoomInfo 를 넣어줌.
                            //새로생긴 채팅방.
                            _temp = _newRoomInfo;
                            _temp.isNew = true;
                        }
                        console.log(22222, _temp);
                        newList.push(_temp);

                        if (!resultIsNewChattingIcon && _temp.isNew) {
                            //res.data 중에 뭔가 새로운게 있다는거.
                            resultIsNewChattingIcon = true;


                        }
                    }

                    console.log(33333, resultIsNewChattingIcon, newList);

                    this.setChattingRoomListInfo(newList, resultIsNewChattingIcon);
                    store.dispatch({
                        type: actionType.chattingRoomListInfo,
                        chattingRoomListInfo: newList,
                    });
                });

                store.dispatch({
                    type: actionType.publishFunctionMsg,
                    publishFunctionMsg: "",
                });
            }
        }.bind(this));

        /* 채팅 백그라운드 업데이트 */
        //setInterval() 여기서 파라미터 등록이 그 당시의 값을 파라미터로 등록하는것.
        //interval 이 작동할 때마다 각각 다른 파라미터가 들어가도록 하고싶었는데
        //interval() 등록당시의 파라미터 값으로만 옴.
        if (!store.getState().isChatAutoBackgroundUpdate) {
            store.dispatch({
                type: actionType.setIsChatAutoBackgroundUpdate,
                isChatAutoBackgroundUpdate: true,
            });

            this.intervalOfChattingBackgroundUpdate = window.setInterval((/*loginId, testParam1*/) => {
                console.log("chatting_background_update", store.getState().loginId);

                store.dispatch({
                    type: actionType.publishFunctionMsg,
                    publishFunctionMsg: "chattingRoomListInfo",
                });
            }, 5000);//, store.getState().loginId.toString(), 1234);
        }
    }


    setChattingRoomListInfo = (chattingRoomListInfo, isNewChattingIcon = false) => {
        console.log("setChattingRoomListInfo()", chattingRoomListInfo, isNewChattingIcon);
        // isNewChattingIcon 나중에 아이콘 클릭할때, state 에 false 로.
        this.setState({
            chattingRoomListInfo: chattingRoomListInfo,
            isNewChattingIcon: (this.state.isNewChattingIcon) ? true : isNewChattingIcon,
        });
    }

    setChattingIconIsNew = (isNewChattingIcon) => {
        this.setState({
            isNewChattingIcon: isNewChattingIcon,
        })
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
                    y: 80,
                    duration: 1
                });
            }
        } else {
            this.setState({
                isStaticHeader: false
            });
            gsap.to("div.hide", {
                y: -80,
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
            type: actionType.setMainView,
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
                <div className="chatting">
                    {/*항상떠있는 아이콘*/}
                    <div
                        className="chattingIconBack"
                    ><ChatIcon
                        className="chattingIcon"
                        onClick={(e) => {
                            let duration = 1.0;
                            let ease = Quint.easeInOut;

                            if (store.getState().isOpenChatWindow) {
                                //chatting icon click. Close
                                gsap.to("div.chatting div.chattingWindow", {
                                    transform: "scale(0.1)",
                                    opacity: 0,
                                    duration: duration,
                                    ease: ease,
                                });
                                store.dispatch({
                                    type: actionType.setChatWindow,
                                    isOpenChatWindow: false,
                                });
                            } else {
                                //chatting icon click. Open
                                //통신먼저 하고 결과값으로 액션.
                                let chat = new ChattingLogic();
                                chat.getRoomList((res) => {
                                    console.log(res);
                                    /*
                                    0: {num: "33", user1: "yangyk7364", user2: "sanghee"}
                                    1: {num: "34", user1: "3color", user2: "yangyk7364"}
                                    2: {num: "50", user1: "yangyk7364", user2: "asdf"}
                                    * */

                                    /*//여기서 res.data.map 돌면서 lastMsg get.
                                    res.data.map((e, i) => {
                                        chat.getLastMsg(e.num, (res) => {

                                        });
                                    });*/

                                    gsap.to("div.chatting div.chattingWindow", {
                                        transform: "scale(1)",
                                        opacity: 1,
                                        duration: duration,
                                        ease: ease,
                                    });
                                    store.dispatch({
                                        type: actionType.setChatWindow,
                                        isOpenChatWindow: true,
                                    });
                                    store.dispatch({
                                        type: actionType.chattingRoomListInfo,
                                        chattingRoomListInfo: res.data,
                                    });
                                    store.dispatch({
                                        type: actionType.publishFunctionMsg,
                                        publishFunctionMsg: "changeChatAction",
                                    });
                                    this.setState({
                                        chattingRoomListInfo: res.data,
                                    });
                                });
                            }
                        }}
                    /></div>

                    {/*아이콘을 누르면 나오는 채팅 창.*/}
                    <div className="chattingWindow"
                         style={{
                             transform: "scale(0.1)",
                             opacity: "0",
                         }}
                    >
                        <ChatCompPage chattingRoomListInfo={this.state.chattingRoomListInfo}/>
                    </div>
                </div>
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
                        <Route path="/mypage/social/:num?" component={SocialUpdateForm}/>
                        <Route path="/mypage/update/:num?" component={MemberUpdateFormComp}/>
                        <Route path="/mypage/plan/:num?" component={MySchedule}/>
                        <Route path="/mypage/review/:num?" component={MyReview}/>
                        <Route path="/mypage/reservation/:num?" component={MyWishlist}/>
                        <Route path="/mypage/pass/:name?" component={PassCheck}/>
                        <Route exact path="/share/insert" component={ShareBoardFormComp}/>
                        <Route path="/share/update/:num?/:pageNum?" component={ShareBoardUpdateForm}/>
                        <Route path="/share/:pageNum?" component={ShareBoardPageComp}/>
                        <Route path="/tour/:name?" component={DetailTourComp}/>
                        <Route exact path="/notice/:pageNum?" component={NoticePageComp}/>
                        <Route path="/notice/content/:num?" component={NoticeContent}/>
                        <Route path="/notice/update/:num?" component={NoticeUpdate}/>
                        <Route path="/noticeInsert" component={NoticeAddForm}/>
                        <Route path="/air/:name?" component={ReservationPageComp}/>
                        <Route path="/car/:name?" component={RentCarPageComp}/>
                        <Route path="/ship/:name?" component={ShipPageComp}/>
                        <Route path="/tourlist/:name?/:pageNum?" component={TourPageComp}/>
                        <Route path="/shareplan/:name?/" component={SharePlanPageComp}/>
                        <Route path="/chattingroom/:num?" component={ChattingRoom}/>
                        <Route path="/Recommend" component={RecommendCourse}/>
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

