import React, {Component} from "react";
import {NavLink, Route} from "react-router-dom";
import store from "../../../redux/store";
import {actionType, mainViewType} from "../../../redux/config";
import TourList from '../../header/menus/TourList';

class HotPlaceComp extends Component {
    constructor(props) {
        super(props);

    }

    setMainView = (mainView) => {
        console.log("HotPlaceComp setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            mainView: mainView
        });
    }

    render() {
        return (
            <div className="hotPlaceComp">
                hotPlaceComp
                <br/>
                {this.props.name}<br/>
                <NavLink exact to="/tourlist/jeju"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >제주</NavLink>
                <NavLink exact to="/tourlist/jocheon"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >조천</NavLink>
                <NavLink exact to="/tourlist/gujwa"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >구좌</NavLink>
                <NavLink exact to="/tourlist/sungsan"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >성산</NavLink>
                <NavLink exact to="/tourlist/namwon"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >남원</NavLink>
                <NavLink exact to="/tourlist/seogwipo"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >서귀포</NavLink>
                        <br/>
                <NavLink exact to="/tourlist/andeok"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >안덕</NavLink>
                <NavLink exact to="/tourlist/daejung"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >대정</NavLink>
                <NavLink exact to="/tourlist/hangyeong"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >한경</NavLink>
                <NavLink exact to="/tourlist/hanrim"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >한림</NavLink>
                <NavLink exact to="/tourlist/aewol"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >애월</NavLink>
                <NavLink exact to="/tourlist/udo"
                                 onClick={() => {
                                     console.log("TourList NavLink onClick");
                                     this.setMainView(mainViewType.TourList);
                                 }}
                        >우도</NavLink>
                        <br/>

                {/*<a href="#HotPlaceComp">{this.props.name}</a>*/}

                {/* <a href="/Tour/jeju">제주</a> */}
                {/* <a href="#jocheon">조천</a>
                <a href="#gujwa">구좌</a>
                <a href="#sungsan">성산</a>
                <a href="#pyoseon">표선</a>
                <a href="#namwon">남원</a>
                <a href="#seogwipo">서귀포</a><br/>
                <a href="#andeok">안덕</a>
                <a href="#daejung">대정</a>
                <a href="#hangyeong">한경</a>
                <a href="#hanrim">한림</a>
                <a href="#aewol">애월</a>
                <a href="#udo">우도</a><br/><br/> */}

            </div>
        )
    }

}

export default HotPlaceComp;
