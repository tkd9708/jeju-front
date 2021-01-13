import React, {Component} from "react";


class MypagePageComp extends Component {

    constructor(props) {
        super(props);
        console.log("MypagePageComp constructor", props);
    }

    render() {
        console.log("MypagePageComp render()", this.props);
        return (
            <div>
                <h4>MypagePageComp</h4>
            </div>
        )
    }

}

export default MypagePageComp;
