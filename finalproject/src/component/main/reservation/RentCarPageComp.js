import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import RentCarItem from './RentCarItem';

class RentCarPageComp extends Component {
    state={
        listData:[] 
    }
    constructor(props) {
        super(props);
        console.log("RentCarPageComp constructor", props);
    }

    list=()=>{
        let url= URL + "/reservation/carlist";
        console.log(url);

        axios.post(url)
        .then(res=>{
            this.setState({
                listData:res.data
            })
        })
    }

    render() {
        return (
            <div>
                <table style={{width:'900px'}} id="rentcarTable">
                    <caption><b>렌트카 업체명</b></caption>
                    <thead>
                        <tr>
                            <th style={{width:'50px'}}>번호</th>
                            <th style={{width:'200px'}}>업체명</th>
                            <th style={{width:'100px'}}>사업장</th>
                            <th style={{width:'300px'}}>주소</th>
                            <th style={{width:'80px'}}>차량수</th>
                            <th style={{width:'100px'}}>시작시간</th>
                            <th style={{width:'100px'}}>종료시간</th>
                            <th style={{width:'200px'}}>홈페이지</th>
                            <th style={{width:'100px'}}>전화번호</th>
                            <th style={{width:'100px'}}>확인일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.listData.map((row,num)=>(
                        <RentCarItem row={row} key={num} num={num}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default RentCarPageComp;
