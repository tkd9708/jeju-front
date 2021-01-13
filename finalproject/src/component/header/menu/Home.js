import React, {Component} from "react";
// import BigText from '../component/BigText';
// import Header from "../component/Header";

class Home extends Component {
    constructor(props) {
        super(props);
        this.props.setMainView("mainpage");
    }
    render() {
        return (
            <div>
                {/*<Header />*/}
                {/*<BigText>홈</BigText>*/}
            </div>
        )
    }
}

export default Home;
