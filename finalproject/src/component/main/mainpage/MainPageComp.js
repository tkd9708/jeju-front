import React, {Component} from "react";
import SearchComp from "./SearchComp";
import ViewspotComp from "./ViewspotComp";
import NoticeMiniComp from "./NoticeMiniComp";
import ShareBoardMiniComp from "./ShareBoardMiniComp";
import axios from "axios";

class MainPageComp extends Component {

    /**
     * props
     * setMainView={this.props.setMainView}
     */
    constructor(props) {
        super(props);
        console.log("MainPageComp constructor", props);

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
        console.log("getNoticeList()");
        var url = "http://localhost:9002/notice/list";

        axios.get(url
        ).then((res) => {
            console.log("getNoticeList success : ", res);
            this.setState({
                noticeList: res.data
            });
        }).catch((error) => {
            console.log("getNoticeList error", error);
        });
    }

    getShareBoardList = () => {
        console.log("getShareBoardList()");
        var url = "http://localhost:9002/share/list?start=0&perPage=5";

        axios.get(url
        ).then((res) => {
            console.log("getShareBoardList success : ", res);
            this.setState({
                shareBoardList: res.data
            });
        }).catch((error) => {
            console.log("getShareBoardList error", error);
        });
    }

    render() {
        console.log("MainPageComp render()", this.props);
        return (
            <div>
                <h4>main page comp</h4>
                <SearchComp name={this.state.search}/>
                <ViewspotComp name={this.state.viewspot}
                              setMainView={this.props.setMainView}
                />
                <NoticeMiniComp list={this.state.noticeList}/>
                <ShareBoardMiniComp list={this.state.shareBoardList}/>
            </div>
        )
    }

}

export default MainPageComp;
