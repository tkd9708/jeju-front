import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Tour, Admin, Join} from './menu';
import styled from "styled-components";
// import Menu from "./components/Header";
// import Root from './Root';


class Title extends Component {

    constructor(props) {
        super(props);
        console.log("Title constructor ", this.props)
    }

    render() {
        // 부모컴포넌트(App->HeaderComp)에서 받아온 logged, onLogout을 통해 로그인 전에는 '로그인'을 로그인 후에는 '로그아웃'으로 글씨 변경
        // 로그아웃일 경우 onLogout함수를 통해 logged를 다시 false로 바꿔준다.
        // 부모컴포넌트가 HeaderComp->App이므로 props를 통해 value를 전달받을 수 있다. 그러나 Login컴포넌트의경우는 여러번 전달해야함.
        // 따라서 전역적인 상태가 필요하다.

        const { logged, onLogout } = this.props;

        console.log("Title render ", this.props)
        return (
            <div>
                <ul className="menu">
                    <li>
                        <NavLink exact to="/">홈(로고)</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Reservation">예약</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Notice">공지사항</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Tour">관광명소</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/ShareBoard">공유게시판</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/MyPage">MyPage</NavLink>
                    </li>
                    <li>
                        { logged ?
                        <NavLink exact to="/" onClick={ onLogout }>Logout</NavLink> :
                        <NavLink exact to="/Login">Login</NavLink>
                        }
                        &nbsp;&nbsp;&nbsp;
                        <NavLink exact to="/Join">회원가입</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Admin">Admin</NavLink>
                    </li>
                </ul>
                <hr style={{clear: 'both'}}/>
                {/* exact: 다른 페이지랑 겹쳐 나오지 않도록 해준다 */}
                {/* <Route exact path="/" component={Home}/> */}
                {/* 필수로 파라미터 보내기 */}
                {/* <Route path="/about/:name" component={About}/> */}
                {/* 선택적 파라미터 보내기 */}

                <Route exact path="/">
                    <Home setMainView={this.props.setMainView}/>
                </Route>
                <Route exact path="/Reservation/:name?">
                    <Reservation setMainView={this.props.setMainView}/>
                </Route>
                <Route exact path="/Notice/:name?">
                    <Notice setMainView={this.props.setMainView}/>
                </Route>
                <Route exact path="/Tour/:name?">
                    <Tour setMainView={this.props.setMainView}/>
                </Route>
                <Route exact path="/ShareBoard/:name?">
                    <ShareBoard setMainView={this.props.setMainView}/>
                </Route>
                <Route exact path="/MyPage/:name?">
                    <MyPage setMainView={this.props.setMainView}/>
                </Route>
                <Route exact path="/Login/:name?">
                    <Login setMainView={this.props.setMainView}/>
                </Route>
                <Route exact path="/Join">
                    <Join setMainView={this.props.setMainView} />
                </Route>
                <Route exact path="/Admin:name?">
                    <Admin setMainView={this.props.setMainView} />
                </Route>

                {/*<Route exact path="/" component={Home}/>*/}
                {/*<Route path="/Reservation/:name?" component={Reservation}/>*/}
                {/*<Route path="/Notice/:name?" component={Notice}/>*/}
                {/*<Route path="/Tour/:name?" component={Tour}/>*/}
                {/*<Route path="/ShareBoard/:name?" component={ShareBoard}/>*/}
                {/*<Route path="/MyPage/:name?" component={MyPage}/>*/}
                {/*<Route path="/Login/:name?" component={Login}/>*/}
            </div>
        )
    }
}

export default Title;
