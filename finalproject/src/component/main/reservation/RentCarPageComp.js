import React, {Component} from "react";
import {URL} from '../../../redux/config';
import RentCarItem from "./RentCarItem";
import axios from 'axios';

class RentCarPageComp extends Component {
    constructor(props) {
        super(props);
        console.log("RentCarPageComp constructor", props);
        this.state={
            listData:[]
        };
    }

    list=()=>{
        let url= URL + "/reservation/carlist";
        console.log(url);

        axios.get(url)
        .then(res=>{
            this.setState({
                listData:res.data
            })
        }).catch(err=>{
            console.log("렌트카 list 오류 : " + err);
        })
    }

    componentWillMount()
    {
        this.list();
    }

    render() {
        return (
            <div>
                <b>렌트카 업체 목록</b>
                <table className="table table-bordered" style={{width:'1350px'}}>
                    <thead>
                        <tr>
                            <td style={{width:'50px'}}>#</td>
                            <td style={{width:'150px'}}>업체명</td>
                            <td style={{width:'100px'}}>구분</td>
                            <td style={{width:'200px'}}>주소</td>
                            <td style={{width:'90px'}}>차량대수</td>
                            <td style={{width:'90px'}}>시작시간</td>
                            <td style={{width:'90px'}}>종료시간</td>
                            <td style={{width:'150px'}}>홈페이지</td>
                            <td style={{width:'150px'}}>전화번호</td>
                            <td style={{width:'150px'}}>확인일</td>
                            <td style={{width:'150px'}}>일정추가</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.listData.map((row, num)=>(
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
