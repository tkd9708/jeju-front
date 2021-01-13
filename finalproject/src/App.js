import React, {Component} from "react";
import MainComp from "./component/main/MainComp";
import FooterComp from "./component/footer/FooterComp";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: "header_comp",
            main: "main_comp",
            footer: "footer_comp"
        }
    }

    render() {
        return (
            <div>
                <MainComp name={this.state.main}/>
                <FooterComp name={this.state.footer}/>
            </div>
        )
    }

}

export default App;
/*
    header -> title//호준님, 소연님
    main
        검색
            - 검색 카테고리 select/option
            - 단어검색어 input
            - 검색 button
        관광명소 - 지도 클릭
            - 제주시 명소 링크.
            - 애월읍 명소 링크.
            ...
        공지사항
            - +버튼 -> 공지사항 페이지 이동. -button 안에 img
            - 공지사항 리스트중 하나 클릭. -table td a tag 안에 span 문자열
        공유게시판
            - +버튼 -> 공유게시판 페이지 이동. -button 안에 img
            - 공유게시판 리스트중 하나 클릭. -table td a tag 안에 span 문자열
    footer
        회사 정보
 */