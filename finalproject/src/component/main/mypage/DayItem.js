import React,{Component} from 'react';
import {FaUtensils,FaMugHot,FaHotel,FaHamburger} from 'react-icons/fa';
import moment from 'moment';
import './style/RCA.css';

class DayItem extends Component {

    constructor(props){
        super(props);

    }

    // componentWillUnmount(){
    //     console.log("Day Item willmount");
    // }


    render() {
        
        const {row} = this.props;
        var dayInfo = this.props.dayInfo;
        var selectDay = new Date(dayInfo.getYear, dayInfo.getMonth-1, dayInfo.getDay);
        var y = row.wishday.substr(0, 4);
        var m = row.wishday.substr(5, 2);
        var d = row.wishday.substr(8, 2);

        var today = new Date(y, m-1, d);
        var betweenDay = selectDay.getTime() - today.getTime();  // 이게 0이여야 해당하는 날짜랑 wishday랑 맞는거에요!
        var tag = betweenDay==0?
        <div>
            {/* <div className="category">{wishday===day &&category==='카페'?<FaMugHot></FaMugHot>:
                    wishday===day &&category==='숙박'?<FaHotel></FaHotel>:wishday===day &&category==='음식점'?
                <FaHamburger></FaHamburger>:''}</div> */}
            <div className="title">
                {row.memId}<br/>
                {row.content}<br/>
                gg<br/>
                gg
                </div> 
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