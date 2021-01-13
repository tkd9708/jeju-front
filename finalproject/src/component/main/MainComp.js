import React, {Component} from "react";
import MainPageComp from "./MainPageComp";

class MainComp extends Component {

    constructor(props) {
        super(props);
        console.log("MainComp constructor", props);
    }

    render() {
        console.log("MainComp render()", this.props);
        return (
            <div>
                {this.props.name}
                <MainPageComp name={this.props.name}/>
            </div>
        )
    }

}

export default MainComp;
