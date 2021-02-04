import { green } from "@material-ui/core/colors";
import { BorderAll } from "@material-ui/icons";
import React, {Component} from "react";
import ChatCompPage from './ChatCompPage';
import './SharePlanCss.css';
import axios from 'axios';
import {URL} from "../../../redux/config";
import store from '../../../redux/store';
import Slider from "react-slick";
import SharePlanRoot from './SharePlanRoot';
import SharePlanSchedule from "./SharePlanSchedule";


class SharePlanPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("SharePlanPageComp constructor", props);

        this.state={
           glist:[],
           list:[],
           wishday:''
        }

        this.handleChange=this.handleChange.bind(this);


    
    }

    handleChange(event){
      console.log('day:'+event.target.value);
      this.setState({wishday:event.target.value});
      
    }

    // onGroup=()=>{
    //     let url=URL+"/plan/group?memId="+store.getState().loginId + "&wishday="+this.refs.wishday.value;
    //     axios.get(url)
    //     .then(res=>{
    //         this.setState({
    //             list:res.data
    //         });
    //     }).catch(err=>{
    //         console.log("목록 오류:"+err);
    //       })
    // }

    getGroupnum=()=>{
        let url=URL+"/plan/groupnum";
        
        axios.get(url)
        .then(res=>{
          console.log(res.data);
            this.setState({
                glist:res.data
            });
        }).catch(err=>{
            console.log("리스트 오류:"+err);
          })
    }

     getList=()=>{
        let url=URL+"/plan/list";
        axios.get(url)
        .then(res=>{
            this.setState({
                list:res.data
            });
        }).catch(err=>{
            console.log("리스트 오류:"+err);
          })
    }

    componentDidMount(){
        this.getGroupnum();
        this.getList();
    }

    // componentDidMount{
    //     this.onGroup();
    // }

    render() {
         // const {row}=this.props;
        // var wishday=row.wishday;
        // var title=row.title;
        
        console.log("SharePlanPageComp render()", this.props);
        const settings = {
            //dots: true,  // 점은 안 보이게
            infinite: true, // 무한으로 즐기게
            speed: 500,
            slidesToShow: 1, //4장씩 보이게 해주세요
            slidesToScroll: 1, //1장씩 넘어가세요
            // autoplay:true,
            // arrows:true,
            // autoplaySpeed:5000,
            // pauseOnHover:true,
            // vertical:false,
            //  prevArrow: "<button type='button' class='slick-prev'>Previous</button>",
            //  nextArrow:"<button type='button' class='slick-next'>next</button>",
            // dotsClass:"slick-dots",
            // draggable:true,
            
            responsive: [ // 반응형 웹 구현 옵션
              {
                  breakpoint: 500, // 화면 사이즈 1200px
                  settings: {
                    slidesToShow: 3,
                  }
              },
              {
                breakpoint: 1023,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1
                }
              }
            ]
          };
        
        
          
        return (
                
            <div className="outline">
            <div className="react-body">
            <ChatCompPage/>
             <div className="detailTitle">
              <span className="detailTitleContent" style={{backgroundColor:'white',color:'#036E38'}}>
                    &nbsp;&nbsp;일정 공유게시판&nbsp;&nbsp;
                </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    여러분만의 일정을 다른 사람들과 공유해보세요!
                </div>
                {/* <div className="slide-out">  */}
            <div className="slide-list-bar">
            
              <div className="slide-list-box">
                  <br/>
                 
                <Slider {...settings}>
                    
                  
                  {/* <div className="slide-list-item"> */}
                  {this.state.glist.map((row)=>(
                      
                          <SharePlanRoot row={row} value={this.state.wishday}></SharePlanRoot>
                      
                  ))}
                   {/* </div> */}
                </Slider>
                
                 {/* <div className="slick-prev"></div>
                <div className="slick-next"></div> */}
                
                </div>
                
            </div>
            <hr/>
            
            
            {/* <SharePlanSchedule value={this.state.wishday}></SharePlanSchedule> */}
            {/* <SharePlanSchedule wishday={this.refs.wishday.}></SharePlanSchedule> */}
            {this.state.list.map((row)=>(
              <SharePlanSchedule row={row} value={this.state.wishday}></SharePlanSchedule>
              
            ))}
            
            
           </div>
           <span>🗓공유날짜</span><br/>
                <input type="date" className="wishday" ref="wishday" value={this.state.wishday} onChange={this.handleChange}/> 
           </div>
            
           
          
        );    
           
        
    }

}

export default SharePlanPageComp;
