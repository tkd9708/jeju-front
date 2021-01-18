import React, {Component} from "react";

class Tour extends Component{
    constructor({match}) {
        super();

        this.state = {
            area : match.params.name
        }
        console.log(this.state.area);
    }

    render() {
        return (
            <div>
                {/*<b>관광명소</b>*/}
            </div>
        )
    }
}

export default Tour;
