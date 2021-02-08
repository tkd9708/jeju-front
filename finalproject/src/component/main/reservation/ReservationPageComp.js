import React, {Component} from "react";
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PersonIcon from '@material-ui/icons/Person';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import img from './dd.PNG';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './Reservation.css';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import store from '../../../redux/store';
import axios from 'axios';

import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";

class ReservationPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("ReservationPageComp constructor", props);
        this.state = {
          tabValue:0,
            adult: 0,
            child:0,
            infant:0,
            twoadult: 0,
            twochild:0,
            twoinfant:0,
            seat: '',
            twoseat:'',
            person:0,
            twoperson:0,
            open: false,
            twoopen: false,
            departDate: '',
            startdepartDate:'',
            arrivaldepartDate:'',
            seatopen: false,
            twoseatopen: false,
            anchorEl: null,
            twoanchorEl: null,
            all: 0,
            general: 0,
            business: 0


        
          }

    }
   
    // 인원 선택버튼 숫자증가
    state = {
      value: 0
    }
    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    };
  
    decrease = () => {
      this.setState({ value: this.state.value - 1 });
    }
  
    increase = () => {
      this.setState({ value: this.state.value + 1 });
    }


    // 좌석 선택버튼
    // handleChange = (e) => {
    //     this.setState({
    //         seat: e.target.value
    //     })
    //   };
    
    // 편도 좌석 인원 버튼
    handleClick = (event) => {
      this.setState({
        anchorEl : event.currentTarget
      })
    }
    
    handleClose = () => {
        this.setState({
          anchorEl : null
        })
      };
    
    handleOpen = () => {
        this.setState({
            open : true
        })
      };
      handleSeatClose = () => {
        this.setState({
            seatopen : false
        })
      };
    
    handleSeatOpen = () => {
        this.setState({
          seatopen : true
        })
      };

    
    
    // 왕복 좌석 인원 버튼
    handleTwoClick = (event) => {
      this.setState({
        twoanchorEl : event.currentTarget
      })
    }
    
    handleTwoClose = () => {
        this.setState({
          twoanchorEl : null
        })
      };
  
     handleTwoOpen = () => {
      this.setState({
          twoopen : true
      })
    };
    handleTwoSeatClose = () => {
      this.setState({
          twoseatopen : false
      })
    };
  
    handleTwoSeatOpen = () => {
      this.setState({
        twoseatopen : true
      })
    };
 
    
    // 탭 버튼
    a11yProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      handleTabChange = (event, newValue) => {
        this.setState({ tabValue: newValue });
      }



      insertWish=()=>{
        let url = URL + "/wish/insertspot";
        let memId = store.getState().loginId;
        let wishday = this.refs.wishday.value;
        let wishtime = this.refs.wishtime.value;

        console.log(this.refs.wishday.value);
        if(wishday == '' || wishtime == '')
            alert("날짜와 시간을 모두 선택해주세요.");
        else{
            axios.post(url, {memId, wishday, wishtime})
            .then(res=>{
                this.setState({
                    open: false,
                    alertOpen: true
                })
            }).catch(err=>{
                console.log("spotwish insert 오류 : " + err);
            })
        }
        
    }

    

    render() {

        
       //const { value } = this.state;
        console.log("ReservationPageComp render()", this.props);
        const open = Boolean(this.state.anchorEl);
        const id = open ? "simple-popover" : undefined;

        const twoopen = Boolean(this.state.twoanchorEl);
        const twoid = twoopen ? "simple-popover" : undefined;

        return (
            <div>
                <div style={{margin:'0 auto',marginLeft:"46%",marginTop:"2%",marginBottom:'2%'}}>
                <h1>항공예약</h1>
                </div>

                <div style={{border:'1px solid black',width:'800px',height:'550px',maring:'0 auto',marginLeft:'30%'}}>
                    
                    <div>
                         {/*                       
                         <div style={{borderRight:"1px solid black", float:'left'}}>
                              <TrendingFlatIcon/><p>편도&nbsp;</p>
                         </div>

                         <div style={{float:'right'}}>
                            <SyncAltIcon/><p>왕복 &nbsp;</p>
                         </div> */}


                        {/* 편도 왕복 선택 tab */}
                         <AppBar position="static"  color="default" style={{marginBottom:'14px'}}>
                           <Tabs value={this.state.tabValue} onChange={this.handleTabChange.bind(this)} aria-label="full width tabs example" indicatorColor="primary" >
                             <Tab label="편도" icon={<TrendingFlatIcon/>} {...this.a11yProps(0)} />
                             <Tab label="왕복" icon={<SyncAltIcon/>} {...this.a11yProps(1)} />
                           </Tabs>
                         </AppBar>
                      

                        {/* 편도 */}
                         <TabPanel value={this.state.tabValue} index={0}>
                            <div style={{textAlign:'center',marginBottom:'50px'}}>
                                    <b style={{fontSize:'40px',marginRight:'30px'}}>김포</b>
                                    <FlightTakeoffIcon style={{width:'50px',height:'50px',color:'#00bfff',marginBottom:'25px'}}  />
                                    <b style={{fontSize:'40px',marginLeft:'30px'}}>제주</b>
                            </div>

                   
                            <div>
                               <div  style={{marginBottom:'20px'}}>
                          
                                   {/* 날짜선택 */}
                                   <input type="date" name="departDate" onChange={this.handleChange.bind(this)} style={{marginRight:'10px',marginLeft:'160px',width:'380px'}}  ref="wishday"/>
                                   
                         
                                   {/* 항공예약 버튼 */}
                                   <div style={{float:'right',marginRight:'10px',marginLeft:'10px',marginBottom:'25px',marginTop:'10px'}}>
                                      <button type="button" className="btn btn-info" style={{fontSize:'15px',width:'150px',height:'80px'}}
                                      onClick={() => window.open('https://flight.naver.com/flights/results/domestic?trip=OW&fareType='+this.state.seat+'&scity1=GMP&ecity1=CJU&adult='+this.state.adult+'&child='+this.state.child+'&infant='+this.state.infant+'&sdate1='+this.state.departDate+'', '_blank')}>
                                      항공권 검색</button>
                                   </div>
                              </div>
    
                       
                               <div>
                                   {/* 인원선택 */}
                                   <PersonIcon style={{marginLeft:'110px',marginTop:'25px'}}/>

                                    <Button aria-describedby={id} variant="contained" className="btn btn-info" onClick={this.handleClick.bind(this)}  name="person"
                                    style={{marginTop:'20px',marginLeft:'15px',marginRight:'30px',width:'150px'}}>
                                       <b style={{color:'white'}}>총 {this.state.person}명</b>
                                    </Button>

                                    <Popover
                                       id={id}
                                       open={open}
                                       onClose={this.handleClose.bind(this)}
                                       anchorEl={this.state.anchorEl}
                                       anchorOrigin={{
                                          vertical: "bottom",
                                          horizontal: "center"
                                        }}
                                        transformOrigin={{
                                          vertical: "top",
                                          horizontal: "center"
                                        }}>
                           
 
                                       
                                             <b>성인</b>                                             
                                               <div className="def-number-input number-input">
                                                  <button onClick={()=>{this.setState({adult: this.state.adult-1, person: this.state.person-1})}} className="minus"></button>
                                                  <input className="quantity" name="adult" value={this.state.adult} onChange={this.handleChange.bind(this)}
                                                  type="number" />
                                                  <button onClick={()=>{this.setState({adult: this.state.adult+1, person: this.state.person+1})}} className="plus"></button>
                                               </div>

                                               
                                       
                                             <b>유아</b>                                             
                                               <div className="def-number-input number-input">
                                                  <button onClick={()=>{this.setState({child: this.state.child-1, person: this.state.person-1})}} className="minus"></button>
                                                  <input className="quantity" name="child" value={this.state.child} onChange={this.handleChange.bind(this)}
                                                  type="number" />
                                                  <button onClick={()=>{this.setState({child: this.state.child+1, person: this.state.person+1})}} className="plus"></button>
                                               </div>

                                               
                                       
                                             <b>소아</b>                                             
                                               <div className="def-number-input number-input">
                                                  <button onClick={()=>{this.setState({infant: this.state.infant-1, person: this.state.person-1})}} className="minus"></button>
                                                  <input className="quantity" name="infant" value={this.state.infant} onChange={this.handleChange.bind(this)}
                                                  type="number" />
                                                  <button onClick={()=>{this.setState({infant: this.state.infant+1, person: this.state.person+1})}} className="plus"></button>
                                               </div>

                                  

                                    </Popover>


                                   {/* 좌석선택 */}
                                   <AirlineSeatReclineNormalIcon style={{marginTop:'25px'}}/>
                                  
                                   <FormControl style={{width:'170px',paddingBottom:'20px',marginLeft:'20px'}}>
                                     <InputLabel>좌석</InputLabel>
                                       <Select
                                       open={this.state.seatopen}
                                       onClose={this.handleSeatClose.bind(this)}
                                       onOpen={this.handleSeatOpen.bind(this)}
                                       value={this.state.seat}
                                       name="seat"
                                       onChange={this.handleChange.bind(this)}
                                       >
                                         <MenuItem name="all" value="YC">전체</MenuItem>
                                         <MenuItem name="general" value="Y">일반석</MenuItem>
                                         <MenuItem name="business" value="C">비지니스석</MenuItem>
                                        
                                       </Select>
                                   </FormControl>
                                   
                               </div>
                            </div>

                            <div style={{borderTop:'1px solid black',margin:'0 auto',textAlign:'center',marginTop:'40px'}}>
                                {/* <img src={img}/> */}

                                  <div>
                                      <form noValidate style={{float:'left',marginTop:'37px',marginLeft:'120px'}}>
                                          <TextField
                                            style={{width:'250px'}}
                                            id="time"
                                            label="비행기 시간"
                                            type="time"
                                            defaultValue="07:30"
                                            
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            inputProps={{
                                              step: 300, // 5 min
                                            }}
                                          />
                                      </form>


                                      
                                  </div>
                                
                                
                                <Button variant="outlined" id="thumbAddBtn" style={{color: 'black', border: '1px solid #aaa'
                                       ,float:'right',marginTop:'30px',marginRight:'120px',width:'150px',height:'60px'}} ref="wishtime"
                                       onClick={this.insertWish.bind(this)}>
                                  일정추가
                                </Button>
                            </div>
                        </TabPanel>






                        {/* 왕복 */}
                        <TabPanel value={this.state.tabValue} index={1}>
                            <div style={{textAlign:'center',marginBottom:'50px'}}>
                                 <b style={{fontSize:'40px',marginRight:'30px'}}>김포</b>
                                 <FlightTakeoffIcon style={{width:'50px',height:'50px',color:'#00bfff',marginBottom:'25px'}}  />
                                 <b style={{fontSize:'40px',marginLeft:'30px'}}>제주</b>
                            </div>

                   
                            <div>
                               <div  style={{marginBottom:'20px'}}>
                          
                                   {/* 날짜선택 */}
                                   {/* 출발날짜 */}
                                   <input type="date" name="startdepartDate" onChange={this.handleChange.bind(this)} style={{marginRight:'60px',marginLeft:'160px'}}/>
                                   {/* 도착날짜 */}
                                   <input type="date" name="arriverdepartDate" onChange={this.handleChange.bind(this)}/>
                         
                                    {/* 항공예약 버튼 */}
                                   <div style={{float:'right',marginRight:'10px',marginBottom:'25px',marginTop:'10px'}}>
                                      <button type="button" className="btn btn-info" style={{fontSize:'15px',width:'150px',height:'80px'}}
                                       onClick={() => window.open('https://flight.naver.com/flights/results/domestic?trip=RT&fareType='+this.state.twoseat+'&scity1=GMP&ecity1=CJU&scity2=CJU&ecity2=GMP&adult='+this.state.twoadult+'&child='+this.state.twochild+'&infant='+this.state.twoinfant+'&sdate1='+this.state.startdepartDate+'&sdate2='+this.state.arriverdepartDate+'', '_blank')}>
                                        항공권 검색</button>
                                   </div>
                              </div>
    
                       
                               <div>
                                   {/* 인원선택 */}
                                   <PersonIcon style={{marginLeft:'110px',marginTop:'25px'}}/>

                                   <Button aria-describedby={id} variant="contained" className="btn btn-info" onClick={this.handleTwoClick.bind(this)}  name="twoperson"
                                    style={{marginTop:'20px',marginLeft:'15px',marginRight:'30px',width:'150px'}}>
                                       <b style={{color:'white'}}>총 {this.state.twoperson}명</b>
                                    </Button>

                                    <Popover
                                       id={twoid}
                                       open={twoopen}
                                       onClose={this.handleTwoClose.bind(this)}
                                       twoanchorEl={this.state.twoanchorEl}
                                       anchorOrigin={{
                                          vertical: "bottom",
                                          horizontal: "center"
                                        }}
                                        transformOrigin={{
                                          vertical: "top",
                                          horizontal: "center"
                                        }}>
                           
 
                                       
                                             <b>성인</b>                                             
                                               <div className="def-number-input number-input">
                                                  <button onClick={()=>{this.setState({twoadult: this.state.twoadult-1, twoperson: this.state.twoperson-1})}} className="minus"></button>
                                                  <input className="quantity" name="twoadult" value={this.state.twoadult} onChange={this.handleChange.bind(this)}
                                                  type="number" />
                                                  <button onClick={()=>{this.setState({twoadult: this.state.twoadult+1, twoperson: this.state.twoperson+1})}} className="plus"></button>
                                               </div>

                                               
                                       
                                             <b>유아</b>                                             
                                               <div className="def-number-input number-input">
                                                  <button onClick={()=>{this.setState({twochild: this.state.twochild-1, twoperson: this.state.twoperson-1})}} className="minus"></button>
                                                  <input className="quantity" name="twochild" value={this.state.twochild} onChange={this.handleChange.bind(this)}
                                                  type="number" />
                                                  <button onClick={()=>{this.setState({twochild: this.state.twochild+1, twoperson: this.state.twoperson+1})}} className="plus"></button>
                                               </div>

                                               
                                       
                                             <b>소아</b>                                             
                                               <div className="def-number-input number-input">
                                                  <button onClick={()=>{this.setState({twoinfant: this.state.twoinfant-1, twoperson: this.state.twoperson-1})}} className="minus"></button>
                                                  <input className="quantity" name="twoinfant" value={this.state.twoinfant} onChange={this.handleChange.bind(this)}
                                                  type="number" />
                                                  <button onClick={()=>{this.setState({twoinfant: this.state.twoinfant+1, twoperson: this.state.twoperson+1})}} className="plus"></button>
                                               </div>

                                  

                                    </Popover>
                                    
                                   
                                                   
                                  {/* 좌석선택 */}
                                  <AirlineSeatReclineNormalIcon style={{marginTop:'25px'}}/>
                                  
                                  <FormControl style={{width:'170px',paddingBottom:'20px',marginLeft:'20px'}}>
                                     <InputLabel>좌석</InputLabel>
                                       <Select
                                       open={this.state.twoseatopen}
                                       onClose={this.handleTwoSeatClose.bind(this)}
                                       onOpen={this.handleTwoSeatOpen.bind(this)}
                                       value={this.state.twoseat}
                                       name="twoseat"
                                       onChange={this.handleChange.bind(this)}
                                       >
                                         <MenuItem name="all" value="YC">전체</MenuItem>
                                         <MenuItem name="general" value="Y">일반석</MenuItem>
                                         <MenuItem name="business" value="C">비지니스석</MenuItem>

                                       </Select>
                                   </FormControl>
                               </div>
                            </div>

                            <div style={{borderTop:'1px solid black',margin:'0 auto',textAlign:'center',marginTop:'40px'}}>
                                {/* <img src={img}/> */}
                                <div>
                                      <form noValidate style={{float:'left',marginTop:'37px',marginLeft:'120px'}}>
                                          <TextField
                                            style={{width:'250px'}}
                                            id="time"
                                            label="비행기 시간"
                                            type="time"
                                            defaultValue="07:30"
                                            
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            inputProps={{
                                              step: 300, // 5 min
                                            }}
                                          />
                                      </form>
                                  </div>
                                
                                
                                <Button variant="outlined" id="thumbAddBtn" style={{color: 'black', border: '1px solid #aaa'
                                       ,float:'right',marginTop:'30px',marginRight:'120px',width:'150px',height:'60px'}}>
                                  일정추가
                                </Button>
                            </div>
                        </TabPanel>
        
                        </div>
               
                   <div>
            
                   </div>

             
                </div>
            </div>
        )
    }

}

class TabPanel extends Component {
    render() {
      return (
        <Typography component="div" hidden={this.props.value !== this.props.index}>
          <Box p={3}>{this.props.children}</Box>
        </Typography>
      );
    }
  }

export default ReservationPageComp;
