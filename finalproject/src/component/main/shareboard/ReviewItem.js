import React, {Component, useState} from 'react';
import {actionType, boardActionType, URL} from "../../../redux/config";
import axios from "axios";
import store from "../../../redux/store";
import {MDBBtn} from "mdbreact";

class ReviewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            saveType: "",
        }

    }

    onTriggerInput = (type = null) => {

        const {row} = this.props;
        var className = `.input_answer_${row.regroup}_${row.relevel}_${row.restep}`;
        console.log(className);

        let divInput = document.querySelector(className);

        // if (this.state.saveType == type) {
        //통신 끝나고 들어온건지, 댓글쓰기/수정 버튼눌러 들어온건지.
        if (type != null) {
            if (this.state.saveType == type) {
                if (this.state.isOpen) {
                    divInput.style.display = "none";
                    this.setState({
                        isOpen: false,
                    });
                } else {
                    divInput.style.display = "block";
                    this.setState({
                        isOpen: true,
                        saveType: type,
                    });
                }
            } else {
                divInput.style.display = "block";
                this.setState({
                    isOpen: true,
                    saveType: type,
                });
            }
        } else {
            divInput.style.display = "none";
            this.setState({
                isOpen: false,
                saveType: "",
            });
        }
    }

    onSaveButton = () => {
        console.log(this.state.saveType);
        if (this.state.saveType == "insert") {
            this.onInsertSubAnswer();
        } else if (this.state.saveType == "update") {
            this.onUpdateSubAnswer();
        }
    }

    onInsertSubAnswer = () => {
        // 리뷰 대댓글 추가.
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let relevel = this.props.row.relevel;
        let restep = this.props.row.restep;
        let content = this.refs.content.value;
        let id = store.getState().loginId;
        let star = 0;

        let url = URL + "/share/insert" +
            "?" +
            "relevel=" + relevel +
            "&restep=" + restep +
            "&regroup=" + regroup;

        let data = {
            num: num,
            content: content,
            star: star,
            id: id,
        }

        console.log(url, data);

        axios.post(url, data
        ).then(res => {
            console.log("onInsertAnswer res", res);
            store.dispatch({
                type: actionType.shareBoardUpdate,
            });
            this.onTriggerInput();
            this.refs.content.value = "";
        }).catch(err => {
            console.log("onInsertAnswer err", err);
        })
    }

    onDeleteSubAnswer = () => {
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let url = URL + "/share/deleteanswer" +
            "?num=" + num;

        console.log("onDeleteData", url);

        if (window.confirm("삭제하시겠습니까?")) {
            axios.post(url
            ).then(res => {
                console.log("onDeleteData() res", res);
                store.dispatch({
                    type: actionType.shareBoardUpdate,
                });
                // this.props.history.push("/share");
            }).catch(err => {
                console.log("onDeleteData() err", err);
            });
        }
    }

    onUpdateSubAnswer = () => {
        let num = this.props.row.num;
        let content = this.refs.content.value;
        let url = URL + "/share/updateanswer" +
            "?num=" + num +
            "&content=" + content;
        console.log("onUpdateSubAnswer", url);

        if (window.confirm("수정하시겠습니까?")) {
            axios.post(url
            ).then(res => {
                console.log("onUpdateSubAnswer() res", res);
                store.dispatch({
                    type: actionType.shareBoardUpdate,
                });
                // this.props.history.push("/share");
                this.refs.content.value = "";
                this.onTriggerInput();
            }).catch(err => {
                console.log("onUpdateSubAnswer() err", err);
            });
        }
    }

    getIsDisableAnswerButton = (row, actionType = null) => {
        // disabled={row.content.includes("삭제된 글입니다.") ? true : false}
        // console.log(row.id, store.getState().loginId, actionType);
        if (actionType == boardActionType.write) {
            return false;
        } else {
            if (row.content.includes("삭제된 글입니다.")) {
                return true;
            } else if (row.id != store.getState().loginId) {
                return true;
            }
        }

        return false;
    }

    /*
        addr: null
        content: "댓글 수정 가능한지."
        id: null
        likes: 0
        num: "488"
        photo: "no"
        regroup: 476
        relevel: 1
        restep: 3
        star: "0"
        subject: null
        writeday: "2021-02-04"
    */
    render() {
        const {row} = this.props;
        // console.log(row);
        return (
            <div style={{marginLeft: `calc(30px*${row.relevel})`}}>
                num:{row.num} / {row.photo} / id:{row.id}
                / {row.regroup} / {row.relevel} / {row.restep} / 내용 :
                <div style={{border: "1px solid", margin: "5px"}}>
                    {row.content}
                </div>
                <MDBBtn size="sm" color="deep-orange"
                        onClick={this.onTriggerInput.bind(this, "insert")}
                        disabled={this.getIsDisableAnswerButton(row, boardActionType.write)}
                ><b style={{fontSize: '12px'}}>댓글 쓰기</b>
                </MDBBtn>
                &nbsp;
                <MDBBtn size="sm" color="deep-orange"
                        onClick={this.onTriggerInput.bind(this, "update")}
                        disabled={this.getIsDisableAnswerButton(row)}
                ><b style={{fontSize: '12px'}}>댓글 수정</b>
                </MDBBtn>
                &nbsp;
                <MDBBtn size="sm" color="deep-orange"
                        onClick={this.onDeleteSubAnswer.bind(this)}
                        disabled={this.getIsDisableAnswerButton(row)}
                ><b style={{fontSize: '12px'}}>댓글 삭제</b>
                </MDBBtn>

                {/*댓글 입력창 on/off*/}
                <div className={`input_answer_${row.regroup}_${row.relevel}_${row.restep}`}
                     style={{
                         display: "none",
                     }}
                >
                    <textarea
                        placeholder={(this.state.saveType == "insert")
                            ? "댓글을 입력하세요"
                            : "수정할 댓글을 입력하세요"}
                        id="shareInputAnswer"
                        className="form-control"
                        style={{width: '800px', height: '100px', float: 'left'}}
                        ref="content"
                    />
                    <MDBBtn size="sm" color="deep-orange"
                            style={{width: '160px', height: '90px', marginLeft: '13px'}}
                            onClick={this.onSaveButton.bind(this)}
                    ><b style={{fontSize: '18px'}}>저 장</b>
                    </MDBBtn>
                </div>
                <hr/>
            </div>
        )
    }
}

export default ReviewItem;
