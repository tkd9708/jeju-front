import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import ChatRoomItem from './ChatRoomItem';
import store from "../../../redux/store";
import ChattingRoom from "./ChattingRoom";
import gsap, {Cubic, Quint} from "gsap";

class ChatCompPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roomList: [],
            user2: '',
            selectedRoomNum: 0,
        }

        store.subscribe(() => {
            if (store.getState().loginId != null && store.getState().loginId != ""){
                //로그인 된 상태에만.
                this.getRoom();
            }
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getRoom() {
        let url = URL + "/chat/getRoom" +
            "?user=" + store.getState().loginId;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("getRoom() res :", res);
            this.setState({
                roomList: res.data
            })
        }).catch(err => {
            console.log("getRoom() err :", err);
        });
    }

    createRoom() {
        let url = URL + "/chat/createRoom";
        let user1 = store.getState().loginId;
        let user2 = this.state.user2;

        console.log(url);

        axios.post(url, {user1, user2})
            .then(res => {
                console.log("createRoom() res :", res);
                this.getRoom();
            })
            .catch(err => {
                console.log("createRoom() err :", err);
            });
    }

    render() {
        let seletedRoomNum = 0;
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
                            {this.state.roomList.map((row, idx) => {
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
                <ChattingRoom seletedRoomNum={store.getState().chat.selectedRoomNum}/>
            </div>
        )
    }
}

export default ChatCompPage;

