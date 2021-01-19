import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import React, { useEffect } from "react";

export const actionType = {
    setMainView: "setMainView",
    setSpotView: "setSpotView",
    SIGN_UP: "SIGN_UP",
    LOG_IN: "LOG_IN",
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    MEMBER_LIST: "MEMBER_LIST", // 회원 리스트 요청 시작
    MB_LIST_S: "MB_LIST_S", // 회원 리스트 요청 성공
    MB_LIST_F: "MB_LIST_F", // 회원 리스트 요청 실패
}

// export const memberList = () => {
//     return (dispatch)
// }

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
}
