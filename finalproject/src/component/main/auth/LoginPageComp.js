import React, {Component} from "react";


class LoginPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("LoginPageComp constructor", props);
    }

    render() {
        console.log("LoginPageComp render()", this.props);
        return (
            <div>
                <h4>LoginPageComp</h4>
            </div>
        )
    }

}

export default LoginPageComp;
