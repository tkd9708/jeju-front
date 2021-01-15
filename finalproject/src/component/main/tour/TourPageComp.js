import React, {Component} from "react";


class TourPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("TourPageComp constructor", props);
    }

    render() {
        console.log("TourPageComp render()", this.props);
        return (
            <div>
                <h4>TourPageComp</h4>
            </div>
        )
    }

}

export default TourPageComp;
