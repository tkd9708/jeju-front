import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Admin, TourList, Tour} from './menus';
import store from "../../redux/store";
import {actionType, mainViewType} from "../../redux/config";
import "./Menu.css";
import Logo2 from "../../image/logo2.png";
import TourPageComp from '../main/tour/TourPageComp';

class Menu extends Component {

    constructor(props) {
        super(props);
        // console.log("Menu constructor ", this.props)

        this.state = {
            type: this.props.type,
            onLogin: this.props.onLogin,
            onLogout: this.props.onLogout,
            logged: store.getState().logged
        }

        store.subscribe(function () {
            console.log("Menu subscribe()", store.getState().logged);
            this.setState({
                logged: store.getState().logged,
            });
        }.bind(this));
    }

    setMainView = (mainView) => {
        console.log("Home setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            // mainView: mainViewType.MainPage
            mainView: mainView
        });
    }

    setLogOut = () => {
        console.log("Menu setLogOut()");
        
        store.dispatch({
            type: actionType.LOG_IN,
            // mainView: mainViewType.MainPage
            loginId: '',
            logged: false
        });
    }
    
    render() {
        // console.log("메뉴에서 스토어 상태 : " + store.getState().loginId);
        // console.log("메뉴에서 스토어 로그인 상태 : " + store.getState().logged);
        // 부모컴포넌트(App->HeaderComp)에서 받아온 logged, onLogout을 통해 로그인 전에는 '로그인'을 로그인 후에는 '로그아웃'으로 글씨 변경
        // 로그아웃일 경우 onLogout함수를 통해 logged를 다시 false로 바꿔준다.
        // 부모컴포넌트가 HeaderComp->App이므로 props를 통해 value를 전달받을 수 있다. 그러나 Login컴포넌트의경우는 여러번 전달해야함.
        // 따라서 전역적인 상태가 필요하다.


        // let {logged} = this.props;
        // console.log("Menu render ", this.props);

        var className_div_menu = `${this.state.type} menu`;

        return (
            <div className={className_div_menu}>
                <ul className="menu">
                    <li className="logo">
                        <NavLink exact to="/"
                                 onClick={() => {
                                     console.log("Home NavLink onClick");
                                     this.setMainView(mainViewType.MainPage);
                                 }}
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink exact to="/admin"
                                 onClick={() => {
                                     console.log("Admin NavLink onClick");
                                     this.setMainView(mainViewType.Admin);
                                 }}
                        >Admin</NavLink>
                    </li>
                    <li>
                        {this.state.logged ?
                            <NavLink exact to="/"
                                     onClick={() => {
                                         console.log("Logout NavLink onClick");
                                         this.setMainView(mainViewType.MainPage);
                                         this.setLogOut();
                                     }}>Logout</NavLink>
                            :
                            <NavLink exact to="/login"
                                     onClick={() => {
                                         console.log("Login NavLink onClick");
                                         this.setMainView(mainViewType.Login);
                                     }}
                            >Login</NavLink>
                        }
                    </li>
                    <li>
                        <NavLink exact to="/join"
                                 onClick={() => {
                                     console.log("Join NavLink onClick");
                                     this.setMainView(mainViewType.JoinForm);
                                 }}
                        >Join</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/mypage"
                                 onClick={() => {
                                     console.log("Mypage NavLink onClick");
                                     this.setMainView(mainViewType.MyPage);
                                 }}
                        >MyPage</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/share"
                                 onClick={() => {
                                     console.log("ShareBoard NavLink onClick");
                                     this.setMainView(mainViewType.ShareBoard);
                                 }}
                        >Share</NavLink>
                    </li>
                    {/*<li class="dropdown">*/}
                    <li className="dropdown">
                        <a>Tour</a>
                            {/*<div class="dropdown-content" >*/}
                            <div className="dropdown-content" >
                                <a href="/tourlist/jeju/1">제주</a>
                                <a href="/tourlist/jocheon/1">조천</a>
                                <a href="/tourlist/gujwa/1">구좌</a>
                                <a href="/tourlist/sungsan/1">성산</a>
                                <a href="/tourlist/pyoseon/1">표선</a>

                                <a href="/tourlist/namwon/1">남원</a>
                                <a href="/tourlist/seogwipo/1">서귀포</a>
                                <a href="/tourlist/andeok/1">안덕</a>
                                <a href="/tourlist/daejung/1">대정</a>
                                <a href="/tourlist/hangyeong/1">한경</a>

                                <a href="/tourlist/hanrim/1">한림</a>
                                <a href="/tourlist/aewol/1">애월</a>
                                <a href="/tourlist/udo/1">우도</a>
                            </div>
                            {/* <NavLink exact to="/tour"
                                    onClick={() => {
                                        console.log("Tour NavLink onClick");
                                        this.setMainView(mainViewType.TourList);
                                    }}
                            >Tour</NavLink> */}


                    </li>
                    <li>
                        <NavLink exact to="/notice"
                                 onClick={() => {
                                     console.log("Notice NavLink onClick");
                                     this.setMainView(mainViewType.Notice);
                                 }}
                        >Notice</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/reservation"
                                 onClick={() => {
                                     console.log("Reservation NavLink onClick");
                                     this.setMainView(mainViewType.Reservation);
                                 }}
                        >Reservation</NavLink>
                    </li>
                </ul>


                {/*<hr style={{clear: 'both'}}/>*/}

                {/* <Route exact path="/"> */}
                    {/*<Home></Home>*/}
                {/* </Route> */}
                {/* <Route exact path="/Reservation/:name?"> */}
                    {/*<Reservation></Reservation>*/}
                {/* </Route> */}
                 {/* <Route exact path="/Notice/:name?"> */}
                    {/*<Notice></Notice>*/}
                {/* </Route> */}

                {/* <Route exact path="/TourList/:name?" component={TourList}></Route> */}
                {/* <Route exact path="/TourList/:name?" component={TourPageComp}></Route> */}
                {/* <Route exact path="/Tour/:name?" component={Tour}></Route> */}

                {/* <Route exact path="/ShareBoard/:name?"> */}
                    {/*<ShareBoard></ShareBoard>*/}
                {/* </Route> */}
                {/* <Route exact path="/MyPage/:name?" component={MyPage}> */}
                    {/*<MyPage></MyPage>*/}
                {/* </Route>
                <Route exact path="/Login/:name?"> */}
                    {/*<Login></Login>*/}
                {/* </Route>
                <Route exact path="/Admin:name?"> */}
                    {/*<Admin></Admin>*/}
                {/* </Route> */}
            </div>
        )
    }
}

export default Menu;
