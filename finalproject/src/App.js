import React, {Component} from "react";
import MainComp from "./component/main/MainComp";
import FooterComp from "./component/footer/FooterComp";
import HeaderComp from "./component/header/HeaderComp";
import {
    BrowserRouter
} from "react-router-dom";
import styled from "styled-components";
import Menu from "./component/header/Menu";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: "header_comp",
            mainview: "mainpage",
            footer: "footer_comp",
            logged: false,
            onLogin: this.onLogin,
            onLogout: this.onLogout
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

    render() {
        const {logged, onLogout} = this.state;

        return (
            <div>
                <BrowserRouter>
<<<<<<< HEAD
                    {/* <HeaderComp></HeaderComp>
                    <MainComp></MainComp> */}

                    <HeaderComp name={this.state.header}
                                setMainView={this.setMainView}
                                logged = { logged }
                                onLogout = { onLogout }
=======
                    <Menu logged={logged}
                          onLogout={onLogout}
                          type="hide"
                    />
                    <HeaderComp logged={logged}
                                onLogout={onLogout}
>>>>>>> ad3a89bec5596b5e5dba33da18e6e4775eab9d35
                    />
                    <MainComp
                    />
                </BrowserRouter>
                <FooterComp/>
            </div>
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
