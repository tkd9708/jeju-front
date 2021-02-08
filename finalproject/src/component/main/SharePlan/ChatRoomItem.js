import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {actionType, URL} from "../../../redux/config";
import {withRouter} from "react-router-dom";
import gsap, {Quint} from "gsap";
import profileImg_temp from "../../../image/noProfile.png";
import store from "../../../redux/store";

class ChatRoomItem extends Component {

    constructor(props) {
        super(props);
        console.log("ChatRoomItem props", props);
    }

    render() {
        const {row, idx} = this.props;
        let profileImg = profileImg_temp;

        return (
            <table>
                <tr>
                    <th className='profileImg'
                        onClick={() => {
                            console.log("click th chatting.");
                            gsap.to(".containerRoot", {
                                scrollTrigger: ".containerRoot",
                                x: -500,
                                duration: 1,
                                ease: Quint.easeInOut,
                            });
                            store.dispatch({
                                type: actionType.setSelectedRoomNum,
                                selectedRoomNum: Number(row.num),
                            });
                        }}
                    >
                        <img src={profileImg} className="profileImg"/>
                    </th>
                    <th className='room'
                        onClick={() => {
                            console.log("click th chatting.");
                            gsap.to(".containerRoot", {
                                scrollTrigger: ".containerRoot",
                                x: -500,
                                duration: 1,
                                ease: Quint.easeInOut,
                            });
                            store.dispatch({
                                type: actionType.setSelectedRoomNum,
                                selectedRoomNum: Number(row.num),
                            });
                        }}
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

