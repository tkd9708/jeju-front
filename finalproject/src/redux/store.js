import {applyMiddleware, compose, createStore} from "redux";
import {actionType, mainViewType} from "./config";

import thunk from "redux-thunk";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(
    function (state, action) {

        //state 초기화.
        if (state === undefined) {
            return {
                mainView: mainViewType.MainPage,
                spotView: '',
                logged: false,
                memberData: [], // 회원목록
            }
        }

        // state 불변성 유지해야함. immutability
        // newState 새로 파서 기존꺼 + 변경할거 넣은다음 redux의 state 바꿔치기.
        let newState = {};

        //action.type 별로 로직처리 다르게 하기.
        if (action.type === actionType.setMainView) {

            newState = Object.assign({}, state, {
                mainView: action.mainView,
            });
        }
        else if (action.type === actionType.setSpotView) {
            newState = Object.assign({}, state, {
                spotView: action.spotView
            });
        }
        else if (action.type === actionType.SIGN_UP) {
            
            newState = Object.assign({}, state, {
                mainView: action.mainView,
            });
        }
        else if (action.type === actionType.LOG_IN) {
            newState = Object.assign({}, state, {
                
            });
        }
        else if (action.type === actionType.LOGIN_REQUEST) {
            newState = Object.assign({}, state, {

            });
        }
        else if (action.type === actionType.LOGIN_SUCCESS) {
            newState = Object.assign({}, state, {
                logged: true,
                id: action.type.id,
            });
        }
        else if (action.type === actionType.LOGIN_FAILURE) {
            newState = Object.assign({}, state, {
                logged: false,
                id: "",
            });
        }
        else if (action.type === actionType.MEMBER_LIST) {



            newState = Object.assign({}, state, {
                memberData: action.payload
            });

        }
        
        console.log("reducer()", state, action, newState);
        return newState;
    }
    // , composeEnhancers(applyMiddleware(thunk))
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

