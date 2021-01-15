import React, {Component} from "react";


class ReservationPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("ReservationPageComp constructor", props);
    }

    render() {
        console.log("ReservationPageComp render()", this.props);
        return (
            <div>
                <h4>ReservationPageComp</h4>
            </div>
        )
    }

}

export default ReservationPageComp;
