import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {actionType, URL} from "../../../redux/config";
import {withRouter} from "react-router-dom";
import gsap, {Quint, TweenMax} from "gsap";
import profileImg_temp from "../../../image/noProfile.png";
import store from "../../../redux/store";
import ChattingLogic from "../../../ChattingLogic";

class ChatRoomItem extends Component {

    constructor(props) {
        super(props);
        console.log("ChatRoomItem props", props);

        this.state = {
            friend: this.props.friend,
            num: this.props.row.num,
        }
    }

    onClickChattingRoom = (row) => {
        console.log(row);
        /*let chat = new ChattingLogic();
        let unsubscribe = store.subscribe(() => {
            if (store.getState().publishFunctionMsg == "setSelectedRoomNum") {
                chat.getMsgList((res) => {
                    console.log("click th chatting.", res);
                    gsap.to(".containerRoot", {
                        scrollTrigger: ".containerRoot",
                        x: -500,
                        duration: 1,
                        ease: Quint.easeInOut,
                    });
                });

                // //release.
                // store.dispatch({
                //     type: actionType.publishFunctionMsg,
                //     publishFunctionMsg: "",
                // });

                unsubscribe();
            }
        });*/
        gsap.to(".containerRoot", {
            scrollTrigger: ".containerRoot",
            x: -500,
            duration: 1,
            ease: Quint.easeInOut,
        });

        window.setTimeout(()=>{
            //div.container div#chattingBoard
            let chattingBoard = document.getElementById("chattingBoard");
            console.log("setScrollBottom()", chattingBoard);

            if (chattingBoard) {
                chattingBoard.scrollTo(0, chattingBoard.scrollHeight);
            }
        },500);

        store.dispatch({
            type: actionType.setSelectedRoomNum,
            selectedRoomNum: Number(row.num),
            selectedFriend: this.state.friend,
        });

        store.dispatch({
            type: actionType.publishFunctionMsg,
            publishFunctionMsg: "setSelectedRoomNum",
        });

        store.dispatch({
            type: actionType.publishFunctionMsg,
            publishFunctionMsg: "changeChatAction",
        });
    }

    render() {
        const {row, idx} = this.props;
        let profileImg = profileImg_temp;

        return (
            <table>
                <tr>
                    <th className='profileImg'
                        onClick={this.onClickChattingRoom.bind(this, row)}
                    >
                        <img src={profileImg} className="profileImg"/>
                    </th>
                    <th className='room'
                        onClick={this.onClickChattingRoom.bind(this, row)}
                    >{this.props.friend}</th>
                    <th className='go'>
                        <button type='button' onClick={
                            () => {
                                console.log("click button chatting.");
                                // url은 유지한 채로 채팅 창 내 변화만 허용.
                                // tr 전체를 눌렀을때 채팅방 이동.
                                // this.props.history.push('/chattingroom/' + row.num);
                            }
                        }>버튼
                        </button>
                    </th>
                </tr>
            </table>
        )


    }
}

export default withRouter(ChatRoomItem);

