import React, {Component} from "react";

class Admin extends Component{
    constructor(props) {
        super(props);
        this.props.setMainView("admin");
    }

    render() {
        return (
            <div>
                {/*<b>Admin</b>*/}
            </div>
        )
    }
}

export default Admin;
