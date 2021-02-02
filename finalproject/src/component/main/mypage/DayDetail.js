import React,{Component} from 'react';
import axios from 'axios';
import './style/RCA.css';
import {URL} from "../../../redux/config";
import Header from './Header';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


//import Subject from './Subject';

class DayDetail extends Component {
    

    constructor(props){
        super(props);

        this.state={
           list:'',
        //    open : false,
        //    setOpen : false
            
        };

    }

    // handleClose = () => {
    //     this.setState({
    //         open: false
    //     })
    //   };
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
            // console.log(res.data);
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
            ?<div>🍔{aroundId}</div>:content.split(",")[0]==="숙박"?<div>🛌{aroundId}</div>:<div>☕{aroundId}</div>
            :'';
        var share = shareNum!=null?<div>👨‍🍳{this.state.list}</div>:'';
        var spot = spotId!=null?<div>🛕{this.state.list}</div>:'';
        var myTodo = (aroundId==null&&shareNum==null&&spotId==null)?<div>📅{content}</div>:'';
        var tag = aroundId!==null?around:shareNum!==null?share:spotId!==null?spot:myTodo;
        
        return (
            <div>

                {tag}
            </div>
        );
    }
}

export default DayDetail;