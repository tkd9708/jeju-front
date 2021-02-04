import React, {Component} from "react";


class ShipPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("ShipPageComp constructor", props);
    }

    render() {
        return (
            <div>
                <img src="http://udoboat.smart9.net/m/images/sub3_1.jpg?2"/>
            </div>
        )
    }

}

export default ShipPageComp;
