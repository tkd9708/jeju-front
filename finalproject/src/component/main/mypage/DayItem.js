import React,{Component} from 'react';
import {FaUtensils,FaMugHot,FaHotel,FaHamburger} from 'react-icons/fa';
import moment from 'moment';
import axios from 'axios';
import './style/RCA.css';
//import Subject from './Subject';

class DayItem extends Component {

    constructor(props){
        super(props);

        this.state={
            sharelist:[],
            spotlist:[]
        };

    }

    getShare=()=>{
        let url=URL+"/wish/sharesubject?num="+this.props.row.shareNum;
        axios.get(url)
        .then(res=>{
            this.setState({
                sharelist:res.data
            });
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }

    componentDidMount(){
        this.getShare();
    }

    // componentWillUnmount(){
    //     console.log("Day Item willmount");
    // }

    // spot(){
    //     let url = URL + "/spot/select?contentsid=" + this.props.row.spotId;
    // }

    render() {
        
        const {row} = this.props;
        
        var dayInfo = this.props.dayInfo;
        var selectDay = new Date(dayInfo.getYear, dayInfo.getMonth-1, dayInfo.getDay);
        var wishday=""+row.wishday;
        var y = wishday.substr(0,4);
        var m = wishday.substr(5,2);
        var d = wishday.substr(8,2);
        var aroundId=row.aroundId;
        var category=row.content;
        var shareNum=row.shareNum;
        var subject=this.state.sharelist.subject;
        var today = new Date(y, m-1, d);
        var betweenDay = selectDay.getTime() - today.getTime();  // 이게 0이여야 해당하는 날짜랑 wishday랑 맞는거에요!
        var tag = betweenDay==0?
        <div>
            {/* <div className="category">{wishday===day &&category==='카페'?<FaMugHot></FaMugHot>:
                    wishday===day &&category==='숙박'?<FaHotel></FaHotel>:wishday===day &&category==='음식점'?
                <FaHamburger></FaHamburger>:''}</div> */}
                {aroundId!==null?category.split(",")[0]==="음식점"
                ?<FaHamburger></FaHamburger>:category.split(",")[0]==="숙박"?
                <FaHotel></FaHotel>:<FaMugHot></FaMugHot>:''}{aroundId}
               {shareNum!==null?subject:''}
            <div className="title">
                
                

                
                </div>
                <br/>
                 
        </div>
        :"";

        return (
            <div>
                {tag}
            </div>
        );
    }
}

export default DayItem;