import React,{Component} from 'react';
import './style/RCA.css';
import {URL} from "../../../redux/config";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import store from '../../../redux/store';

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

    //    onWishCount=()=>{
    //        let url=URL+"/wish/wishcount?memId="+store.getState().loginId + "&wishday="+this.props.row.wishday;
    //        console.log(this.props.row.wishday);
    //        axios.get(url)
          
    //        .then(res=>{

    //        }).catch(err=>{
    //            console.log("출력 오류:"+err);
    //        });
    //    }

    render() {
        
        const {row} = this.props;
        
        return (
            <div>
                {
                    row.content==="spot"?<div>🗼{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}</div>:
                    row.content==="myplan"?<div>🌳{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}</div>:
                    row.content==="share"?<div>✔{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}</div>:
                    row.content.split(",")[0]==="카페"?<div>☕{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}</div>:
                    row.content.split(",")[0]==="음식점"?<div>🍽{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}</div>:
                    row.content.split(",")[0]==="숙박"?<div>🏟{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>{row.wishtime}</div>:''
                }
            </div>
        );
    }
}


export default ClistItem;