import React, {Component} from "react";

class MyPage extends Component{
    constructor(props) {
        super(props);
        this.props.setMainView("mypage");
    }

    render() {
        return (
            <div>
                {/*<b>MyPage</b>*/}
            </div>
        )
    }
}

export default MyPage;
