import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper";
import store from '../../../redux/store';
import './MyPlanComp.css';
import axios from 'axios';
import {URL} from '../../../redux/config';
import MyPlanRightItem from './MyPlanRightItem';
import MyPlanLeftItem from './MyPlanLeftItem';

class MyPlanComp extends Component {
    
    constructor(props){
        super(props);

        this.state={
            count: 0,
            todayList: [], // 오늘 전부 plan
            todayAfterList: [], // 오늘 현재 시간 이후 plan
            nextList: [] // 오늘 이후 plan
        }

        let date = new Date();
        this.today = date.getFullYear() + "-" + date.getMonth()+1 + "-" + date.getDate();
    }

    componentWillMount(){
        this.getPlanList();
    }

    // todayList, todayAfterList 가져오기
    getPlanList = () => {
        let url = URL + "/wish/planlist?memId=" + store.getState().loginId + "&day=" + this.today + "&category=today&perPage=5";
        
        // let url = URL + "/wish/planlist?memId=sanghee&day=2020-12-15&category=today&perPage=5";
        
        axios.get(url)
            .then(res=>{
                let date = new Date();
                let now = date.getHours() < 10 ? "0" + date.getHours() + ":" + date.getMinutes():date.getHours() + ":" + date.getMinutes();
                // console.log(now);
                this.setState({
                    todayList: res.data,
                    todayAfterList: res.data.filter(item => item.wishtime > now)
                })
                this.setState({
                    count: this.state.todayAfterList.length
                })
                if(this.state.count == 0)
                    this.getNextDayPlan();
            }).catch(err=>{
                console.log("myplan getPlanList 오류 : " + err);
            })
    }

    // 오늘 일정 없을 시, 오늘 이후 plan 가져오기
    getNextDayPlan = () => {
        let url = URL + "/wish/planlist?memId=" + store.getState().loginId + "&day=" + this.today + "&category=nextDay&perPage=5";
        
        axios.get(url)
            .then(res=>{
                this.setState({
                    nextList: res.data
                })
                this.setState({
                    count : this.state.nextList.length
                })
                // console.log(this.state.count);
                    
            }).catch(err=>{
                console.log("myplan getNextDayPlan 오류 : " + err);
            })
    }

    render(){
        // login시에만 왼쪽 블럭 출력
        const leftTag = store.getState().logged==true?
            <div className="myPlanLeft" style={{borderRight: '1px solid black'}}>
                    <span>MyPlan on {this.today}</span>
                    <List style={{width: '100%'}}>
                        {this.state.todayAfterList.map((row)=>(
                            <MyPlanLeftItem row={row}/>
                        ))}
                    </List>
                </div>:"";

        // 오른쪽 블럭 : 오늘 현재시간 이후 list 출력 / 없을 시, 오늘 이후 일정 출력 / 없을 시, 추천 spot 보여주기
        const list = this.state.todayAfterList!=''?
            <div className="myPlanpagesRoot">
                {this.state.todayAfterList.map((row)=>(
                    <MyPlanRightItem row={row}/>
                ))}
            </div>
        :this.state.nextList!=''?<div className="myPlanpagesRoot">
                                    {this.state.nextList.map((row)=>(
                                        <MyPlanRightItem row={row}/>
                                    ))}
                                </div>:<span>일정 없으면 추천 spot 보여주기</span>;

        // 로그인 시, plan list 출력 / 없을 시, 뭐넣지
        const rightTag = store.getState().logged==true?
            <div className="myPlanRight">
                <span>MyPlan</span>
                {list}
            </div>
            
            :<h2>로그인 안하면 무엇을 넣을까요 날씨넣는다메요</h2>

        return (
            <div className="myPlanComp myPlanParent">
                {leftTag}
                {rightTag}
                {/* <div className="myPlanRight">
                    {myplan}
                    <div className="myPlanpagesRoot">
                        {this.state.planList.map((row)=>(
                            <MyPlanItem row={row}/>
                        ))}
                    </div>
                </div> */}
            </div>
        )
    }
}

export default MyPlanComp;
