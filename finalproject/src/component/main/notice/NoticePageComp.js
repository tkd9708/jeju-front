import React, {Component} from "react";


class NoticePageComp extends Component {

    constructor(props) {
        super(props);
        console.log("NoticePageComp constructor", props);
    }

    render() {
        console.log("NoticePageComp render()", this.props);
        return (
            <div>
                <h4>notice page comp</h4>
            </div>
        )
    }

}

export default NoticePageComp;
