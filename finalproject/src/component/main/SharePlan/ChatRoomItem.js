import React, {Component} from "react";
import './Chat.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import {withRouter } from "react-router-dom";

class ChatRoomItem extends Component {

    
    render() {
        const {row, idx} = this.props;
        // var roomName = row.roomName.trim();

        return (
            <tr>
				<td class='num'>{idx + 1}</td>
				<td class='room'>{row.user2}</td>
				<td class='go'><button type='button' onClick={
                    ()=>{
                        this.props.history.push('/chattingroom/' + row.num);
                    }
                }>참여</button></td>
			</tr>
        )
        
        
    }
}
export default withRouter(ChatRoomItem);

