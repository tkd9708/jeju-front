import React, {Component} from "react";
import './SharePlanCss.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import Slider from "react-slick";
import SharePlanRoot from './SharePlanRoot';


import store from '../../../redux/store';
import { StoreTwoTone } from "@material-ui/icons";
import SharePlanTable from './SharePlanTable';


class SharePlanPageComp extends Component {

    constructor(props) {
        super(props);

        this.state={
           glist:[],
           list:[]

        }
    
    }

    getGroup=()=>{
      let url=URL+"/plan/group?wishday="+this.refs.wishday.value;
         //console.log(this.refs.wishday.value);
        this.setState({
          glist:[]
      });

        axios.get(url)
        .then(res=>{
          console.log("선택 데이터 : " + res.data);
            this.setState({
                glist:res.data
            });
        }).catch(err=>{
            console.log("리스트 오류:"+err);
          })
    }

    getGroupnum=()=>{
        let url=URL+"/plan/groupnum";

        
        
        axios.get(url)
        .then(res=>{
          console.log("데이터 ; " + res.data);
            this.setState({
                glist:res.data
                
            });
        }).catch(err=>{
            console.log("리스트 오류:"+err);
          })
    }

    

    componentDidMount(){
        this.getGroupnum();
       //this.getPlan();
    }


    render() {

        const settings = {
            //dots: true,  // 점은 안 보이게
            infinite: true, // 무한으로 즐기게
            speed: 500,
            slidesToShow: 1, //4장씩 보이게 해주세요
            slidesToScroll: 1, //1장씩 넘어가세요
          };
        
        
        return (
            
                
            <div className="react-out">
            <div className="react-body">
             <div className="detailTitle">
              <span className="detailTitleContent" style={{backgroundColor:'white',color:'#036E38'}}>
                    &nbsp;&nbsp;일정 공유게시판&nbsp;&nbsp;
                </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    새로운 사람과 제주도 여행을 같이 하고 싶다! <br/>
                    여러분만의 일정을 다른 사람들과 공유해보세요!
                    <br/>
                  <br/>
                  동행이 필요하세요? 나와 일정이 비슷한 동행에게 채팅서비스를 이용해보세요.
                  <br/>
                  <input type="date" className="wishday form-control" ref="wishday"  onChange={this.getGroup.bind(this)}/>
                </div>
                
                
            <div className="share-slide-list-bar">
              <div className="share-slide-list-box">
                  <br/>
                
                <Slider {...settings}>
                
                  {this.state.glist.map((row)=>(
                          <SharePlanRoot row={row} day={this.refs.wishday.value}></SharePlanRoot>
                  ))}
                   
                </Slider>
                
                
                </div>
      
            </div>
            </div>
            
            <hr/>
            <SharePlanTable/>
          
          </div>
        
           
          
        );    
           
    }

}

export default SharePlanPageComp;
