import React, {Component} from "react";
import {NavLink, Route} from "react-router-dom";
import store from "../../../redux/store";
import {actionType, mainViewType} from "../../../redux/config";
import Tour from '../../header/menus/Tour';

class ViewspotComp extends Component {
    constructor(props) {
        super(props);

    }

    setMainView = (mainView) => {
        console.log("ViewspotComp setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            mainView: mainView
        });
    }

    render() {
        return (
            <div>
                <br/>
                {this.props.name}<br/>
                <NavLink exact to="/Tour/jeju"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >제주</NavLink>
                <NavLink exact to="/Tour/jocheon"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >조천</NavLink>
                <NavLink exact to="/Tour/gujwa"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >구좌</NavLink>
                <NavLink exact to="/Tour/sungsan"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >성산</NavLink>
                <NavLink exact to="/Tour/namwon"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >남원</NavLink>
                <NavLink exact to="/Tour/seogwipo"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >서귀포</NavLink>
                        <br/>
                <NavLink exact to="/Tour/andeok"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >안덕</NavLink>
                <NavLink exact to="/Tour/daejung"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >대정</NavLink>
                <NavLink exact to="/Tour/hangyeong"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >한경</NavLink>
                <NavLink exact to="/Tour/hanrim"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >한림</NavLink>
                <NavLink exact to="/Tour/aewol"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >애월</NavLink>
                <NavLink exact to="/Tour/udo"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >우도</NavLink>
                        <br/>

                {/*<a href="#ViewspotComp">{this.props.name}</a>*/}
                
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

export default ViewspotComp;
