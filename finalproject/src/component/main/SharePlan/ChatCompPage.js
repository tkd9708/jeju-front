import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {actionType, URL} from "../../../redux/config";
import ChatRoomItem from './ChatRoomItem';
import store from "../../../redux/store";
import ChattingRoom from "./ChattingRoom";
import gsap, {Cubic, Quint} from "gsap";
import ChattingLogic from "../../../ChattingLogic";

class ChatCompPage extends Component {

    constructor(props) {
        super(props);

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

        store.subscribe(()=>{
           if(store.getState().publishFunctionMsg == "changeChatAction"){
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

        return (
            <div className="containerRoot">
                <div className="container"
                     style={{
                         float: "left",
                     }}
                >
                    <h3>채팅방 List</h3>
                    <div id="roomContainer" className="roomContainer">
                        <table className="inputTable">
                            <tr>
                                <th>받는 사람</th>
                                <th>
                                    <input type="text" name="user2"
                                           value={this.state.user2}
                                           onChange={this.handleChange.bind(this)}
                                    />
                                </th>
                                <th>
                                    <button id="createRoom"
                                            onClick={this.createRoom.bind(this)}
                                    >방 만들기
                                    </button>
                                </th>
                            </tr>
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
                                    <th className='profileImg'>프사</th>
                                    <th className='room'>받는 사람</th>
                                    <th className='go'>기능버튼</th>
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

