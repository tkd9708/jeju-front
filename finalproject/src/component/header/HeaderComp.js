import React, {Component} from "react";
import {
    BrowserRouter
} from "react-router-dom";
import Menu from "./Menu";

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
                    <Menu/>
                </BrowserRouter>
            </div>
        )
    }
}

export default HeaderComp;
