import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Tour, Admin} from './menu';
// import Menu from "./components/Header";
// import Root from './Root';


class Title extends Component {

    constructor(props) {
        super(props);
        console.log("Title constructor ", this.props)
    }

    render() {
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
                        <NavLink exact to="/Login">Login</NavLink>
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
