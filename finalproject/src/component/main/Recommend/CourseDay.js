import React,{Component} from 'react';
import {URL} from "../../../redux/config";
import axios from 'axios';
import store from '../../../redux/store';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import CourseItem from './CourseItem'

class CourseDay extends Component {

    constructor(props){
        super(props);

        this.state={
            list: []
        }
    }
    
    getList=()=>{
        let url = URL + "/hotspot/list?groupNum="+this.props.groupNum+"&day="+this.props.day;
        // console.log(url)
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

    render() {
        
        return (
            <span>
                <b>Day {this.props.day}</b><br/>
                {this.state.list.map((row)=>(
                    <CourseItem title={row.title} img={row.img}/>
                ))}
                <br/>
            </span>
        );
    }
}

export default CourseDay;