import React, {Component} from "react";

class Notice extends Component{
    constructor(props) {
        super(props);
        this.props.setMainView("notice");
    }

    render() {
        return (
            <div>
                {/*<b>공지사항</b>*/}
            </div>
        )
    }
}

export default Notice;
