import React, {Component, useState} from 'react';
import {actionType, URL} from "../../../redux/config";
import axios from "axios";
import store from "../../../redux/store";

class ReviewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }

    }

    onTriggerInput = () => {
        const {row} = this.props;
        var className = `.input_answer_${row.regroup}_${row.relevel}_${row.restep}`;
        console.log(className);
        let divInput = document.querySelector(className);

        if (this.state.isOpen) {
            divInput.style.display = "none";
            this.setState({
                isOpen: false,
            });
        } else {
            divInput.style.display = "block";
            this.setState({
                isOpen: true,
            });
        }
    }

    onInsertSubAnswer = () => {
        // 리뷰 대댓글 추가.
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let relevel = this.props.row.relevel;
        let restep = this.props.row.restep;
        let content = this.refs.content.value;
        let star = 0;
        let url = URL + "/share/insert" +
            "?" +
            "relevel=" + relevel +
            "&restep=" + restep +
            "&regroup=" + regroup;
        let data = {
            num: num,
            // regroup: regroup,
            // relevel: relevel,
            // restep: restep,
            content: content,
            star: star,
        }

        console.log(url, data);

        axios.post(url, data
        ).then(res => {
            console.log("onInsertAnswer res", res);
            store.dispatch({
                type: actionType.shareBoardUpdate,
            });
            this.onTriggerInput();
        }).catch(err => {
            console.log("onInsertAnswer err", err);
        })
    }

    render() {
        const {row} = this.props;

        return (
            <div style={{marginLeft: `calc(30px*${row.relevel})`}}>
                {row.photo} / {row.regroup} / {row.relevel} / {row.restep} /<br/>
                내용 :
                <div style={{border: "1px solid", margin: "5px"}}>
                    {row.content}
                </div>
                <button type="button"
                        onClick={this.onTriggerInput.bind(this)}
                >댓글 쓰기
                </button>

                {/*댓글 입력창 on/off*/}
                <div style={{display: 'none'}} className={`input_answer_${row.regroup}_${row.relevel}_${row.restep}`}>
                    <textarea placeholder="댓글을 입력하세요"
                              style={{width: '800px', height: '100px'}}
                              ref="content"
                    />
                    <button type="button"
                            onClick={this.onInsertSubAnswer}
                    >저장
                    </button>
                </div>
                <hr/>
            </div>
        )
    }
}

export default ReviewItem;
