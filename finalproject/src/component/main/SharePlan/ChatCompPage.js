import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {actionType, URL} from "../../../redux/config";
import ChatRoomItem from './ChatRoomItem';
import store from "../../../redux/store";
import ChattingRoom from "./ChattingRoom";
import gsap, {Cubic, Quint} from "gsap";
import ChattingLogic from "../../../ChattingLogic";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class ChatCompPage extends Component {

    constructor(props) {
        super(props);
        console.log("ChatCompPage props", props);

        this.state = {
            roomList: props.chattingRoomListInfo,
            user2: '',
            selectedRoomNum: 0,
            selectedFriend: "",
            action: "",
        }

        store.subscribe(() => {
            if (store.getState().publishFunctionMsg == "setSelectedRoomNum") {

                this.setState({
                    selectedRoomNum: store.getState().selectedRoomNum,
                    selectedFriend: store.getState().selectedFriend,
                })

                // //release.
                // store.dispatch({
                //     type: actionType.publishFunctionMsg,
                //     publishFunctionMsg: "",
                // });
            }
        });

        store.subscribe(() => {
            if (store.getState().publishFunctionMsg == "changeChatAction") {
                this.setState({
                    action: "chattingRoom",
                });
            }
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createRoom() {
        if (this.state.user2.trim().length < 1) {
            return;
        }

        this.setState({
            action: "createRoom",
        });
        let chat = new ChattingLogic();
        chat.createRoom(this.state.user2, () => {
            store.dispatch({
                type: actionType.publishFunctionMsg,
                publishFunctionMsg: "chattingRoomListInfo",
            });
        });
    }

    render() {
        // console.log("ChatCompPage render()");
        return (
            <div className="containerRoot">
                <div className="container"
                     style={{
                         float: "left",
                     }}
                >
                    <h3>
                        <ArrowBackIcon
                            className="backButton"
                            onClick={() => {
                                let duration = 1.0;
                                let ease = Quint.easeInOut;
                                gsap.to("div.chatting div.chattingWindow", {
                                    transform: "scale(0.1)",
                                    opacity: 0,
                                    duration: duration,
                                    ease: ease,
                                });
                                store.dispatch({
                                    type: actionType.setChatWindow,
                                    isOpenChatWindow: false,
                                });
                            }}
                        />&nbsp;&nbsp;채팅방 List
                    </h3>
                    <div id="roomContainer" className="roomContainer">
                        <table className="inputTable">
                            <tbody>
                            <tr>
                                <th>받는 사람</th>
                                <th>
                                    <input type="text" name="user2"
                                           value={this.state.user2}
                                           onChange={this.handleChange.bind(this)}
                                           onKeyPress={(e) => {
                                               if (e.code == "Enter" || e.code == "NumpadEnter") {
                                                   this.createRoom();
                                                   this.setState({
                                                       user2: "",
                                                   });
                                               }
                                           }}
                                    />
                                </th>
                                <th>
                                    <button id="createRoom"
                                            onClick={this.createRoom.bind(this)}
                                    >방 만들기
                                    </button>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                        <hr style={{
                            // width:"90%",
                            color: "gray",
                            marginTop: "5px",
                            marginBottom: "10px",
                            marginLeft: "10px",
                            marginRight: "10px",
                        }}/>
                        <div id="roomList"
                             className="roomList"
                        >
                            {/*th는 추후 없애는걸로*/}
                            <table>
                                <tr>
                                    <th className='profileImg'></th>
                                    <th className='room'></th>
                                    <th className='go'>편집</th>
                                </tr>
                            </table>
                            {this.props.chattingRoomListInfo.map((row, idx) => {
                                let friend = "";
                                if (row.user1 == store.getState().loginId) {
                                    friend = row.user2;
                                } else {
                                    friend = row.user1;
                                }

                                return (
                                    <ChatRoomItem key={idx} row={row}
                                                  idx={idx} friend={friend}
                                    ></ChatRoomItem>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/*채팅방은 이미 하나가 안보이는곳에 떠있다.*/}
                {/*<ChattingRoom seletedRoomNum={store.getState().selectedRoomNum}/>*/}
                <ChattingRoom seletedRoomNum={this.state.selectedRoomNum}
                              selectedFriend={this.state.selectedFriend}
                />
            </div>
        )
    }
}

export default ChatCompPage;

