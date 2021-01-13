import React, {Component} from "react";


class Reservation extends Component{
    constructor(props) {
        super(props);
        this.props.setMainView("reservation");
    }

    render() {
        return (
            <div>
                <b>비행기 렌터카 예약</b>
            </div>
        )
    }
}

export default Reservation;
