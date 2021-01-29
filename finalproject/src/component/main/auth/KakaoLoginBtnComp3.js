import React, { Component } from "react";

const { Kakao } = window;

class KakaoLoginBtnComp3 extends Component {
    componentDidMount() {
        Kakao.init('5b1bc09ea2391d811062370fac0b13dd');
        console.log("Kakao.isInitialized() : " + Kakao.isInitialized());
    }

    render() {
        return (
            <>
            </>
        );
    }
}

export default KakaoLoginBtnComp3;