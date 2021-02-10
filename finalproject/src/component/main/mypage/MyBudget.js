import React, {Component} from "react";
import {URL} from '../../../redux/config';
import MyBudgetItem from "./MyBudgetItem";
import axios from 'axios';
import {WOW} from 'wowjs';
import store from '../../../redux/store'; 
import Button from '@material-ui/core/Button';

class MyBudget extends Component {
    constructor(props) {
        super(props);
        console.log("MyBudget constructor", props);
        this.state={
            listData:[],
            wishday1:'',
            wishday2:'',
        };
    }

    list=()=>{
        let memId = store.getState().loginId;        
        let wishday1 = this.refs.wishday1.value;
        let wishday2 = this.refs.wishday2.value;
        let url = URL + "/wish/budget?memId="+memId+"&wishday1="+wishday1+"&wishday2="+wishday2;
        let url2 = URL + "/wish/budgetsum?memId="+memId+"&wishday1="+wishday1+"&wishday2="+wishday2;

        console.log(url2);
        // console.log(wishday2);
        // console.log(wishday1);

        axios.get(url)
        .then(res=>{
            console.log(res.data);
            this.setState({
                listData:res.data
            })
        }).catch(err=>{
            console.log("wishlist 오류 : " + err);
        })

        axios.get(url2)
        .then(res=>{
            console.log(res.data);
            this.setState({
                sumData:res.data
            })
        }).catch(err=>{
            console.log("wishlistsum 오류 : " + err);
        })
    }

    // modal 함수
    handleOpen = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            this.setState({
                open: true
            })
        }
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    render() {
        return (
            <div>
                <div className="dayselect">
                🗓&nbsp;&nbsp;<b>시작일</b>
                <input type="date" class="form-control form-control-sm" ref="wishday1"></input>
                🗓&nbsp;&nbsp;<b>종료일</b>
                <input type="date" class="form-control form-control-sm" ref="wishday2"></input>
                </div>
                <Button color="primary" onClick={this.list.bind(this)}>검색</Button>
                <div id="MyBudgetTable">
                    <table className="table table-hover" id="MyBudgetMainTable">
                        <thead style={{backgroundColor: '#fafafa'}}>
                            <tr style={{textAlign: 'center'}}>
                                {/* <td style={{width:'5%'}}>#</td> */}
                                <td style={{width:'50%'}}>한것</td>
                                <td style={{width:'25%'}}>일시</td>
                                <td style={{width:'25%'}}>비용</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listData.map((row, idx)=>(
                                    <MyBudgetItem row={row} key={idx} history={this.props.history}/>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>합계 : {this.state.sumData} 원</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}

export default MyBudget;
