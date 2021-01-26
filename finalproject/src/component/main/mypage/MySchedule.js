import React, {Component} from 'react'
import './style/RCA.css';
import moment from 'moment';
// import Header from './Header';
import Calendar from './Calendar';
import axios from 'axios';
import {URL} from "../../../redux/config";


class MySchedule extends Component {

    constructor(props) {
        super(props);
        console.log("MySchedule constructor", props);

    }
      state={
        calendarYM : moment(),
        today : moment(),
        selected : moment().format("YYYY-MM-DD"),
        list:[]

      }

      static defaultProps = {
        clickFn : ()=>{}
    }

    
//   getData=()=>{
//     //  let url='http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot8/wish/list?memId=regegw';
//     let url = URL + "/wish/list?memId=sanghee";

//     axios.get(url)
//     .then(response=>{
//       console.log("캘린더 출력 : " + response.data); 
//       this.setState({
//         list: response.data
//         // memId:response.data.memId,
//         // spotId:response.data.spotId,
//         // shareNum:response.data.shareNum,
//         // content:response.data.content,
//         // wishday:response.data.wishday,
//         // aroundId:response.data.aroundId,
//         // title:response.data.title,
//         // subject:response.data.subject
//         // category:response.data.content.split(",")[0]

//       });
//     }).catch(err=>{
//       console.log("캘린더 목록 오류:"+err);
//     })
//   }

//   componentDidMount(){
//     this.getData();
//   }


    moveMonth = (month) => {
        this.setState({
            calendarYM : this.state.calendarYM.add(month,'M')
        })
    }

    changeSelected = (clickedDate) =>{

        if(moment(clickedDate).isSame(this.state.selected,'day')){
            this.props.clickFn(clickedDate);
            return;
        }

        this.setState({
            selected : clickedDate
        })

        this.props.clickFn(clickedDate)
        
        if(moment(clickedDate).isBefore(this.state.calendarYM,'month')){
            this.moveMonth(-1)
        }else if(moment(clickedDate).isAfter(this.state.calendarYM,'month')){
            this.moveMonth(1)
        }
    }
    render(){
        return(
            <div className="test-layout">
               <div className="RCA-app-container">
{/*                
                <Header calendarYM={this.state.calendarYM.format("YYYY년 MM월")}
                        today={this.state.today.format("현재: YYYY - MM - DD")}
                        
                        moveMonth={this.moveMonth}/>
                     */}
                     
                    <Calendar YM={this.state.calendarYM.format("YYYY-MM-DD")}
                        selected={this.state.selected}
                        changeSelected={this.changeSelected}
                    />
                </div>
        )
    
    </div>
        )
    }
    

}

export default MySchedule;