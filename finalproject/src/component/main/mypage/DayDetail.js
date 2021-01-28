import React,{Component} from 'react';

import moment from 'moment';
import axios from 'axios';
import './style/RCA.css';
import {URL} from "../../../redux/config";
import { FcRating,FcBookmark,FcCheckmark } from "react-icons/fc";

//import Subject from './Subject';

class DayDetail extends Component {
    

    constructor(props){
        super(props);

        this.state={
           list:''
            
        };

    }
    // rendervalue=()=>{
    //     return this.props.row.shareNum===null?0:'';
    // }

    getShare=()=>{
        let url=URL+"/wish/sharesubject?num="+ this.props.row.shareNum;
        axios.get(url)
        .then(res=>{
            this.setState({
                list:res.data
            });
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }

    getSpot=()=>{
        let url=URL+"/wish/spottitle?contentsid="+ this.props.row.spotId;
        axios.get(url)
        .then(res=>{
            console.log(res.data);
            this.setState({
                list:res.data
            });
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }    

    componentDidMount(){
        if(this.props.row.shareNum!==null){
            this.getShare();
            // this.setState({
            //     sharelist:this.state.list
            // })
        }
        else if(this.props.row.spotId!==null){
            this.getSpot();
            // this.setState({
            //     spotlist:this.state.list
            // })
        }
        
            
    }


    render() {
        
        const {row} = this.props;
        
        var aroundId=row.aroundId;
        var content=row.content;
        var shareNum=row.shareNum;
        var spotId=row.spotId;
        
      
        var around = aroundId!==null?content.split(",")[0]==="음식점"
            ?<div>🍽{aroundId}</div>:content.split(",")[0]==="숙박"?<div>🏟{aroundId}</div>:<div>☕{aroundId}</div>
            :'';
        var share = shareNum!=null?<div>✔{this.state.list}</div>:'';
        var spot = spotId!=null?<div>🗼{this.state.list}</div>:'';
        var myTodo = (aroundId==null&&shareNum==null&&spotId==null)?<div>🌳{content}</div>:'';
        var tag = aroundId!==null?around:shareNum!==null?share:spotId!==null?spot:myTodo;

        return (
            <div>
            {/* <div className="category">{wishday===day &&category==='카페'?<FaMugHot></FaMugHot>:
                    wishday===day &&category==='숙박'?<FaHotel></FaHotel>:wishday===day &&category==='음식점'?
                <FaHamburger></FaHamburger>:''}</div> */}
                {/* {aroundId!==null?content.split(",")[0]==="음식점"
                ?<FaHamburger></FaHamburger>:content.split(",")[0]==="숙박"?
                <FaHotel></FaHotel>:<FaMugHot></FaMugHot>:''}{aroundId}
                {shareNum!==null?<FcRating></FcRating>:''}
                {spotId!==null?<FcBookmark></FcBookmark>:''}
                {this.state.list} */}
                {/* <br/><FcCheckmark></FcCheckmark> */}
                {/* {shareNum===null&&aroundId===null&&spotId===null?'🌳':''}
                {content} */}
                {tag}
                {/* {this.state.list.map((row,idx)=>(
                <DaySubject row={row} key={idx}></DaySubject>
                
                 ))} */}
                
            {/* <div className="title">
               <div>
               {subject}
                </div>
                <br/>
              </div>   */}
                 
            </div>
        );
    }
}

export default DayDetail;