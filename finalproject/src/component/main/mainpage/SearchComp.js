import React, {Component} from "react";

class SearchComp extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {/*<a href="#SearchComp">{this.props.name}</a>*/}
                <br/>
                {this.props.name}<br/>
                <select>
                    <option>전체</option>
                    <option>지역</option>
                    <option>명소</option>
                    <option>태그</option>
                </select>
                <input type="text" placeholder="검색할 단어를 입력하세요."/>
                <button type="button">검색</button>
            </div>
        )
    }

}

export default SearchComp;
