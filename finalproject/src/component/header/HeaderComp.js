import React, {Component} from "react";
import {
    BrowserRouter
} from "react-router-dom";
import Title from "./Title";

class HeaderComp extends Component {
    constructor(props) {
        super(props);

        console.log("HeaderComp constructor", props);
    }

    render() {
        console.log("HeaderComp render", this.props, this.state);

        return (
            <div>
                <BrowserRouter>
                    <Title setMainView={this.props.setMainView}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default HeaderComp;
