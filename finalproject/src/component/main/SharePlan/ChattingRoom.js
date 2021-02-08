import React, {Component, useState, useEffect} from "react";
import './Chat.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import {withRouter} from "react-router-dom";
import store from "../../../redux/store";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import gsap, {Quint} from "gsap";
import noProfile from "../../../image/noProfile.png";

const ChattingRoom = (props) => {
    console.log("ChattingRoom props", props);
    const [roomNum, setRoomNum] = useState(props.seletedRoomNum);
    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([]);

    window.setTimeout(()=>{
        if(store.getState().chat.isOpenChatWindow){
            //채팅창이 열려있다면,

        }
    })

    // useEffect(() => {
    //
    // }, []);

    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const getMsgList = () => {
        let url = URL + "/chat/getMsgs" +
            "?roomNum" + roomNum;

        console.log(url);

        axios.get(url)
            .then(res => {
                console.log(res);
                setMsgList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div id="container"
             class="container"
             style={{
                 float: "right",
             }}
        >
            <h3>
                <ArrowBackIcon
                    className="backButton"
                    onClick={() => {
                        // document.querySelector(".chattingWindow").scrollTo(0,0);
                        gsap.to(".containerRoot", {
                            scrollTrigger: ".containerRoot",
                            x: 0,
                            duration: 1,
                            ease: Quint.easeInOut,
                        });
                    }}
                />&nbsp;&nbsp;{}
            </h3>


            {/*<input type="hidden" id="sessionId" value={sessionId}/>*/}
            <input type="hidden" id="roomNum" value={roomNum}/>

            <div id="chattingBoard" class="chatting">
                <div className="otherMsg formMsg">
                    <table>
                        <tr>
                            <td rowSpan={2} valign={"top"}>
                                <img src={noProfile} className="profileImg"/>
                            </td>
                            <td>
                                <b>name</b>
                            </td>
                            <td rowSpan={2} valign={"bottom"}>
                                &nbsp;<b>99:88</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="msgText">
                                    <b>
                                        sdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                    </b>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="myMsg formMsg">
                    <table>
                        <tr style={{width: "100%"}}>
                            <td valign={"bottom"} align={"right"}>
                                <b style={{color: "yellow"}}
                                >1</b>&nbsp;
                                <br/>
                                <b>99:88</b>&nbsp;
                            </td>
                            <td valign={"bottom"} align={"right"} style={{width: "70%"}}>
                                <div className="msgText" align={"left"}>
                                    <b>
                                        sdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                        asdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdf
                                    </b>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div id="yourMsg">
                <table class="inputTable">
                    <tr style={{
                        width: "100%"
                    }}>
                        <th style={{
                            width: "80%"
                        }}>
                            <input id="chatting" name="msg"
                                   value={msg} placeholder="보내실 메시지를 입력하세요."
                                   onChange={handleChange}
                                   style={{
                                       width: "100%",
                                       height: "40px",
                                   }}
                            />
                        </th>
                        <th style={{
                            width: "20%"
                        }}>
                            <button onClick=""
                                    id="sendBtn"
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                    }}
                            >보내기
                            </button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ChattingRoom;

