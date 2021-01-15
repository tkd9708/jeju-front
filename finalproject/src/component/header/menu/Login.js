import React, {Component} from "react";

class Login extends Component{
    constructor(props) {
        super(props);
        this.props.setMainView("login");
    }

    render() {
        return (
            <div>
                {/*<b>Login</b>*/}
            </div>
        )
    }
}

export default Login;
