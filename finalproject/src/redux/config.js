import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import React, { useEffect } from "react";
import {  } from "../component/main/admin/MemberListPageComp";

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

// useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용할수있게 해주는 Hook이다
const dispatch = useDispatch();
// 각 액션을 dispatch 하는 함수


// export const memberList = () => async dispatch => {
//     dispatch({ type: MEMBER_LIST }); // 요청이 시작됨
//     try {
//         const 
//     }
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
