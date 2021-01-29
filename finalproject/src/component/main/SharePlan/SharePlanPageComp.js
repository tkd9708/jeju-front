import React, {Component} from "react";


class SharePlanPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("SharePlanPageComp constructor", props);
    }

    render() {
        console.log("SharePlanPageComp render()", this.props);
        return (
            <div>
                <h4>SharePlanPageComp</h4>
            </div>
        )
    }

}

export default SharePlanPageComp;
