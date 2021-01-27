import React, {Component, useState} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardUpdateForm from "./ShareBoardUpdateForm";
import Modal from './Modal';
import axios from "axios";
import {actionType, URL} from '../../../redux/config';
import ShareReview from './ShareReview';
import store from "../../../redux/store";
import Box from '@material-ui/core/Box';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BuildIcon from '@material-ui/icons/Build';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import './Share.css';

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
        // console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`);
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

    onInsertAnswer = () => {
        // 원본 리뷰글의 댓글
        // regroup 현재꺼 / relevel 1 / restep 현재꺼 /
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
        }).catch(err => {
            console.log("onInsertAnswer err", err);
        })

    }

    openModal = () => {
        this.setState({modalOpen: true})
    }

    closeModal = () => {
        this.setState({modalOpen: false})
    }

    // componentDidUpdate() {
    //     console.log("state변경");
    // }


    render() {
        const {row} = this.props;
        //스크롤
        const {
            scrollTop
        } = this.state

       

         

        return (
            
            <div>
                <React.Fragment>
                  
                   <Box m={1} id="ShareListBox">
                    <div>
                     {/* onClick={this.openModal.bind(this)}  */}
                        
                        <div id="ShareImg" onClick={this.openModal.bind(this)}>
                              {row.photo}
                        </div>
                             
                        <div id="ShareListSubject"  onClick={this.openModal.bind(this)}>
                              {row.subject}      
                        </div>

                        <div id="ShareContentDiv">
                            <div id="ShareContent">평점:{row.star}</div>
                            <div>주소:{row.addr}</div>
                        </div>
                        <div>
                            <div style={{width: '400px', height: '65px',backgroundColor:'#FaFaFa'}}>
                              {/* 좋아요 버튼 */}
                              <ThumbUpAltIcon id="ShareThumbIcon"/>

                              
                              {/* 삭제 버튼 */}
                              <DeleteForeverIcon  id="DeleteButton" onClick={this.onDeleteData.bind(this)}/>
                             

                              <Link to={`/share/update/${this.props.row.num}`}>
                              <BuildIcon id="UpdateButton"/>
                              </Link>
                              
                                              
                            </div>
                        </div>
                    </div>
                    </Box>
                   

                    {/* //header 부분에 텍스트를 입력한다. */}
                    <Modal open={this.state.modalOpen} close={this.closeModal.bind(this)} title="share">

                        {/* // Modal.js <main> { props.children } </main>에 내용이 입력된다.  */}
                        <div id="ShareModalAll" ref={this.myRef} onScroll={this.onScroll}>
                             
                            <div style={{width:"1150px",height:"140px"}}> 
                                <div style={{float:'left'}}>
                                 {/* 좋아요 버튼 */}
                                 <ThumbUpAltIcon id="ShareModalThumbIcon"/>
                                 
                                <p style={{marginTop:"10px",marginBottom:'45px'}}>(작성자) 님이 공유하신 맛집입니다.</p>

                                <b>맛집이름:{row.subject}</b>
                                </div>
                                
                                {/* 찜하기 버튼 */}
                                <div id="ShareHeart" className="heart"></div>

                                
                            </div>

                            <div id="ShareModalMidBox">
                                <div id="ShareModalImg">{row.photo}</div>
                                   
                                
                                <div id="ShareModalContent">
                                    <div id="ShareModalContent1">평점:{row.star}</div>
                                    <div id="ShareModalContent2">주소:{row.addr}</div>
                                    <div id="ShareModalContent3">리뷰:{row.content}</div>
                                    <div id="ShareModalContent4">작성일:{row.writeday}</div>
                                </div>
                            </div>


                            <div id="ShareReviewWrite">
                                <div>
                                    <div style={{float: 'left'}}>ID</div>

                                    {/* 댓글 이미지 추가 아이콘 */}
                                    <AddAPhotoIcon id="ShareReviewPhotoIcon"/>
                                </div>

                                <div>
                                    <div>
                                        <textarea placeholder="댓글을 입력하세요"
                                                  style={{width: '900px', height: '100px', float: 'left'}}
                                                  ref="content"
                                        />
                                    </div>

                                    <div>
                                    <button type="button" className="btn btn-warning" id="ShareReviewSave" 
                                    onClick={this.onInsertAnswer.bind(this)}><b>작&nbsp;성</b></button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ShareReview regroup={row.regroup}
                                />
                            </div>
                        </div>
                    </Modal>
                </React.Fragment>
            </div>
        )
    }

}


export default ShareBoardRowItem

