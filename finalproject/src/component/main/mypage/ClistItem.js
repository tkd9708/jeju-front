import React,{Component} from 'react';
import './style/RCA.css';
import {URL} from "../../../redux/config";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import store from '../../../redux/store';
import {  FcCollaboration } from "react-icons/fc";
import { Button } from 'react-bootstrap';
import moment from 'moment';

class ClistItem extends Component {

    constructor(props){
        super(props);

        

    }

    
    onDelete=()=>{
        let url=URL+"/wish/delete?num="+this.props.row.num;
        
        console.log(this.props.row.num); 
        
        axios.get(url)
        .then(res=>{
          window.location.reload()

        }).catch(err=>{
          console.log("삭제시 오류:"+err);
        });
       }

       onData=()=>{
           let url= URL+"/plan/insert";
           let memId=store.getState().loginId;
           let title=this.props.row.title;
           let content=this.props.row.addr;
           let wishday=this.props.row.wishday;
           let wishtime=this.props.row.wishtime;

           axios.post(url,{memId,title,content,wishday,wishtime})
           .then(res=>{
                //this.props.history.push("/shareplan");
           }).catch(err=>{
            console.log("shareplan insert 오류 : " + err);
           })

       }

    render() {
        
        const {row} = this.props;
        
        return (
            <div>
                {
                    row.content==="spot"?<div>🛕{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}
                     <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button></div>:
                    row.content==="myplan"?<div>📅{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}
                    <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button></div>:
                    row.content==="share"?<div>👨‍🍳{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}
                    <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button></div>:
                    row.content.split(",")[0]==="카페"?<div>☕{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}
                    <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button></div>:
                    row.content.split(",")[0]==="음식점"?<div>🍔{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}
                    <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button></div>:
                    row.content.split(",")[0]==="숙박"?<div>🛌{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}
                    <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button></div>:''
                }
            </div>
        );
    }
}


export default ClistItem;