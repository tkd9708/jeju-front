import React, {Component} from "react";
import MainPageComp from "./mainpage/MainPageComp";
import ReservationPageComp from "./reservation/ReservationPageComp";
import NoticePageComp from "./notice/NoticePageComp";

class MainComp extends Component {

    constructor(props) {
        super(props);
        console.log("MainComp constructor", props);

        this.state = {
            mainview: this.props.getMainView()
        }
    }

    getMainView = () => {
        console.log("getMainView() this.props.getMainView()", this.props.getMainView());

        if (this.props.getMainView() == "mainpage") {
            return (
                <MainPageComp/>
            )
        } else if (this.props.getMainView() == "reservation") {
            return (
                <ReservationPageComp/>
            )
        } else if (this.props.getMainView() == "notice") {
            return (
                <NoticePageComp/>
            )
        } else {
            return (
                <p>
                    Not Found...
                </p>
            )
        }

    }

    render() {
        console.log("MainComp render()", this.props);
        return (
            <div>
                {this.props.name}<br/>
                {this.getMainView()}
            </div>
        )
    }

}

export default MainComp;
