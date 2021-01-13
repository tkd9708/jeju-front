import React, {Component} from "react";
import SearchComp from "./SearchComp";
import ViewspotComp from "./ViewspotComp";
import NoticeComp from "./NoticeComp";
import BoardComp from "./BoardComp";

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
                {this.props.name}
                <SearchComp name={this.state.search}/>
                <ViewspotComp name={this.state.viewspot}/>
                <NoticeComp name={this.state.notice}/>
                <BoardComp name={this.state.board}/>
            </div>
        )
    }

}

export default MainPageComp;
