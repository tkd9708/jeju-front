import {createStore} from "redux";
import {actionType, mainViewType} from "./config";

export default createStore(
    function (state, action) {

        //state 초기화.
        if (state === undefined) {
            return {
                mainView: mainViewType.MainPage,
                logged: false
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
        else if (action.type === actionType.Singup) {
            
            newState = Object.assign({}, state, {
                mainView: action.mainView,
            });
        }
        else if (action.type === actionType.login) {
            newState = Object.assign({}, state, {
                
            });
        }
        else if (action.type === actionType.loginRequest) {
            newState = Object.assign({}, state, {

            });
        }
        else if (action.type === actionType.loginSuccess) {
            newState = Object.assign({}, state, {

            });
        }
        else if (action.type === actionType.loginFailure) {
            newState = Object.assign({}, state, {

            });
        }
        

        console.log("reducer()", state, action, newState);
        return newState;
    }
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

