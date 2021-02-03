import { green } from "@material-ui/core/colors";
import { BorderAll } from "@material-ui/icons";
import React, {Component} from "react";
import './Test.css';

import Slider from "react-slick";



class SharePlanPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("SharePlanPageComp constructor", props);
        
    }

    render() {
        console.log("SharePlanPageComp render()", this.props);
        const settings = {
            dots: true,  // 점은 안 보이게
            infinite: true, // 무한으로 즐기게
            speed: 500,
            slidesToShow: 1, //4장씩 보이게 해주세요
            slidesToScroll: 1, //1장씩 넘어가세요
            
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
            
                
            
            <div className="react-body">
            
            <div className="slide-list-bar">
            
              <div className="slide-list-box">
                  <br/>
              <span className="shareplan" style={{backgroundColor:'white',color:'#036E38'}}>
                    &nbsp;&nbsp;일정 공유게시판&nbsp;&nbsp;
                </span>
                <hr/>
                <Slider {...settings}>
                    
                  <div className="slide-list-item">
                    <h2>안녕 반가워
                    </h2>
                  </div>
                  <div className="slide-list-item">
                    <h2>제주도</h2>
                  </div>
                  <div className="slide-list-item">
                 
                  </div>
                  <div className="slide-list-item">
                    
                  </div>
                  <div className="slide-list-item">
                    
                  </div>
                  <div className="slide-list-item">
                   
                  </div>
                </Slider>
                <div className="slick-prev"></div>
                <div className="slick-next"></div>
              </div>
            </div>
          </div>
          
        );    
           
        
    }

}

export default SharePlanPageComp;
