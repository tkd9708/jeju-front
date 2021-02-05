import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import ChatRoomItem from './ChatRoomItem';
import store from "../../../redux/store";
import ChattingRoom from "./ChattingRoom";
import gsap, {} from "gsap";

class ChatCompPage extends Component {

    state = {
        roomList: [],
        user2: '',
        selectedRoomNum: 0,
    }

    componentWillMount() {
        this.getRoom();
        this.createRoom();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getRoom() {
        // commonAjax('/getRoom', "", 'post', function(result){
        // 	createChatingRoom(result);
        // });
        let url = URL + "/getRoom";

        axios({
            method: 'get',
            url: URL + '/getRoom',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(res => {
            console.log("getRoom() res :", res);
            this.setState({
                roomList: res.data
            })
        }).catch(err => {
            console.log("getRoom() err :", err);
        });
    }

    createRoom() {
        let url = URL + "/createRoom";

        // axios({
        //     method: 'post',
        //     url: URL + '/createRoom',
        //     data: {roomName: this.state.roomName},
        //     headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        // })
        let user1 = store.getState().loginId;
        let user2 = this.state.user2;

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
                                    <th className='num'>프사</th>
                                    <th className='room'>받는 사람</th>
                                    <th className='go'>기능버튼</th>
                                </tr>
                            </table>
                            {/*test#############################################*/}
                            <table>{/* table 하나가 ChatRoomItem 이 되는것임. 나중에 코드 옮기기.*/}
                                <tr>
                                    <th className='num'
                                        onClick={() => {
                                            console.log("click th chatting.");
                                            // 나중엔 애니로 바꿀 계획
                                            // document.querySelector(".chattingWindow").scrollTo(900, 0);
                                            gsap.to(".containerRoot", {
                                                scrollTrigger: ".containerRoot",
                                                x: -500,
                                                duration:1,
                                            });
                                        }}
                                    >{1}</th>
                                    <th className='room'
                                        onClick={() => {
                                            console.log("click th chatting.");
                                            // 나중엔 애니로 바꿀 계획
                                            // document.querySelector(".chattingWindow").scrollTo(900, 0);
                                            gsap.to(".containerRoot", {
                                                scrollTrigger: ".containerRoot",
                                                x: -500,
                                                duration:1,
                                            });
                                        }}
                                    >{"3color"}</th>
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
                            {/*test#############################################*/}
                            {/*{this.state.roomList.map((row, idx) => (
                            <ChatRoomItem row={row} idx={idx}
                                          history={this.props.history}
                            ></ChatRoomItem>
                        ))}*/}
                        </div>
                    </div>
                </div>
                {/*document.querySelector(".chattingWindow").scrollTo(900,0)*/}
                {/*this.state.selectedRoomNumber로 state를 바꾸어 다시 render하게끔.*/}
                <ChattingRoom seletedRoomNum={this.state.selectedRoomNum}/>
            </div>
        )
    }
}

export default ChatCompPage;

