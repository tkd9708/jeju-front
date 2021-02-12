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
        //console.log("SharePlanPageComp constructor", props);

        this.state={
           glist:[],
           list:[]

        }

        //this.handleChange=this.handleChange.bind(this);


    
    }

    // handleChange(event){
    //   console.log('day:'+event.target.value);
    //   //this.setState({wishday:event.target.value});
    //   this.getGroup();

    // }


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

    


    


    //  getList=()=>{
    //     let url=URL+"/plan/list?wishday="+this.refs.wishday.value;
    //     this.setState({
    //         list:[]
    //     })
    //     axios.get(url)
    //     .then(res=>{
    //         this.setState({
    //             list:res.data
    //         });
    //     }).catch(err=>{
    //         console.log("리스트 오류:"+err);
    //       })
    // }

  

    // getNum=()=>{
    //       let url=URL+"/plan/num";
    //       axios.get(url)
    //       .then(res=>{
    //           this.setState({
    //               list:res.data
    //           });
    //       }).catch(err=>{
    //           console.log("리스트 오류:"+err);
    //         })
    //   }

    componentDidMount(){
        this.getGroupnum();
       //this.getPlan();
    }

    

   

    // componentDidMount{
    //     this.onGroup();
    // }

    render() {
         // const {row}=this.props;
        // var wishday=row.wishday;
        // var title=row.title;
        
        //console.log("SharePlanPageComp render()", this.props);

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
            
                
            <div className="react-out">
            <div className="react-body">
             <div className="detailTitle">
              <span className="detailTitleContent" style={{backgroundColor:'white',color:'#036E38'}}>
                    &nbsp;&nbsp;일정 공유게시판&nbsp;&nbsp;
                </span>
                </div>
                <div className="detailIntro" style={{color: "#888"}}>
                    여러분만의 일정을 다른 사람들과 공유해보세요!<br/>
                    동행이 필요하신분은 채팅서비스를 이용해보세요.
                    <br/>
                  {/* <span>🗓공유날짜</span> */}
                  <br/>
                  나와 같은날 가는 동행이 있을까? 원하시는 날짜로 조회해서 확인해보세요.
                  <br/>
                  <input type="date" className="wishday form-control" ref="wishday"  onChange={this.getGroup.bind(this)}/>
                </div>
                {/* <div className="slide-out">  */}
                
                
            <div className="share-slide-list-bar">
                
              <div className="share-slide-list-box">
                  <br/>
                 
                 
                <Slider {...settings}>
                
                  {/* <div className="slide-list-item"> */}
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
