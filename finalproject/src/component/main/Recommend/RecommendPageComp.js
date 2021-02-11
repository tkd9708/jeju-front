import React, { Component } from 'react';
import store from '../../../redux/store';
import axios from 'axios';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import {MDBBtn} from 'mdbreact';
import {URL} from "../../../redux/config";
import Course from './Course';

class RecommendPageComp extends Component{
    
    constructor(props){
        super(props);

        this.state={
            list: [],
        }
    }
    
    getList=()=>{
        let url = URL + "/hotspot/group";

        axios.get(url)
            .then(res=>{
                this.setState({
                    list: res.data
                })
                console.log(res.data);
            })
            .catch(err=>{
                console.log("코스추천 list 오류 : " + err);
            })
    }

    componentWillMount(){
        this.getList();
    }

    render(){
        
        return(
            <span>
                {this.state.list.map((row, idx)=>(
                    <Course groupNum={row.groupNum}></Course>
                ))}
            </span>
        )
    }
}

export default RecommendPageComp;