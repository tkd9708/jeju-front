import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import ChatRoomItem from './ChatRoomItem';
import store from "../../../redux/store";

class ChatCompPage extends Component {

    state={
        roomList: [],
        user2: ''
    }
    
    componentWillMount(){
        this.getRoom();
		this.createRoom();
    }
    
    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })    
    }

	getRoom(){
		// commonAjax('/getRoom', "", 'post', function(result){
		// 	createChatingRoom(result);
        // });
        let url = URL + "/getRoom";

        axios({
            method: 'get',
            url: URL + '/getRoom',
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(res=>{
            this.setState({
                roomList: res.data
            })
        }).catch(err=>{
            console.log("getRoom 오류 :" + err);
        })
	}
	
	createRoom(){
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
        .then(res=>{
            this.getRoom();
        }).catch(err=>{
            console.log("createRoom 오류 :" + err);
        })
	}



    
    render() {

        return (
            <div class="container">
                <h1>채팅방</h1>
                <div id="roomContainer" class="roomContainer">
                    <table id="roomList" class="roomList">
                        <tr>
                            <th class='num'>순서</th>
                            <th class='room'>받는 사람</th>
                            <th class='go'></th>
                        </tr>
                        {this.state.roomList.map((row, idx)=>(
                            <ChatRoomItem row={row} idx={idx} history={this.props.history}></ChatRoomItem>
                        ))}
                    </table>
                </div>
                <div>
                    <table class="inputTable">
                        <tr>
                            <th>받는 사람</th>
                            <th><input type="text" name="user2" value={this.state.user2} onChange={this.handleChange.bind(this)}/></th>
                            <th><button id="createRoom" onClick={this.createRoom.bind(this)}>방 만들기</button></th>
                        </tr>
                    </table>
                </div>
            </div>
        )
        
        
    }
}
export default ChatCompPage;

