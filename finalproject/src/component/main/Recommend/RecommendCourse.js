import React, { Component } from 'react';
import store from '../../../redux/store';
import axios from 'axios';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import {MDBBtn} from 'mdbreact';

class RecommendCourse extends Component{
    
    render(){
        

        return(
            
                <div>
                    {/* <h1 style={{margin:'0 auto',marginLeft:'45%',marginBottom:'50px',marginTop:"50px"}}>일정 추천</h1> */}
                    <div className="detailTitle">
                        <span className="detailTitleContent" style={{backgroundColor: 'white', color: '#036E38'}}>
                            &nbsp;&nbsp;일정 추천&nbsp;&nbsp;
                        </span>
                    </div>

                    <div className="detailIntro" style={{color: "#888"}}>
                         일정계획이 어려우신 회원분들을 위해 직접 제주도 명소를 추천드립니다.<br/>
                    </div>
                    
                     {/* group num 1 (1박2일) */}
                    <div style={{width:'1600px',marginBottom:'4%',marginLeft:"8%",textAlign:'center'}}>
                            <div className="detailTitle">
                                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38',fontSize:'25px'}}>
                                        &nbsp;&nbsp;&nbsp;알찬 1박2일  제주도 코스&nbsp;&nbsp;&nbsp;
                                    </span>
                            </div>
                            <MDBBtn style={{float:'left',fontSize:'15px'}} size="sm" color="dark-green" type="button">일정추가</MDBBtn>
                                            
                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day1</b>
                                <Step>
                                    <StepLabel>
                                        <b>사려니숲길</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}> 
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>성산 일출봉</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>성산 유채꽃 재배단지</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                                                                
                                </Step>

                            </Stepper>

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day2</b>
                                <Step>
                                    <StepLabel>
                                        <b>우도 득성이코지</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>
                                <Step></Step>
                            </Stepper>
                    </div>



                    {/* group num 2(3박4일) */}
                    <div style={{width:'1600px',marginBottom:'30px',marginLeft:"8%",textAlign:'center'}}>          
                            <div className="detailTitle">
                                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38',fontSize:'25px'}}>
                                        &nbsp;&nbsp;&nbsp;제주도에서 즐기는 3박4일 예술여행&nbsp;&nbsp;&nbsp;
                                    </span>
                            </div>
                            <MDBBtn style={{float:'left',fontSize:'15px'}} size="sm" color="dark-green" type="button">일정추가</MDBBtn>
                    
                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day1</b>
                                <Step>
                                    <StepLabel>
                                        <b>용담 1동 벽화거리</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>브릭 캠퍼스</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                
                                </Step>
                                <Step></Step>
                            </Stepper>

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day2</b>
                                <Step>
                                    <StepLabel>
                                        <b>저지 예술인 마을</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>이중섭 거리</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step></Step>
                            </Stepper>

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day3</b>
                                <Step>
                                    <StepLabel>
                                        <b>납읍난대림 금산공원</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>히어로즈 벽화길</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>아날로그 감귤밭</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>
                            </Stepper>

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day4</b>
                                <Step>
                                    <StepLabel>
                                        <b>걸매예술마을</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>황우지 해안</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step></Step>

                            </Stepper>
                    </div>



                    
                     {/* group num 3(2박3일) */}
                    <div style={{width:'1600px',marginBottom:'30px',marginLeft:'8%',textAlign:'center'}}>
                           <div className="detailTitle">
                                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38',fontSize:'25px'}}>
                                        &nbsp;&nbsp;&nbsp;여유즐기는 2박3일 자유여행&nbsp;&nbsp;&nbsp;
                                    </span>
                            </div>
                            <MDBBtn style={{float:'left',fontSize:'15px'}} size="sm" color="dark-green" type="button">일정추가</MDBBtn>
                
                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day1</b>
                                <Step>
                                    <StepLabel>
                                        <b>애월한담해안산책로</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>새별오름</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                
                                </Step>

                                <Step></Step>
                            </Stepper>

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day2</b>
                                <Step>
                                    <StepLabel>
                                        <b>천지연 폭포</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>협재해수욕장</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>주상절리대</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                
                            </Stepper >

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day3</b>
                                <Step>
                                    <StepLabel>
                                        <b>가뫼물</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step></Step>

                            </Stepper>
                    </div>

                    
                    {/* group num 4(3박4일) */}
                    <div style={{width:'1600px',marginBottom:'30px',marginLeft:'8%',textAlign:'center'}}>
                             <div className="detailTitle">
                                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38',fontSize:'25px'}}>
                                        &nbsp;&nbsp;&nbsp;제주 서부지역 3박4일 여행&nbsp;&nbsp;&nbsp;
                                    </span>
                            </div>
                            <MDBBtn style={{float:'left',fontSize:'15px'}} size="sm" color="dark-green" type="button">일정추가</MDBBtn>
                
                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day1</b>
                                <Step>
                                    <StepLabel>
                                        <b>이호테우해수욕장</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>도두봉</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                
                                </Step>
                            </Stepper>

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day2</b>
                                <Step>
                                    <StepLabel>
                                        <b>신엄포구</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>애월한담카약</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step></Step>

                            </Stepper>

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day3</b>
                                <Step>
                                    <StepLabel>
                                        <b>엉덩물계곡</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>천제연폭포</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                
                                <Step>
                                    <StepLabel>
                                        <b>외돌개</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                            </Stepper>

                            
                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day4</b>
                                <Step>
                                    <StepLabel>
                                        <b>용두암</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step></Step>

                            </Stepper>
                    </div>


                                  
                    {/* group num 5(1박2일) */}
                    <div style={{width:'1600px',marginBottom:'30px',marginLeft:'8%',textAlign:'center'}}>
                            <div className="detailTitle">
                                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38',fontSize:'25px'}}>
                                        &nbsp;&nbsp;&nbsp;나혼자 여유로운 1박2일 제주도여행&nbsp;&nbsp;&nbsp;
                                    </span>
                            </div>
                            <MDBBtn style={{float:'left',fontSize:'15px'}} size="sm" color="dark-green" type="button">일정추가</MDBBtn>
              
                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day1</b>
                                <Step>
                                    <StepLabel>
                                        <b>김녕해안도로</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>김녕금속공예벽화마을</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                
                                </Step>

                                <Step>
                                    <StepLabel>
                                        <b>만장굴</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                
                                </Step>
                            </Stepper>

                            <Stepper activeStep={4} style={{marginTop:'50px'}}>
                            <b>Day2</b>
                                <Step>
                                    <StepLabel>
                                        <b>세화해변</b>
                                        <div style={{width:'150px',height:'150px',border:'1px solid black'}}>  
                                        </div>
                                    </StepLabel>
                                </Step>

                                <Step></Step>

                            </Stepper>

                    </div>


                </div>
            
            
        )
    }
}

export default RecommendCourse;