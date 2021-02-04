import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {URL} from "../../../redux/config";
import TextField from '@material-ui/core/TextField';
import store from '../../../redux/store';
import { Button } from 'react-bootstrap';


class ScheduleAdd extends Component {

    constructor(props){
        super(props);

    }

    insertContent=()=>{
        let url=URL+"/wish/insertcontent";
        let memId=store.getState().loginId;
        let content=this.refs.content.value;
        let wishday=this.refs.wishday.value;
        let wishtime=this.refs.wishtime.value;

        if(wishday=='' || wishtime=='')
            alert("날짜와 시간을 모두 선택해주세요.");
        else{
            axios.post(url,{memId,content,wishday,wishtime})
            .then(res=>{
                this.refs.content.value='';
                this.refs.wishday.value='';
                this.refs.wishtime.value='';
            }).catch(err=>{
                console.log("schedulewish insert 오류 : " + err);
            })   
        }    
    }

    

    render(){
        const {row}=this.props;
        const {key}=this.props;
        return(
            <div>
                <h2 id="transition-modal-title">일정 추가</h2><br/>
                        <p id="transition-modal-description">
                            
                                    <span id="addtitle" >일정</span>
                                    <span id="addcontent">
                                    &nbsp;&nbsp;<input type="text" className="form-control" style={{width: '200px', height: '50px'}} ref="content"></input><br/><br/></span>

                                  
                                
                                    <span id="addschedule" >날짜</span>
                                    <span id="addwish">
                                    &nbsp;&nbsp;<input type="date" ref="wishday"></input><br/><br/>
                                    </span>
                            
                                
                                    <span id="addschedule">시간</span>
                                    <span id="addwish">
                                    &nbsp;&nbsp; <input type="time" ref="wishtime"></input></span></p><br/><br/>
                        <div style={{textAlign:'center'}}>
                        <Button variant="warning" onClick={this.insertContent.bind(this)}><b>추가</b></Button>
                        </div>
            </div>
        )
    }

}

export default ScheduleAdd;