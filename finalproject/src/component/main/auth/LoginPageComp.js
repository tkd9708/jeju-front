import React, {Component} from "react";


class LoginPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("LoginPageComp constructor", props);
    }
    // 변수 선언시 state 영역에 추가했을 경우에만 나중에 값변경이 가능하다
    // 값 변경시에는 setState 를 이용해야만 한다
    state={
        id:'',
        password:'',
    }
    // 이벤트
    changeEvent=(e)=>{
        
        console.log(e.target.id+":"+e.target.value);
        // 만약 엔터 누를때만 변경되도록 하고 싶으면
        if(e.key=='Enter'){
            this.setState({
                [e.target.name]:e.target.value
            })
        }
    }
    render() {
        console.log("LoginPageComp render()", this.props);
        return (
            <div>
                <h4>로그인</h4>
                <div>
                    {this.state.id}
                </div>
                <br />
                아이디 :
                <input type="text" name="id"
                onKeyPress={this.changeEvent.bind(this)}
                />
                <br />
                비밀번호 : 
                <input type="password" name="password"
                onKeyPress={this.changeEvent.bind(this)}
                />
                <b>
                    내 아이디는 {this.state.id} 입니다
                    내 비밀번호는 {this.state.password} 입니다
                </b>
            </div>
        )
    }

}

export default LoginPageComp;
