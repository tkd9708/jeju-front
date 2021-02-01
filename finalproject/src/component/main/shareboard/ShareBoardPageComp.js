import React, {Component, Fragment} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardFormComp from "./ShareBoardFormComp";
import ShareBoardRowItem from "./ShareBoardRowItem";
import {URL, actionType} from '../../../redux/config';
import {MDBBtn} from "mdbreact";
import axios from "axios";
import store from "../../../redux/store";
import Box from "@material-ui/core/Box";


class ShareBoardPageComp extends Component {

    state = {
        listData: []
    }

    constructor(props) {
        super(props);
        console.log("ShareBoardPageComp constructor", this.props);

        store.subscribe(this.getShareListByPaging.bind(this));
        store.dispatch({
            type: actionType.shareBoardUpdate,
        });
    }

    getShareListByPaging = () => {
        let url = URL + "/share/list?start=0&perPage=12";

        console.log(url);
        axios.get(url
        ).then(res => {
            console.log("getShareListByPaging() res", res);
            this.setState({
                listData: res.data
            })
        }).catch(err => {
            console.log("getShareListByPaging() err", err);
        });
    }

    searchShareList = () => {
        let url = URL + "/share/search" +
            "?start=0" +
            "&perPage=3" +
            "&search=" + this.refs.search.value;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("searchShareList() res", res);
            this.setState({
                listData: res.data
            });
        }).catch(err => {
            console.log("searchShareList() err", err);
        });
    }

    componentWillMount() {
        this.getShareListByPaging();
    }

    render() {
        return (
            <div>
                {/* 제목 */}
                <div style={{margin: "0 auto", marginLeft: "45%", marginTop: '1%', marginBottom: '4%'}}>
                    <h3 id="sharesubject">맛집 공유게시판</h3>
                </div>

                {/*/!* 공유버튼 *!/*/}
                <div>
                    <Link to="/share/insert">
                        <MDBBtn size="sm" color="deep-orange" type="button" variant="warning"
                                style={{float: 'right', marginRight: '7%'}}>
                            <b style={{fontSize: '15px'}}>맛집공유</b>
                        </MDBBtn>
                    </Link>
                    <MDBBtn outline size="sm" color="deep-orange"
                            onClick={this.getShareListByPaging.bind(this)}
                            style={{float: 'left', marginLeft: '7%'}}>
                        <b style={{fontSize: '15px'}}>전체글</b>
                    </MDBBtn>
                    <input type="search" className="form-control" ref="search"
                           style={{float: 'left', marginLeft: '7%', width: '200px', height: '40px', marginTop: '5px'}}/>
                    <MDBBtn outline size="sm" color="deep-orange"
                            onClick={this.searchShareList.bind(this)}>
                        <b style={{fontSize: '15px'}}>검색</b>
                    </MDBBtn>
                </div>


                {/* 게시판 폼 */}
                <Box display="flex"
                     flexWrap="wrap"
                     p={1}
                     m={1}
                     bgcolor="background.paper"
                     justifyContent="center"
                     css={{maxWidth: '100%'}}
                >
                    {
                        this.state.listData.map((row, idx) => (
                            <ShareBoardRowItem row={row} key={idx}
                                               list={this.getShareListByPaging.bind(this)}
                                               history={this.props.history}
                            />
                        ))
                    }
                </Box>
            </div>
        )
    }

}

export default ShareBoardPageComp;
