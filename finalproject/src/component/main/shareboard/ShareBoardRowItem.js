import React, {Component, useState} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardUpdateForm from "./ShareBoardUpdateForm";
import Modal from './Modal';
import axios from "axios";
import {actionType, mainViewType, URL} from '../../../redux/config';
import ShareReview from './ShareReview';
import store from "../../../redux/store";
import Box from '@material-ui/core/Box';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SmsIcon from '@material-ui/icons/Sms';
import TextsmsIcon from '@material-ui/icons/Textsms';
import {withStyles} from '@material-ui/core/styles';
import {MDBBtn} from "mdbreact";
import './Share.css';
import {Delete} from "@material-ui/icons";
// import "../tour/TourCss.css"
import imgX from "../../../image/imgX.png";

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

    addr: ""
    content: "맛있습니다"
    id: null
    likes: 0
    num: "474"
    photo: "jeju20210129150010.jpg"
    regroup: 473
    relevel: 0
    restep: 0
    star: "0"
    subject: "해녀촌"
    writeday: "2021-01-30"
 */

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);


class ShareBoardRowItem extends Component {

    state = {
        modalOpen: false

    }

    constructor(props) {
        super(props);
        console.log("constructor", this.props);
        //스크롤
        this.myRef = React.createRef()
        this.state = {
            scrollTop: 0,
            answerCount: 0,
        }

        store.dispatch({
            type: actionType.setMainView,
            mainView: mainViewType.ShareBoard,
        });

        this.getAnswerCount();
    }

    getAnswerCount = () => {
        let num = this.props.row.num;
        let url = URL + "/share/answercount" +
            "?num=" + num;

        axios.get(url
        ).then(res => {
            console.log("getAnswerCount() res", res);
            this.setState({
                answerCount : res.data
            });
        }).catch(err => {
            console.log("getAnswerCount() err", err);
        });
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

                //메인 페이지 또는 공유 페이지인지에 따라 다르게 적용.
                // if(store.getState().mainView == mainViewType.ShareBoard){
                //     this.props.history.goBack();
                // } else{
                window.location.reload();
                // }

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
            this.getAnswerCount();
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


    getItemBottomLikeBox = (row) => {
        let itemBottomBtnDiv = null;

        if (store.getState().logged && store.getState().loginId == row.id) {
            itemBottomBtnDiv = (
                <div
                    id="DivItemLikeBox"
                >
                    {/* 좋아요 버튼 */}
                    <ThumbUpAltIcon
                        id="ShareThumbIcon"
                        onClick=""
                    />&nbsp;{row.likes}&nbsp;

                    <SmsIcon
                        id="ShareThumbIcon"
                        onClick=""
                    />&nbsp;{this.state.answerCount}&nbsp;

                    {/* 삭제 버튼 */}
                    <DeleteIcon
                        id="DeleteButton"
                        onClick={this.onDeleteData.bind(this)}
                    />

                    {/* modify 버튼 */}
                    <BuildIcon
                        id="UpdateButton"
                        onClick={() => {
                            this.props.history.push(`/share/update/${this.props.row.num}/${this.props.currentPage}`);
                        }}
                    />
                </div>
            )
        } else {
            itemBottomBtnDiv = (
                <div
                    id="DivItemLikeBox"
                >
                    {/* 좋아요 버튼 */}
                    <ThumbUpAltIcon
                        id="ShareThumbIcon"
                        onClick=""
                    />&nbsp;{row.likes}&nbsp;

                    <SmsIcon
                        id="ShareThumbIcon"
                        onClick=""
                    />&nbsp;{this.state.answerCount}&nbsp;
                </div>
            )
        }

        return itemBottomBtnDiv;
    }

    getThumbnailImg = (_strSrc) => {
        let resultImg = null;
        let srcImg = URL + "/" + _strSrc;

        if (_strSrc == "no") {
            resultImg = (
                <img
                    src={imgX}
                    style={{
                        width: "100%"
                    }}
                />
            )
        } else {
            resultImg = (
                <img
                    src={srcImg}
                    onError={(e) => {
                        console.log("img error");
                        e.target.src = imgX;
                    }}
                    style={{
                        width: "100%"
                    }}
                />
            )
        }

        return resultImg;
    }


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

    row:
        addr: ""
        content: "맛있습니다"
        id: "yangyk7364"
        likes: 0
        num: "474"
        photo: "jeju20210129150010.jpg"
        regroup: 473
        relevel: 0
        restep: 0
        star: "0"
        subject: "해녀촌"
        writeday: "2021-01-30"
     */
    render() {
        const {row} = this.props;
        console.log(store.getState().loginId, row.id);
        let itemBottomBtnDiv = this.getItemBottomLikeBox(row);
        let ThumbnailImg = this.getThumbnailImg(row.photo);

        return (
            <React.Fragment>
                <Box m={1} id="ShareListBox">
                    <div>
                        {/* onClick={this.openModal.bind(this)}  */}
                        <div id="ShareImg"
                             onClick={this.openModal.bind(this)}
                             style={{
                                 overflow: "hidden"
                             }}
                        >{ThumbnailImg}</div>
                        <div id="ShareListSubject"
                             onClick={this.openModal.bind(this)}
                             style={{
                                 fontSize: "25px",
                                 fontWeight: "bold",
                             }}
                        >
                            {row.subject}
                        </div>
                        <div id="ShareContentDiv">
                            <Box>
                                <Rating style={{marginTop: '13px'}}
                                        defaultValue={row.star}
                                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                                        readOnly={true}
                                />
                            </Box>
                            <div style={{marginTop: '10px'}}>{row.addr}</div>
                        </div>
                        {itemBottomBtnDiv}
                    </div>
                </Box>

                {/*/////////////////////////////////////Modal/////////////////////////////////////////////////////*/}
                {/* //header 부분에 텍스트를 입력한다. */}
                <Modal open={this.state.modalOpen} close={this.closeModal.bind(this)} title="share">

                    {/* // Modal.js <main> { props.children } </main>에 내용이 입력된다.  */}
                    <div id="ShareModalAll" ref={this.myRef} onScroll={this.onScroll}>

                        <div style={{width: "1150px", height: "140px"}}>
                            <div style={{float: 'left'}}>
                                {/* 좋아요 버튼 */}
                                <ThumbUpAltIcon id="ShareModalThumbIcon"/>
                                <p style={{marginTop: "10px", marginBottom: '45px'}}>({row.id}) 님이 공유하신 맛집입니다.</p>
                                <b style={{fontSize: '15px'}}>{row.subject}</b>
                            </div>

                            {/* 찜하기 버튼 */}
                            <div id="ShareHeart" className="heart"></div>
                        </div>

                        <div id="ShareModalMidBox">
                            <div id="ShareModalImg"
                                 style={{
                                     overflow: "hidden"
                                 }}
                            >{ThumbnailImg}
                            </div>
                            <div id="ShareModalContent">
                                <div id="ShareModalContent1">
                                    <Box>
                                        <Rating
                                            defaultValue={row.star}
                                            emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                                            readOnly={true}
                                        />
                                    </Box>
                                </div>
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
                                        <textarea
                                            placeholder="댓글을 입력하세요"
                                            className="form-control"
                                            style={{width: '900px', height: '100px', float: 'left'}}
                                            ref="content"
                                        ></textarea>
                                </div>
                                <div>
                                    <MDBBtn color="deep-orange" id="ShareReviewSave"
                                            onClick={this.onInsertAnswer.bind(this)}
                                    ><b style={{fontSize: '17px'}}>작&nbsp;성</b>
                                    </MDBBtn>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ShareReview
                                regroup={row.regroup}
                            />
                        </div>
                    </div>
                </Modal>
                {/*//////////////////////////////////////////////////////////////////////////////////////////*/}
            </React.Fragment>
        )
    }
}


export default ShareBoardRowItem

