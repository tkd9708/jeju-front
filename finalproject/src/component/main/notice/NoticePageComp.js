import React, {Component} from "react";
import PlusImg from "../../../image/plus.png";
import BoardItem from "./BoardItem";
import axios from 'axios';
import './NoticeCss.css';
import {URL} from '../../../redux/config';
import BoardForm from './BoardForm';
import NoticeContent from './NoticeContent';

class NoticePageComp extends Component {
    state={
        maxNo:7,
        listData:[]
        
    }

    list=()=>{
        let url=URL + "/notice/list";
        console.log(url);

        axios.get(url)
        .then(res=>{
            this.setState({
                listData:res.data
            })
        })
    }

    // handelSave=(data)=>{
    //     console.dir(data);

    //     this.setState({
    //         maxNo:++this.state.maxNo,
    //         boards:this.state.boards.concat({
    //             brdno:this.state.maxNo,
    //             brddate:new Date(),
    //             brdtitle: data.brdtitle
    //         })
    //     })
    // }

    componentWillMount()
    {
        this.list();
    }
    render() {
        const {boards}=this.state;

    
        return (
            <div>
                {/*<a href="#NoticeMiniComp">{this.props.name}</a>*/}
                <BoardForm list={this.list.bind(this)}/>
                <br/>
                {this.props.name}<br/>
                <button>
                    <img src={PlusImg}
                         style={{width: "50px"}}
                    />
                </button>
                <table style={{width:'400px'}} id="noticeTable">
                    <caption><b>공지사항</b></caption>
                    <thead>
                    <tr style={{backgroundColor:'orange'}}>
                        <th style={{width:'60px'}}>#</th>
                        <th style={{width:'200px'}}>제목</th>
                        <th style={{width:'50px'}}>작성일</th>
                        <th style={{width:'50px'}}>⭐</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.listData.map((row,idx)=>(
                        <BoardItem row={row} key={idx} idx={idx}
                        history={this.props.history}/>
                        ))
                    }
                    {/* <tr>
                        <td>
                            <a href="#">
                                <span>1제목 입니다.</span>
                            </a>
                        </td>
                        <td>1작성일 입니다.</td>
                    </tr>
                    <tr>
                        <td>
                            <a href="#">
                                <span>2제목 입니다.</span>
                            </a>
                        </td>
                        <td>2작성일 입니다.</td>
                    </tr>
                    <tr>
                        <td>
                            <a href="#">
                                <span>3제목 입니다.</span>
                            </a>
                        </td>
                        <td>3작성일 입니다.</td>
                    </tr> */}
                    </tbody>
                </table>

                    {/* <NoticeContent/> */}
            </div>
        )
    }

}

export default NoticePageComp;
