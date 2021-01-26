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

        store.subscribe(this.list.bind(this));
        store.dispatch({
            type: actionType.shareBoardUpdate,
        });
    }

    list = () => {
        let url = URL + "/share/list?start=0&perPage=3";

        console.log(url);
        axios.get(url
        ).then(res => {
            console.log("list() res", res);
            this.setState({
                listData: res.data
            })
        }).catch(err => {
            console.log("list() err", err);
        });
    }

    componentWillMount() {
        this.list();
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
                </div>

                {/* 게시판 폼 */}
                <div>
                    {
                        this.state.listData.map((row, idx) => (
                            <ShareBoardRowItem row={row} key={idx} list={this.list.bind(this)}
                                               history={this.props.history}/>
                        ))
                    }
                </div>

                {/* 검색창 */}
                <div>
                    <input type="text" placeholder="검색할 단어를 입력하세요."/>
                    <button type="button">검색</button>
                </div>
            </div>
        )
    }

}

export default ShareBoardPageComp;
