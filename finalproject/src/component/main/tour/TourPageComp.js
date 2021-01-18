import React, {Component} from "react";
import store from "../../../redux/store";
import {actionType, spotViewType} from "../../../redux/config";

class TourPageComp extends Component {

    state = {
        area : store.getState().spotView
    }
    
    constructor(props) {
        super(props);

        store.subscribe(function () {
            console.log("MainComp subscribe()");
            this.setState({
                area : store.getState().spotView,
            });
        }.bind(this));
        //console.log(this.state.area);
    }

    render() {
       // console.log("TourPageComp render()", this.props);
        return (
            <div>
                <h4>TourPageComp {this.state.area}</h4>
            </div>
        )
    }

}

export default TourPageComp;
