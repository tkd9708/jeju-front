import React, {Component} from "react";

class AdminMiniComp extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {/*<a href="#ShareBoardMiniComp">{this.props.name}</a>*/}
                <br/>
                {this.props.name}<br/>
                
            </div>
        )
    }

}

export default AdminMiniComp;
