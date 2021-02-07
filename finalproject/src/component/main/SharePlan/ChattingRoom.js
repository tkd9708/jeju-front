import React, {Component, useState, useEffect} from "react";
import './Chat.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import {withRouter } from "react-router-dom";
import store from "../../../redux/store";

const ChattingRoom=({match})=>{
    const [roomNum, setRoomNum] = useState(match.params.num);
    const [sessionId, setSessionId] = useState('');
    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([]);

    useEffect(() => {
        
        wsOpen();
    });

    const handleChange=(e)=>{
        setMsg(e.target.value); 
    }

	var ws;

        function wsOpen(){
            //웹소켓 전송시 현재 방의 번호를 넘겨서 보낸다.
            ws = new WebSocket("ws://localhost:9002/chating/"+ roomNum);
            
            wsEvt();
        }
            
        function wsEvt() {
            ws.onopen = function(data){
                //소켓이 열리면 동작
            }
            
            ws.onmessage = function(data) {
                //메시지를 받으면 동작
                var msg = data.data;
                if(msg != null && msg.trim() != ''){
                    var d = JSON.parse(msg);
                    if(d.type == "getId"){
                        var si = d.sessionId != null ? d.sessionId : "";
                        // console.log(d.sessionId);
                        if(si != ''){
                            setSessionId(si);
                        }
                    }else if(d.type == "message"){
    
                        console.log(d);
    
                        var listEl = document.getElementById('chattingBoard');
                        var fragment = document.createDocumentFragment();
                        var el = document.createElement('p');
                        var itemStr = '';
                        if(d.sessionId == sessionId){
                            itemStr= "<span>나 :" + d.msg + "</span>";
                            el.innerHTML = itemStr;
                            el.className='me';
                        }else{
                            itemStr = "<span>" + d.userName + " :" + d.msg + "</span>";
                            el.innerHTML = itemStr;
                            el.className='others';
                        }
                        fragment.appendChild(el);
                        listEl.appendChild(fragment);
                            
                    }else{
                        console.warn("unknown type!")
                    }
                }
            }
    
            document.addEventListener("keypress", function(e){
                if(e.keyCode == 13){ //enter press
                    this.send();
                }
            });
        }
    
    
        function send() {
            var option ={
                type: "message",
                roomNum: roomNum,
                sessionId : sessionId,
                userName : store.getState().loginId,
                msg : msg
            }
            ws.onopen=()=>ws.send(JSON.stringify(option))
            setMsg('');
        }
    
    return (
        <div id="container" class="container">
            <h1>채팅방</h1>
            <input type="hidden" id="sessionId" value={sessionId}/>
            <input type="hidden" id="roomNum" value={roomNum}/>
            
            <div id="chattingBoard" class="chatting">
                
            </div>
            
            <div id="yourMsg">
                <table class="inputTable">
                    <tr>
                        <th>메시지</th>
                        <th><input id="chatting" name="msg" value={msg} placeholder="보내실 메시지를 입력하세요." onChange={handleChange}/></th>
                        <th><button onClick={send} id="sendBtn">보내기</button></th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ChattingRoom;

