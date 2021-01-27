import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardFormComp from "./ShareBoardFormComp";
import ShareBoardRowItem from "./ShareBoardRowItem";
import {URL, actionType} from '../../../redux/config';
import axios from "axios";
import store from "../../../redux/store";


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
        let url = URL + "/share/list?start=0&perPage=3";

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
                <div>
                    <b>맛집 공유게시판</b>
                </div>

                {/*/!* 공유버튼 *!/*/}
                <div>
                    <Link to="/share/insert">
                        <button type="button">맛집공유</button>
                    </Link>
                    &nbsp;
                    <button type="button"
                            onClick={this.getShareListByPaging.bind(this)}
                    >전 체 글
                    </button>
                    &nbsp;
                    <input type="text" placeholder="검색할 단어를 입력하세요." ref="search"/>
                    &nbsp;
                    <button type="button"
                            onClick={this.searchShareList.bind(this)}
                    >검 색
                    </button>
                </div>

                {/* 게시판 폼 */}
                <div>
                    {
                        this.state.listData.map((row, idx) => (
                            <ShareBoardRowItem row={row} key={idx}
                                               list={this.getShareListByPaging.bind(this)}
                                               history={this.props.history}
                            />
                        ))
                    }
                </div>


            </div>
        )
    }

}

export default ShareBoardPageComp;
