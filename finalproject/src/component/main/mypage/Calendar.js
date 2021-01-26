import React, { Component } from 'react'
import moment from 'moment';
import {FaUtensils,FaMugHot,FaHotel,FaHamburger} from 'react-icons/fa';
import axios from 'axios';
import {URL} from "../../../redux/config";

class DateHeader extends Component {

  dateToArray = (dates) => {
    if (Array.isArray(dates)) {
      return dates
    } else if (typeof dates === "string") {
      return dates.split(',')
    } else {
      return ["일", "월", "화", "수", "목", "금", "토"]
    }
  }

  mapArrayToDate = (dateArray) => {
    try {
      if (dateArray.length !== 7) {
        console.log(new Error("dates props must be had 7 date"))
        dateArray = ["일", "월", "화", "수", "목", "금", "토"]
      }

      return dateArray.map((date, index) => {
        const className = () => {
          let className = "RCA-calendar-date-component";
          if (index === 0) {
            return className + " date-sun"
          } else if (index === 6) {
            return className + " date-sat"
          } else {
            return className + " date-weekday"
          }
        }
        return (
          <div className={className()} key={"RCA-header-" + date}>
            {date}
            
          </div>
        )
      })
    } catch{
      throw new Error("date must be string or component")
    }
  }

  render() {
    return (
      <div className="RCA-calendar-date-header">
        {this.mapArrayToDate(this.dateToArray(this.props.dates))}
        
      </div>
    )
  }
}

class Week extends Component {


  constructor(props){
    super(props);

    this.ym = this.props.ymOfThisCalendar;
    this.state={
      // memId:'',
      // spotId:'',
      // shareNum:'',
      // aroundId:'',
      // content:'',
      // wishday:'',
      // title:'',
      // subject:'',
      // category:''
       list:[]
    };
  }

  getData=async()=>{
     let url=URL+'/wish/list?memId=regegw';
    axios.get(url)
    .then(response=>{
      //console.log("캘린더 출력 : " + response.data.memId); 
      this.setState({
        list: response.data.list
        // memId:response.data.memId,
        // spotId:response.data.spotId,
        // shareNum:response.data.shareNum,
        // content:response.data.content,
        // wishday:response.data.wishday,
        // aroundId:response.data.aroundId,
        // title:response.data.title,
        // subject:response.data.subject
        // category:response.data.content.split(",")[0]

      });
    }).catch(err=>{
      console.log("캘린더 목록 오류:"+err);
    })
  }

  componentDidMount(){
    this.getData();
  }

  Days = (firstDayFormat,weekIndex) => {
    const _days = [];
    

    for (let i = 0; i < 7; i++) {

      const Day = moment(firstDayFormat).add(i,'d');
      _days.push({
        yearMonthDayFormat: Day.format("YYYY-MM-DD"),
        getDay: Day.format('D'),
        isHolyDay: false,
        weekIndex
      });
    }

    return _days;
  }

  mapDaysToComponents = (Days,calendarMonthYear ,selectedDayFormat ,fn = () => { }) => {

    const thisMonth = moment(calendarMonthYear); 

    return Days.map((dayInfo, i) => {

      let className = "date-weekday-label";

      if (!thisMonth.isSame(dayInfo.yearMonthDayFormat,'month')) {
        className = "date-notThisMonth";
      } else if (i === 0) {
        className = "date-sun"
      }else if(i===6){
        className ="date-sat"
      }

      if(moment(dayInfo.yearMonthDayFormat).isSame(selectedDayFormat,'day')){
        className = "selected"
      }

      const category=this.state.memId;
      const day=this.props.ymOfThisCalendar+"-"+dayInfo.getDay;
      const wishday=this.statewishday;
      console.log(category);

      
       return(
          <div className={"RCA-calendar-day " + className} key={`RCA-${dayInfo.weekIndex}-${i}-day`}onClick={() => fn(dayInfo.yearMonthDayFormat)}>
            <label className="RCA-calendar-day-label">
              {dayInfo.getDay} 
            
            </label>
            <div className="category">{wishday===day &&category==='카페'?<FaMugHot></FaMugHot>:
            wishday===day &&category==='숙박'?<FaHotel></FaHotel>:wishday===day &&category==='음식점'?
          <FaHamburger></FaHamburger>:''}</div>
            <div className="title">삼보식당</div>
  
            </div>
       )
      })    
        
    }



  render() {
    return (
      <div className="RCA-calendar-week">
        
        {this.mapDaysToComponents(this.Days(this.props.firstDayOfThisWeekformat,this.props.weekIndex),
        this.props.ymOfThisCalendar,
        this.props.selected,
        this.props.fn
        )}
        
      </div>
    )
  }
}

class Calendar extends Component {

  Weeks = (monthYear,selected,clickFn) => {
    const firstDayOfMonth = moment(monthYear).startOf('month');
    const firstDateOfMonth = firstDayOfMonth.get('d');

    const firstDayOfWeek = firstDayOfMonth.clone().add(-firstDateOfMonth,'d');

    const _Weeks = [];

    for (let i = 0; i < 6; i++) {
      _Weeks.push((
        <Week key={`RCA-calendar-week-${i}`}
        weekIndex={i}
        ymOfThisCalendar={firstDayOfMonth.format("YYYY-MM")}
        firstDayOfThisWeekformat={firstDayOfWeek.clone().add(i * 7,'d').format("YYYY-MM-DD")}
        selected={selected}
        fn={clickFn}
        />
      ))
    }
    return _Weeks
  }


  render() {
    return (
      <div className="RCA-calendar-container">
        <DateHeader dates={"Sun, Mon, Tue, Wed, Thu, Fri, Sat"} />
        {this.Weeks(this.props.YM,this.props.selected,this.props.changeSelected)}
      </div>
    )
  }
}

export default Calendar;

