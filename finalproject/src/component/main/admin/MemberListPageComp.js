import React, {Component} from "react";
import axios from 'axios';

class MemberListPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("LoginPageComp constructor", props);
        
        this.state={
            id:'',  //아이디를 저장하고 있을 state
            password:'',
            pwCheck: "",//비밀번호 두개가 일치하는가
            name : "",
            birth_date: "",
            phone : "",
            email : "",
            address : "",
            idcanUse: false,//중복된 아이디찾기 true여야 로그인가능
        }

        //함수 선언
        this.onIdChk=this.onIdChk.bind(this);
    }



    

    render() {
        console.log("MemberListPageComp render()", this.props);
        return (
            <div>
            </div>
        )
    }

}

export default MemberListPageComp;
