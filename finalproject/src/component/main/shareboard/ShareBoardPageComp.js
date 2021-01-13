import React, {Component} from "react";


class ShareBoardPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("ShareBoardPageComp constructor", props);
    }

    render() {
        console.log("ShareBoardPageComp render()", this.props);
        return (
            <div>
                <h4>ShareBoardPageComp</h4>
            </div>
        )
    }

}

export default ShareBoardPageComp;
