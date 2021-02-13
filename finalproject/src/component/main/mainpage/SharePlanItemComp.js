import React, {Component} from "react";
import './EtcBoardComp.css';
import axios from "axios";
import {URL} from "../../../redux/config";
import moment from 'moment';
import profile from '../SharePlan/Img_profile.png';

class SharePlanItemComp extends Component{
    constructor(props) {
        super(props);

        this.state={
            user:[],
            isphoto:false
        }
        
    }

    getUser=()=>{
        let url=URL+"/member/getdata?id="+this.props.row.memId;

        axios.get(url)
        .then(res=>{
            //console.log("profile : " + res.data);

            if(res.data.photo.substring(0,4)=='http'){
                this.setState({
                    isphoto: true
                })
            }
            this.setState({
                user:res.data
            });
        }).catch(err=>{
            console.log("프로필 오류:"+err);
          })
    }

    componentDidMount(){
        this.getUser();
    }


    render(){
        const {row} = this.props;
        var birth=this.state.user.birth;
        var today=moment();
        var age=today.diff(birth,'year')+2;
        var userImg= this.state.user.photo=="no"?profile:
        this.state.isphoto?this.state.user.photo: URL + "/" + this.state.user.photo;

        return(
            <div className="SharePlanitemBox" style={{
                cursor: 'pointer',
                
            }}
                 onClick={()=>{this.props.history.push("/shareplan/" + row.groupNum)}}
            >
                
                <div className="SharePlanitemTitle"
                     style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                > 
                <img src={userImg} style={{width:70}} onError={(e) => {
                                    console.log("img error");
                                    e.target.src = profile;
                                }}/>  <span className="SharePlanProfile">{row.memId}
                                {this.state.user.gender===null?'':"/"+this.state.user.gender}{this.state.user.birth===null?'':"/"+age+"세"}</span>
                    
                       
                    <br/>
                </div>
               
                <div className="SharePlanitemContentDiv">
                    <p className="SharePlanitemContent"
                       style={{fontWeight: '500',  overflow: 'hidden'}}
                    >   {row.comment}
                    </p>
                    
                </div>
               
                
            </div>
        )
    }
}

export default SharePlanItemComp;