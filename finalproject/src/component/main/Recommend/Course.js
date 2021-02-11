import React,{Component} from 'react';
import {URL} from "../../../redux/config";
import axios from 'axios';
import store from '../../../redux/store';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import CourseDay from './CourseDay';
import Button from '@material-ui/core/Button';

class Course extends Component {

    constructor(props){
        super(props);

        this.state={
            list: [],
        }
    }
    
    getList=()=>{
        let url = URL + "/hotspot/day?groupNum=" + this.props.groupNum;

        axios.get(url)
            .then(res=>{
                this.setState({
                    list: res.data
                })
            })
            .catch(err=>{
                console.log("코스추천 day list 오류 : " + err);
            })
    }

    componentWillMount(){
        this.getList();
    }

    render() {
        
        return (
            <span>
                <Button color="primary" autoFocus>
                일정 찜하기
                </Button><br/>
                {this.state.list.map((row, idx)=>(
                    <CourseDay groupNum={this.props.groupNum} day={row.day}/>
                    
                ))}
                
                <br/>
            </span>
        );
    }
}


export default Course;