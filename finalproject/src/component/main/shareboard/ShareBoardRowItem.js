import React, {Component, useState} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardUpdateForm from "./ShareBoardUpdateForm";
import Modal from './Modal';
import axios from "axios";
import {actionType, URL} from '../../../redux/config';
import ShareReview from './ShareReview';
import store from "../../../redux/store";

/*
row:
    addr: "제주시 제주동 제주읍 제주리 제주제주"
    content: "맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다.↵맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다↵맛있습니다. 맛있습니다. 맛있습니다. 맛있습니다"
    id: "hee0134"
    likes: 0
    num: "422"
    photo: "jeju20210122102347.png"
    regroup: 422
    relevel: 0
    restep: 0
    star: "4"
    subject: "제주도 맛집맛집"
    writeday: "2021-01-22"
 */
class ShareBoardRowItem extends Component {

    state = {
        modalOpen: false

    }

    constructor(props) {
        super(props);
        console.log("constructor", this.props);
        //스크롤
        this.myRef = React.createRef()
        this.state = {scrollTop: 0}
    }


    //스크롤
    onScroll = () => {
        const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
        const scrollTop = this.myRef.current.scrollTop
        console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`);
        this.setState({
            scrollTop: scrollTop
        })
    }


    //삭제하는 함수 이벤트
    onDeleteData = (e) => {
        e.preventDefault();
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let url = URL + "/share/delete";
        let data = {
            num: num,
            regroup: regroup,
        }

        // console.log("onDeleteData", url, data);

        if (window.confirm("삭제하시겠습니까?")) {
            axios.post(url, data
            ).then(res => {
                // console.log("onDeleteData() res", res);
                store.dispatch({
                    type: actionType.shareBoardUpdate,
                });
                this.props.history.push("/share");
            }).catch(err => {
                console.log("onDeleteData() err", err);
            });
        }
    }

    onInsertData = () => {
        let url = URL + "/share/insert";

        axios.insert(url)
            .then(res => {
                this.insert = res.data;
                this.getList();
            })

    }

    openModal = () => {
        this.setState({modalOpen: true})
    }

    closeModal = () => {
        this.setState({modalOpen: false})
    }

    componentDidUpdate() {
        console.log("state변경");
    }


    render() {
        const {row} = this.props;
        //스크롤
        const {
            scrollTop
        } = this.state

        return (
            <div>
                <React.Fragment>
                    <div style={{
                        border: '1px solid black',
                        width: '400px',
                        height: '450px',
                        margin: '80px',
                        float: 'left',
                        cursor: 'pointer'
                    }}
                        // onClick={this.openModal.bind(this)}
                    >

                        <div style={{borderBottom: '1px solid black', width: '400px', height: '250px'}}
                             onClick={this.openModal.bind(this)}
                        >{row.photo}</div>


                        <div style={{
                            borderBottom: '1px solid black',
                            width: '400px',
                            height: '50px',
                            alignItems: 'center'
                        }}
                             onClick={this.openModal.bind(this)}
                        >맛집이름:{row.subject}</div>
                        <div style={{borderBottom: '1px solid black', width: '400px', height: '100px'}}>
                            <div>평점:{row.star}</div>
                            <div>주소:{row.addr}</div>
                        </div>
                        <div>
                            <div style={{width: '400px', height: '50px'}}>
                                <div style={{float: 'left'}}>조회수:{row.readcount}</div>
                                <button type="button" style={{float: 'right'}}
                                        onClick={this.onDeleteData.bind(this)}
                                >삭제
                                </button>
                                <Link to={`/share/update/${this.props.row.num}`}>
                                    <button type="button" style={{float: 'right'}}
                                    >수정
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* //header 부분에 텍스트를 입력한다. */}
                    <Modal open={this.state.modalOpen} close={this.closeModal.bind(this)} title="share">

                        {/* // Modal.js <main> { props.children } </main>에 내용이 입력된다.  */}
                        <div style={{
                            border: '1px solid black',
                            width: '1150px',
                            height: '700px',
                            margin: 'auto',
                            overflow: 'scroll'
                        }}
                             ref={this.myRef} onScroll={this.onScroll}>

                            <div style={{borderBottom: '1px solid black', height: '50px'}}>
                                <div style={{float: "left"}}><input type="button" value="좋아요"/></div>
                                <div style={{float: "left"}}>(작성자) 님이 공유하신 맛집입니다.</div>
                                <div style={{float: "right"}}>
                                    <input type="button" value="찜하기"/>
                                </div>
                            </div>

                            <div style={{borderBottom: '1px solid black', width: '1150px', height: '400px'}}>
                                <div style={{
                                    borderBottom: '1px solid black',
                                    borderRight: '1px solid black',
                                    width: '550px',
                                    height: '400px',
                                    float: 'left'
                                }}>{row.photo}</div>


                                <div style={{borderLeft: '1px solid black', width: '600x', float: 'right'}}>
                                    <div style={{width: '550px', height: '50px'}}>평점:{row.star}</div>

                                    <div style={{width: '550px', height: '50px'}}>주소:{row.addr}</div>

                                    <div style={{
                                        width: '550px',
                                        height: '200px',
                                        marginTop: '50px'
                                    }}>리뷰:{row.content}</div>

                                    <div style={{width: '550px', height: '50px'}}>작성일:{row.writeday}</div>
                                </div>

                            </div>


                            <div style={{
                                borderBottom: '1px solid black',
                                width: '1150px',
                                height: '130px',
                                marginTop: '20px'
                            }}>


                                <div style={{marginLeft: "20px"}}>
                                    <div style={{float: 'left'}}>id</div>

                                    <div style={{float: 'left', marginRight: '100px'}}>
                                        <input type="button" className="glyphicon glyphicon-camera" value="이미지"/>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <textarea placeholder="댓글을 입력하세요"
                                                  style={{width: '800px', height: '100px', float: 'left'}}/>
                                    </div>
                                    <div style={{float: 'left', marginLeft: '50px'}}>
                                        <button type="button" onClick={this.onInsertData.bind(this)}>저장</button>
                                    </div>
                                </div>

                            </div>

                            <div>
                                <ShareReview regroup={row.regroup}/>
                            </div>


                        </div>
                    </Modal>

                </React.Fragment>


            </div>


        )
    }

}


export default ShareBoardRowItem

