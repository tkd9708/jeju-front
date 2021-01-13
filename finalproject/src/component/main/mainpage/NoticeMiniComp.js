import React, {Component} from "react";
import PlusImg from "../../../image/plus.png";

class NoticeMiniComp extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {/*<a href="#NoticeMiniComp">{this.props.name}</a>*/}
                <br/>
                {this.props.name}<br/>
                <h5>공지사항</h5>
                <button>
                    <img src={PlusImg}
                         style={{width: "50px"}}
                    />
                </button>
                <table>
                    <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <a href="#">
                                <span>1제목 입니다.</span>
                            </a>
                        </td>
                        <td>1작성일 입니다.</td>
                    </tr>
                    <tr>
                        <td>
                            <a href="#">
                                <span>2제목 입니다.</span>
                            </a>
                        </td>
                        <td>2작성일 입니다.</td>
                    </tr>
                    <tr>
                        <td>
                            <a href="#">
                                <span>3제목 입니다.</span>
                            </a>
                        </td>
                        <td>3작성일 입니다.</td>
                    </tr>
                    </tbody>
                </table>


            </div>
        )
    }

}

export default NoticeMiniComp;
