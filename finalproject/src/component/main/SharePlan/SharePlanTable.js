import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import './SharePlanCss.css';
import Box from '@material-ui/core/Box';
import profile from './Img_profile.png';
import moment from 'moment';
import SharePlanTableSub from './SharePlanTableSub';
import Grid from '@material-ui/core/Grid';

class SharePlanTable extends Component {

    constructor(props) {
        super(props);

        this.state={
            clist:[],
            id:'',
            profile:[],
            comment:'',
            photoCheck: false,
            wishday: ''
        }
    }

     setName=(com, day)=>{
        this.setState({
            comment: com,
            wishday: day
        })
        // this.getProfile();
    }

    getGroupData=()=>{
        let url=URL+"/plan/groupdata?groupnum="+this.props.row.groupNum;
        //console.log("그룹넘버 : " + this.props.row.groupNum);
        axios.get(url)
        .then(res=>{
            // console.log(res.data[0].memId);

            this.setState({
                clist:res.data,
                id: res.data[0].memId
            });

            this.getProfile();
        }).catch(err=>{
            console.log("목록 오류:"+err);
          })
    }

    componentDidMount(){
        this.getGroupData();
    }

    getProfile=()=>{
        let url=URL+"/member/getdata?id=" + this.state.id;

        axios.get(url)
        .then(res=>{
            //console.log("profile : " + res.data);

            if(res.data.photo.substring(0,4)=='http'){
                this.setState({
                    photoCheck: true
                })
            }
            this.setState({
                profile:res.data
            });
        }).catch(err=>{
            console.log("프로필 오류:"+err);
          })
    }

    render(){
        const {row}=this.props.row;
        const {day}=this.props.day;
        var birth1=this.state.profile.birth;
        var today=moment();
        var age=today.diff(birth1,'year')+2;
        var profileImg = this.state.profile.photo=="no"?profile:
                        this.state.photoCheck?this.state.profile.photo: URL + "/" + this.state.profile.photo;
        return(
            <div className="SharePlanTable">
                <div style={{textAlign: 'left'}} className="SharePlanTableTitle">
                    <strong style={{color: '#036E38'}}>{this.state.id}</strong>&nbsp;님의<br/>
                    <strong style={{color: '#036E38'}}>{this.state.wishday}</strong> 일정입니다.
                </div>
                <br/>
                    <Box
                                display="flex"
                                flexWrap="wrap"
                                justifyContent="center"
                                width="100%"
                                className="SharePlanTableBox"
                            >
                            <Grid item xs={3}>
                                <Box className="SharePlanProfile">
                                    <div>
                                        <img src={profileImg} onError={(e) => {
                                            console.log("img error");
                                            e.target.src = profile;
                                        }}/>
                                        <strong>{this.state.id}</strong><br/>
                                        <strong>{this.state.profile.gender==null?"비공개":this.state.profile.gender} / {this.state.profile.birth==null?"비공개":age + "세"}</strong><br/>
                                    </div>
                                    <div className="balloon">
                                        <div>
                                            {this.state.comment}
                                        </div>
                                    </div>
                                </Box>
                                <Box className="SharePlanProfile2">
                                    
                                    <div className="SharePlanTimeline">
                                        {this.state.clist.map((row)=>(
                                            <SharePlanTableSub row={row} day={day} setName={this.setName.bind(this)}></SharePlanTableSub>
                                        ))}
                                    </div>
                                </Box>
                            </Grid>
                    </Box>
                <br/>
            </div>
        )
    }
}

export default SharePlanTable;