import React, {Component} from "react";
import store from "../../../redux/store";

class TourPageComp extends Component {

    state = {
        area : store.getState().spotView
    }

    constructor(props) {
        super(props);

        store.subscribe(function () {
            console.log("TourPageComp subscribe()");
            this.setState({
                spotView: store.getState().spotView
            });
        }.bind(this));

    }

    render() {
        console.log("TourPageComp render()", this.props);
        return (
            <div>
                <h4>TourPageComp {this.state.area}</h4>
            </div>
        )
    }

}

export default TourPageComp;
