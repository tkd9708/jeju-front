import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Admin, TourList, Tour} from './menus';
import store from "../../redux/store";
import {actionType, mainViewType} from "../../redux/config";
import "./Menu.css";
import Logo2 from "../../image/logo2.png";

class Menu extends Component {

    constructor(props) {
        super(props);
        // console.log("Menu constructor ", this.props)

        this.state = {
            type: this.props.type,
        }
    }

    setMainView = (mainView) => {
        console.log("Home setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            // mainView: mainViewType.MainPage
            mainView: mainView
        });
    }

    render() {
        // 부모컴포넌트(App->HeaderComp)에서 받아온 logged, onLogout을 통해 로그인 전에는 '로그인'을 로그인 후에는 '로그아웃'으로 글씨 변경
        // 로그아웃일 경우 onLogout함수를 통해 logged를 다시 false로 바꿔준다.
        // 부모컴포넌트가 HeaderComp->App이므로 props를 통해 value를 전달받을 수 있다. 그러나 Login컴포넌트의경우는 여러번 전달해야함.
        // 따라서 전역적인 상태가 필요하다.

        const {logged, onLogout} = this.props;
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
                            {/*<img src={Logo2}*/}
                            {/*     style={{width: "150px"}}*/}
                            {/*     alt="logo2"/>*/}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink exact to="/Admin"
                                 onClick={() => {
                                     console.log("Admin NavLink onClick");
                                     this.setMainView(mainViewType.Admin);
                                 }}
                        >Admin</NavLink>
                    </li>
                    <li>
                        {logged ?
                            <NavLink exact to="/"
                                     onClick={() => {
                                         onLogout();
                                         console.log("Logout NavLink onClick");
                                         this.setMainView(mainViewType.Logout);
                                     }}>Logout</NavLink>
                            :
                            <NavLink exact to="/Login"
                                     onClick={() => {
                                         console.log("Login NavLink onClick");
                                         this.setMainView(mainViewType.Login);
                                     }}
                            >Login</NavLink>
                        }
                    </li>
                    <li>
                        <NavLink exact to="/Join"
                                 onClick={() => {
                                     console.log("Join NavLink onClick");
                                     this.setMainView(mainViewType.JoinForm);
                                 }}
                        >Join</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/MyPage"
                                 onClick={() => {
                                     console.log("Mypage NavLink onClick");
                                     this.setMainView(mainViewType.MyPage);
                                 }}
                        >MyPage</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/ShareBoard"
                                 onClick={() => {
                                     console.log("ShareBoard NavLink onClick");
                                     this.setMainView(mainViewType.ShareBoard);
                                 }}
                        >Share</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/TourList"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >Tour</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Notice"
                                 onClick={() => {
                                     console.log("Notice NavLink onClick");
                                     this.setMainView(mainViewType.Notice);
                                 }}
                        >Notice</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Reservation"
                                 onClick={() => {
                                     console.log("Reservation NavLink onClick");
                                     this.setMainView(mainViewType.Reservation);
                                 }}
                        >Reservation</NavLink>
                    </li>


                </ul>

                {/*<Route exact path="/">*/}
                {/*    /!*<Home></Home>*!/*/}
                {/*</Route>*/}
                {/*<Route exact path="/Reservation/:name?">*/}
                {/*    /!*<Reservation></Reservation>*!/*/}
                {/*</Route>*/}
                {/*<Route exact path="/Notice/:name?">*/}
                {/*    /!*<Notice></Notice>*!/*/}
                {/*</Route>*/}

                {/*<Route exact path="/TourList/:name?" component={TourList}></Route>*/}
                {/*<Route exact path="/Tour/:name?" component={Tour}></Route>*/}

                {/*<Route exact path="/ShareBoard/:name?">*/}
                {/*    /!*<ShareBoard></ShareBoard>*!/*/}
                {/*</Route>*/}
                {/*<Route exact path="/MyPage/:name?" component={MyPage}>*/}
                {/*    /!*<MyPage></MyPage>*!/*/}
                {/*</Route>*/}
                {/*<Route exact path="/Login/:name?">*/}
                {/*    /!*<Login></Login>*!/*/}
                {/*</Route>*/}
                {/*<Route exact path="/Admin:name?">*/}
                {/*    /!*<Admin></Admin>*!/*/}
                {/*</Route>*/}
            </div>
        )
    }
}

export default Menu;
