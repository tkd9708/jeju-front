import React, {Component,useState} from "react";
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
import ListSubheader from "@material-ui/core/ListSubheader";

import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";
import './Reservation.css';







class ReservationPageComp extends Component { 

    constructor(props) {
        super(props);
        console.log("ReservationPageComp constructor", props);
        this.state = {
            value: 0,
            seat: '',
            open: false

        
          }

    }
   
    // 인원 선택버튼 숫자증가
    state = {
      value: 0
    }
  
    decrease = () => {
      this.setState({ value: this.state.value - 1 });
    }
  
    increase = () => {
      this.setState({ value: this.state.value + 1 });
    }


    // 좌석 선택버튼
    handleChange = (e) => {
        this.setState({
            seat: e.target.value
        })
      };
    
    handleClose = () => {
        this.setState({
            open : false
        })
      };
    
    handleOpen = () => {
        this.setState({
            open : true
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
        this.setState({ value: newValue });
      }

    

    render() {

        
        const { value } = this.state;
        console.log("ReservationPageComp render()", this.props);
        return (
            <div>
                <div style={{margin:'0 auto',marginLeft:"45%",marginTop:"3%",marginBottom:'2%'}}>
                <h1>항공예약</h1>
                </div>

                <div style={{border:'1px solid black',width:'800px',height:'550px',maring:'0 auto',marginLeft:'28%'}}>
                    
                    <div style={{border:'1px solid black'}} >
                         {/*                       
                         <div style={{borderRight:"1px solid black", float:'left'}}>
                              <TrendingFlatIcon/><p>편도&nbsp;</p>
                         </div>

                         <div style={{float:'right'}}>
                            <SyncAltIcon/><p>왕복 &nbsp;</p>
                         </div> */}


                        {/* 편도 왕복 선택 tab */}
                         <AppBar position="static"  color="default">
                           <Tabs value={this.state.value} onChange={this.handleTabChange.bind(this)} aria-label="full width tabs example" indicatorColor="primary" >
                             <Tab label="편도" icon={<TrendingFlatIcon/>} {...this.a11yProps(0)} />
                             <Tab label="왕복" icon={<SyncAltIcon/>} {...this.a11yProps(1)} />
                           </Tabs>
                         </AppBar>
                      

                        {/* 편도 */}
                         <TabPanel value={this.state.value} index={0}>
                            <div style={{textAlign:'center',marginBottom:'50px'}}>
                                    <b style={{fontSize:'40px',marginRight:'30px'}}>김포</b>
                                    <FlightTakeoffIcon style={{width:'50px',height:'50px',color:'#00bfff',marginBottom:'25px'}}  />
                                    <b style={{fontSize:'40px',marginLeft:'30px'}}>제주</b>
                            </div>

                   
                            <div style={{border:'1px solid black'}}>
                               <div  style={{marginBottom:'20px'}}>
                          
                                   <input type="date" style={{marginRight:'10px',marginLeft:'180px',width:'380px'}}/>
                                   
                         
                          
                                   <div style={{float:'right',marginRight:'10px',marginBottom:'25px',marginTop:'10px'}}>
                                      <button type="button" className="btn btn-info" style={{fontSize:'15px',width:'150px',height:'80px'}}>항공권 검색</button>
                                   </div>
                              </div>
    
                       
                               <div>
                                   {/* 인원선택 */}
                                   <PersonIcon style={{marginLeft:'150px',marginTop:'25px'}}/>
                                    
                                    <FormControl style={{width:'120px',paddingBottom:'20px',marginLeft:'20px',marginRight:'40px'}}>
                                     
                                     <InputLabel>인원</InputLabel>
                                       <Select
                                       open={value.open}
                                       onClose={this.handleClose.bind(this)}
                                       onOpen={this.state.handleOpen}
                                       value={value.seat}
                                       onChange={this.handleChange.bind(this)}
                                       >
                                                                               
                                         <MenuItem>
                                             <div className="def-number-input number-input">
                                                <button onClick={this.decrease.bind(this)} className="minus"></button>
                                                <input className="quantity" name="quantity" value={this.state.value} onChange={()=> console.log('change')}
                                                type="number" />
                                                <button onClick={this.increase.bind(this)} className="plus"></button>
                                             </div>
                                         </MenuItem>
                                         <MenuItem value={"프리미엄 일반석"}>프리미엄 일반석</MenuItem>
                                         <MenuItem value={"비지니스석"}>비지니스석</MenuItem>
                                         <MenuItem value={"일등석"}>일등석</MenuItem>
                                       </Select>
                                   </FormControl>
                                   
                                  
                                   {/* 좌석선택 */}
                                   <AirlineSeatReclineNormalIcon style={{marginTop:'25px'}}/>
                                  
                                   <FormControl style={{width:'170px',paddingBottom:'20px',marginLeft:'20px'}}>
                                     <InputLabel>좌석</InputLabel>
                                       <Select
                                       open={this.state.open}
                                       onClose={this.handleClose.bind(this)}
                                       onOpen={this.handleOpen.bind(this)}
                                       value={this.state.seat}
                                       onChange={this.handleChange.bind(this)}
                                       >
                                         <MenuItem value={"일반석"}>일반석</MenuItem>
                                         <MenuItem value={"프리미엄 일반석"}>프리미엄 일반석</MenuItem>
                                         <MenuItem value={"비지니스석"}>비지니스석</MenuItem>
                                         <MenuItem value={"일등석"}>일등석</MenuItem>
                                        
                                       </Select>
                                   </FormControl>
                                   
                               </div>
                            </div>

                            <div style={{margin:'0 auto',textAlign:'center',marginTop:'50px'}}>
                                <img src={img}/>
                            </div>
                        </TabPanel>






                        {/* 왕복 */}
                        <TabPanel value={this.state.value} index={1}>
                            <div style={{textAlign:'center',marginBottom:'50px'}}>
                                 <b style={{fontSize:'40px',marginRight:'30px'}}>김포</b>
                                 <FlightTakeoffIcon style={{width:'50px',height:'50px',color:'#00bfff',marginBottom:'25px'}}  />
                                 <b style={{fontSize:'40px',marginLeft:'30px'}}>제주</b>
                            </div>

                   
                            <div style={{border:'1px solid black'}}>
                               <div  style={{marginBottom:'20px'}}>
                          
                                   {/* 날짜선택 */}
                                   <input type="date" style={{marginRight:'60px',marginLeft:'180px'}}/>
                                   <input type="date" />
                         
                                    
                                   <div style={{float:'right',marginRight:'10px',marginBottom:'25px'}}>
                                      <button type="button" className="btn btn-info" style={{fontSize:'15px',width:'150px',height:'70px'}}>항공권 검색</button>
                                   </div>
                              </div>
    
                       
                               <div>
                                   {/* 인원선택 */}
                                   <PersonIcon style={{marginLeft:'150px'}}/><input type="form" style={{width:'138px',marginRight:'50px'}}/>
                                  
                                  {/* 좌석선택 */}
                                  <AirlineSeatReclineNormalIcon style={{marginTop:'25px'}}/>
                                  
                                  <FormControl style={{width:'140px',paddingBottom:'20px',marginLeft:'20px'}}>
                                    <InputLabel>좌석</InputLabel>
                                      <Select
                                      open={this.state.open}
                                      onClose={this.handleClose.bind(this)}
                                      onOpen={this.handleOpen.bind(this)}
                                      value={this.state.seat}
                                      onChange={this.handleChange.bind(this)}
                                      >
                                        <MenuItem value={"일반석"}>일반석</MenuItem>
                                        <MenuItem value={"프리미엄 일반석"}>프리미엄 일반석</MenuItem>
                                        <MenuItem value={"비지니스석"}>비지니스석</MenuItem>
                                        <MenuItem value={"일등석"}>일등석</MenuItem>
                                       
                                      </Select>
                                  </FormControl>
                               </div>
                            </div>

                            <div style={{margin:'0 auto',textAlign:'center',marginTop:'50px'}}>
                                <img src={img}/>
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
