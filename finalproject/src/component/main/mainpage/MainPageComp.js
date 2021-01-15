import React, {Component} from "react";
import SearchComp from "./SearchComp";
import ViewspotComp from "./ViewspotComp";
import NoticeMiniComp from "./NoticeMiniComp";
import ShareBoardMiniComp from "./ShareBoardMiniComp";

class MainPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("MainPageComp constructor", props);

        this.state = {
            search: "search_comp",
            viewspot: "viewspot_comp",
            notice: "notice_comp",
            board: "board_comp"
        }
    }

    render() {
        console.log("MainPageComp render()", this.props);
        return (
            <div>
                <h4>main page comp</h4>
                <SearchComp name={this.state.search}/>
                <ViewspotComp name={this.state.viewspot}/>
                <NoticeMiniComp name={this.state.notice}/>
                <ShareBoardMiniComp name={this.state.board}/>
            </div>
        )
    }

}

export default MainPageComp;
