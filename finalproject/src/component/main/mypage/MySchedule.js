import React, {Component} from 'react'
import './style/RCA.css';
import moment from 'moment';
import axios from 'axios';
import {URL} from "../../../redux/config";
import Header from './Header';
import Calendar from './Calendar';
import store from '../../../redux/store';


class MySchedule extends Component {

    constructor(props) {
        super(props);
        console.log("MySchedule constructor", props);

        this.state={
            clist:[],
            calendarYM : moment(),
            today : moment(),
            selected : moment().format("YYYY-MM-DD"),
        }

    }
      state={
       
        

      }

      getList=()=>{
        let url = URL + "/wish/schedulelist?memId="+store.getState().loginId + "&wishday=" + this.state.calendarYM.format("YYYY-MM") ;
        console.log("월별 가져오기 : " +  this.state.calendarYM.format("YYYY-MM"));
        
        axios.get(url)
        .then(res=>{
          console.log(" schedulelist 출력:"+res.data);
          this.setState({
              clist:res.data
          });
      }).catch(err=>{
        console.log("목록 오류:"+err);
      })
}

      
//       getData=()=>{

//         let url = URL + "/wish/list?memId="+store.getState().loginId;

//         axios.get(url)
//         .then(response=>{
//           //console.log("캘린더 출력 : " + response.data); 
//           this.setState({
//             list: response.data

//           });
//         }).catch(err=>{
//           console.log("캘린더 목록 오류:"+err);
//         })
//   }

  componentDidMount(){
    this.getList();
    
    
  }


      static defaultProps = {
        clickFn : ()=>{}
    }

    moveMonth = (month) => {
        this.setState({
            calendarYM : this.state.calendarYM.add(month,'M')
        })
        this.getList();
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
               
                <Header calendarYM={this.state.calendarYM.format("YYYY년 MM월")}
                        today={this.state.today.format("현재: YYYY - MM - DD")}
                        moveMonth={this.moveMonth} clist={this.state.clist} />
                    
                     
                    <Calendar YM={this.state.calendarYM.format("YYYY-MM-DD")}
                        selected={this.state.selected}
                        changeSelected={this.changeSelected}
                    />
                    

                </div>
                {/* {this.state.clist.map((row)=>(
                    <Header row={row}></Header>
              ))} */}
           
        </div>
        )
    }
    

}

export default MySchedule;