import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import store from '../../../redux/store';
import moment from 'moment';


class SharePlanProfile extends Component{
    constructor(props) {
        super(props);
        //console.log("SharePlanPageComp constructor", props);

        this.state={
            profile:[]
            
        }
        

        //this.handleChange=this.handleChange.bind(this);
        
    

    
    }

    

    getProfile=()=>{
        let url=URL+"/member/getdata?id="+this.props.id;

        axios.get(url)
        .then(res=>{
            console.log(res.data);

            this.setState({
                profile:res.data
            });
        }).catch(err=>{
            console.log("프로필 오류:"+err);
          })
    }

    
    componentDidUpdate(){
        this.getProfile();
      
    }



    render(){
        var birth1=this.state.profile.birth;
        var today=moment();
        var age=today.diff(birth1,'year')+1;
        
        return(
            <div>
                <span  style={{position:"relative",right:300,fontSize:30}}>{this.state.profile.gender}<br/>
                    {age}살
                </span>
                
                
            <div className="slide-list-item">
                
               
                
            </div>
           </div>
        )
    }


}


export default SharePlanProfile;