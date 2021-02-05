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
import './Share.css';
import {Delete} from "@material-ui/icons";
// import "../tour/TourCss.css"
import imgX from "../../../image/imgX.png";
import { MDBBtn, MDBCardImage, MDBModal, MDBModalBody, MDBModalHeader, MDBMask, MDBView, MDBModalFooter, MDBIcon } from 'mdbreact';


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

    constructor(props) {
        super(props);
        console.log("constructor", this.props);
        //스크롤
        this.myRef = React.createRef()
        this.state = {
            scrollTop: 0,
            answerCount: 0,
        }
        this.state = {
            modalOpen: false,
            likes: 0,
            open: false
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
                answerCount: res.data
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

    toggle = () => {
        this.setState({
          open: !this.state.open
        });
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
            // console.log("onInsertAnswer res", res);
            this.refs.content.value='';
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
        let isCondition = (this.props.currentPage != null && this.props.currentPage != undefined);
        // console.log("getItemBottomLikeBox", this.props.currentPage, isCondition);

        if (store.getState().logged && store.getState().loginId == row.id && isCondition) {
            itemBottomBtnDiv = (
                <div
                    id="DivItemLikeBox"
                >
                    {/* 좋아요 버튼 */}
                    <ThumbUpAltIcon
                        className="ShareThumbIcon"
                        onClick={this.addLikes}
                    />&nbsp;{row.likes + this.state.likes}&nbsp;&nbsp;

                    <SmsIcon
                        className="ShareThumbIcon"
                        onClick=""
                    />&nbsp;{this.state.answerCount}&nbsp;

                    {/* 삭제 버튼 */}
                    <DeleteIcon
                        className="ShareListDel"
                        onClick={this.onDeleteData.bind(this)}
                    />

                    {/* modify 버튼 */}
                    <BuildIcon
                        className="ShareListUp"
                        onClick={() => {
                            // this.props.history.push(`/share/update/${this.props.row.num}/${this.props.currentPage}`);
                            if (!this.props.currentPage) {
                                window.location.href = `/share/update/${this.props.row.num}/0`;
                            } else {
                                window.location.href = `/share/update/${this.props.row.num}/${this.props.currentPage}`;
                            }
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
                        className="ShareThumbIcon"
                        onClick={this.addLikes}
                    />&nbsp;{row.likes + this.state.likes}&nbsp;&nbsp;

                    <SmsIcon
                        className="ShareThumbIcon"
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
                <MDBCardImage
                        hover
                        overlay='white-slight'
                        className='card-img-top'
                        src={imgX}
                        alt='이미지 없음'
                        onClick={this.toggle.bind(this)} id="ShareImg"
                        />
                // <img
                //     src={imgX}
                //     style={{
                //         width: "100%"
                //     }}
                // />
            )
        } else {
            resultImg = (
                <MDBCardImage
                        hover
                        overlay='white-slight'
                        className='card-img-top'
                        src={srcImg}
                        onError={(e) => {
                            console.log("img error");
                            e.target.src = imgX;
                        }}
                        onClick={this.toggle.bind(this)} id="ShareImg"
                        alt='이미지 없음'
                        />
                // <img
                //     src={srcImg}
                //     onError={(e) => {
                //         console.log("img error");
                //         e.target.src = imgX;
                //     }}
                //     style={{
                //         width: "100%"
                //     }}
                // />
            )
        }

        return resultImg;
    }

    addLikes = () => {
        // /share/updatelikes
        let num = this.props.row.num;
        let url = URL + "/share/updatelikes" +
            "?num=" + num;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("addLikes res", res);
            store.dispatch({
                type: actionType.shareBoardUpdate,
            });
            this.setState({
                likes: this.state.likes + 1,
            })
        }).catch(err => {
            console.log("addLikes err", err);
        })
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
        // console.log(store.getState().loginId, row.id);
        let itemBottomBtnDiv = this.getItemBottomLikeBox(row);
        let ThumbnailImg = this.getThumbnailImg(row.photo);

        return (
            <React.Fragment>
                <Box m={1} id="ShareListBox">
                    <div onClick={this.toggle.bind(this)}>
                        {ThumbnailImg}
                        <div id="ShareListTitle"
                             style={{
                                 fontSize: "25px",
                                 fontWeight: "bold",
                             }}
                        >
                            <h6 className="font-weight-bold green-text">
                                <MDBIcon icon="utensils" className="pr-2" />
                                Food
                            </h6>
                            {row.subject}
                        </div>
                        <div id="ShareListContent" style={{overflow: 'hidden'}}>
                            {row.content}
                        </div>
                    </div>
                    {itemBottomBtnDiv}
                </Box>

                {/*/////////////////////////////////////Modal/////////////////////////////////////////////////////*/}
                {/* //header 부분에 텍스트를 입력한다. */}
                <MDBModal isOpen={this.state.open} toggle={this.toggle} size="lg" position="bottom">
                    <MDBModalHeader toggle={this.toggle}>
                        <b className="green-text ShareModalCategory"><MDBIcon icon="utensils" className="pr-2" />Food</b>&nbsp;&nbsp;
                        <span id="ShareModalTitle"><b>{row.id}</b>님이 공유하신 맛집입니다.</span></MDBModalHeader>
                    <MDBModalBody>
                        <div id="ShareModalAll" ref={this.myRef} onScroll={this.onScroll}>
                        <Box display="flex"
                            flexWrap="wrap"
                            p={1}
                            m={1}
                            bgcolor="background.paper"
                            justifyContent="center"
                            css={{maxWidth: '100%'}}
                        >
                            <Box m={1} className="ShareModalItemBox">
                                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                    <img
                                        className="img-fluid"
                                        src={row.photo!="no"?URL + "/" + row.photo:imgX}
                                        alt=""
                                        onError={(e) => {
                                            console.log("img error");
                                            e.target.src = imgX;
                                        }}
                                    />
                                    <MDBMask overlay="white-slight" />
                                </MDBView>
                            </Box>
                            <Box m={1} className="ShareModalItemBox" style={{position: 'relative'}}>
                                <br/>
                                <Rating
                                    defaultValue={row.star}
                                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                                    readOnly={true}
                                />
                                <h3 className="mb-3 p-0">
                                    {row.subject}
                                </h3>
                                <p>
                                    <MDBIcon icon="map-marker-alt" />&nbsp;&nbsp;{row.addr}
                                </p>
                                <div style={{position: 'absolute', right: '5px', bottom: '5px'}}>
                                    <b style={{color: 'gray'}}>{row.writeday}</b>
                                </div>
                            </Box>
                            <Box m={1} className="ShareModalItemContent">
                                {row.content}
                            </Box>
                        </Box>
                        <br/>
                        <hr/>

                            <div id="ShareReviewWrite">
                            <MDBIcon icon="comments" className="green-text pr-3" style={{marginLeft: '10px'}}/><b style={{fontWeight: '700'}}>다녀온 후기나 궁금한 질문을 자유롭게 나눠보아요.</b>
                                <br/><br/>
                                <textarea
                                            placeholder="댓글 입력"
                                            className="form-control"
                                            ref="content"
                                            style={{resize: 'none'}}
                                        ></textarea>
                                        <MDBBtn color="dark-green" id="ShareReviewSave"
                                                onClick={this.onInsertAnswer.bind(this)}
                                                style={{float: 'right'}}
                                        >작성
                                        </MDBBtn>
                            </div>
                        </div>
                            <ShareReview regroup={row.regroup}/>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="dark-green" onClick={this.toggle}>Close</MDBBtn>
                    <MDBBtn color="primary">일정추가</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                {/* <Box>
                    <Modal open={this.state.modalOpen} close={this.closeModal.bind(this)} title="share"> */}
                        {/* // Modal.js <main> { props.children } </main>에 내용이 입력된다.  */}
                        {/* <div id="ShareModalAll" ref={this.myRef} onScroll={this.onScroll}>
                            <p style={{margin: "10px"}}>({row.id}) 님이 공유하신 맛집입니다.</p>
                            <div
                                id="ShareModalMidBox"
                                style={{
                                    height: "580px",
                                }}
                            >
                                <table id="ShareFormAll">
                                    <tr>
                                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>맛집이름 </span></th>
                                        <td id="sharetd">
                                            <b
                                                style={{fontSize: "1.3em"}}
                                            >{row.subject}</b>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>맛집주소 </span></th>
                                        <td id="sharetd">
                                            <b
                                                style={{fontSize: "1.3em"}}
                                            >{row.addr}</b>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>이미지 </span></th>
                                        <td id="sharetd">
                                            <div id="ShareModalImg"
                                                 style={{
                                                     overflow: "hidden",
                                                 }}
                                            >{ThumbnailImg}</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>리뷰 </span></th>
                                        <td id="sharetd" style={{maxWidth: "600px"}}>
                                            <b
                                                style={{fontSize: "1.3em"}}
                                            >{row.content}</b>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th id="shareth" style={{verticalAlign: 'middle'}}><span>평가 </span></th>

                                        <td id="sharetd">
                                            <Box>
                                                <Rating
                                                    defaultValue={row.star}
                                                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                                                    readOnly={true}
                                                />
                                            </Box>
                                        </td>
                                    </tr>

                                </table>
                            </div>

                            <div id="ShareReviewWrite">
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
                </Box> */}
                {/*//////////////////////////////////////////////////////////////////////////////////////////*/}
            </React.Fragment>
        )
    }
}


export default ShareBoardRowItem

