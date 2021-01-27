import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import React, {useEffect} from "react";
import {} from "../component/main/admin/MemberListPageComp";


// export const URL = "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot2/";
 export const URL = "http://localhost:9002";

export const actionType = {
    setMainView: "setMainView",
    SIGN_UP: "SIGN_UP",
    LOG_IN: "LOG_IN",
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    MEMBER_LIST: "MEMBER_LIST", // 회원 리스트 요청 시작
    MB_LIST_S: "MB_LIST_S", // 회원 리스트 요청 성공
    MB_LIST_F: "MB_LIST_F", // 회원 리스트 요청 실패
    shareBoardUpdate: "shareBoardUpdate",
    tourPage: "tourpage"
}

export const mainViewType = {
    MainPage: "mainPage",
    Home: "home",
    Login: "login",
    Logout: "Logout",
    MyPage: "myPage",
    Notice: "notice",
    Reservation: "reservation",
    ShareBoard: "shareBoard",
    Tour: "tour",
    TourList: "tourList",
    Admin: "admin",
    JoinForm: "joinForm",
    SearchResult: "searchResult",
}
