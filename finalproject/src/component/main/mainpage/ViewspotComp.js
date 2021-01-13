import React, {Component} from "react";

class ViewspotComp extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {/*<a href="#ViewspotComp">{this.props.name}</a>*/}
                <br/>
                {this.props.name}<br/>
                <a href="#jeju">제주</a>
                <a href="#jocheon">조천</a>
                <a href="#gujwa">구좌</a>
                <a href="#sungsan">성산</a>
                <a href="#pyoseon">표선</a>
                <a href="#namwon">남원</a>
                <a href="#seogwipo">서귀포</a><br/>
                <a href="#andeok">안덕</a>
                <a href="#daejung">대정</a>
                <a href="#hangyeong">한경</a>
                <a href="#hanrim">한림</a>
                <a href="#aewol">애월</a>
                <a href="#udo">우도</a><br/><br/>

            </div>
        )
    }

}

export default ViewspotComp;
