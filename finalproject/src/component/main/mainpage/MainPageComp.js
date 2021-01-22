import React, {Component} from "react";
import SearchComp from "./SearchComp";
import HotPlaceComp from "./HotPlaceComp";
import NoticeMiniComp from "./NoticeMiniComp";
import ShareBoardMiniComp from "./ShareBoardMiniComp";
import axios from "axios";
import {URL} from "../../../redux/config";
import "./MainPageComp.css"
import MainPhotoComp from "./MainPhotoComp";
import MyPlanComp from "./MyPlanComp";
import EtcBoardComp from "./EtcBoardComp";

class MainPageComp extends Component {

    /**
     * props
     * setMainView={this.props.setMainView}
     */
    constructor(props) {
        super(props);
        // console.log("MainPageComp constructor", props);

        this.state = {
            shareBoardList: [],
            noticeList: [],
        }
    }

    componentWillMount() {
        this.getNoticeList.bind(this)();
        this.getShareBoardList.bind(this)();
    }

    getNoticeList = () => {
        // console.log("getNoticeList()");
        var url = URL + "/notice/list";

        axios.get(url
        ).then((res) => {
            // console.log("getNoticeList success : ", res);
            this.setState({
                noticeList: res.data
            });
        }).catch((error) => {
            // console.log("getNoticeList error", error);
        });
    }

    getShareBoardList = () => {
        // console.log("getShareBoardList()");
        var url = URL + "/share/list?start=0&perPage=5";

        axios.get(url
        ).then((res) => {
            // console.log("getShareBoardList success : ", res);
            this.setState({
                shareBoardList: res.data
            });
        }).catch((error) => {
            // console.log("getShareBoardList error", error);
        });
    }


    /**
     * MainPhotoComp
     * SearchComp | MyPlanComp
     * HotPlaceComp
     * EtcBoardComp
     */
    render() {
        // console.log("MainPageComp render()", this.props);
        return (
            <div className="mainPageComp">
                <MainPhotoComp/>
                <div className="search-myplan">
                    <SearchComp/>
                    <MyPlanComp/>
                </div>
                <HotPlaceComp history={this.props.history}/>
                <EtcBoardComp/>
            </div>
        )
    }

}

export default MainPageComp;
