import React, {Component} from "react";
import axios from 'axios';

class SignupPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("SignupPageComp constructor", props);
        
        this.state={
            id:'',  //아이디를 저장하고 있을 state
            pass:'',
            pwCheck: "",//비밀번호 두개가 일치하는가
            name : '',
            gender: '',
            photo: null,
            photoname: '',
            address : '',
            addrdetail: '',
            email : '',
            hp : "",
            idcanUse: false,//중복된 아이디찾기 true여야 로그인가능
        }

        //함수 선언
        this.onIdChk=this.onIdChk.bind(this);
    }



    // 변수 선언시 state 영역에 추가했을 경우에만 나중에 값변경이 가능하다
    // 값 변경시에는 setState 를 이용해야만 한다
    // 이벤트
    changeEvent=(e)=>{
        
        console.log(e.target.id+":"+e.target.value);
        // 만약 엔터 누를때만 변경되도록 하고 싶으면
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    //방법2
    onIdChk=(e)=>{
        e.preventDefault();
        console.log(this.state.id);
        const data = {
            id: this.state.id//현재 id state 값을 data.id에 넣는다
        }
        // ↓은 백엔드로 fetch해서 입력된 값을 POST
        fetch("http://localhost:9002/member/checkid", 
                {//localhost 9002번 포트 checkid라우터를 찾는다
                    method: "POST",
                    headers: {
                    "Content-Type" : "application/json"
                    },
                body: JSON.stringify(data),//json화 해버리기
                })
            .then(response => response.json())
            .then(json=> {
                console.log("확인입니다");
                if(json.idcanUse == true){  //uson을받아왔는데idcanUse값이true면사용가능
                    alert("사용가능한 ID입니다");
                    this.setState({
                        idcanUse: true
                    })
                }
                else{
                    alert("다른 ID를 입력해주세요");
                }
            });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        
    };

    //사진 업로드시 호출되는 함수
    imageUpload=(e)=>{
        const uploadFile = e.target.files[0];

        //서버에 업로드
        const memberFile = new FormData();
        memberFile.append("uploadFile",uploadFile);

        axios({
            method: 'post',
            url: 'http://localhost:9002/member/upload',
            data: memberFile,
            headers: {'Content-Type':'multipart/form-data'}
        }).then(response=>{
            alert(response.data.photoname+" 이미지명으로 저장합니다");
            //이미지명 변경
            this.setState({
                photoname: response.data.photoname
            })
        }).catch(err=>{
            console.log("이미지 업로드시 오류남:"+err);
        })
    }

    onInsertMember = () => {
        let data = this.state;
        let url = "http://localhost:9002/member/insert";

        axios.post(url, data)
        .then(response => {
            //성공시
        
        })
    }
    render() {
        console.log("SingupPageComp render()", this.props);
        return (
            <div>
                <form
                onSubmit = { this.onSubmitHandler.bind(this) }
                enctype="multipart/form-data">
                <h1>회원가입</h1>
                <div>
                    {this.state.id}
                    <h4 className="showIdResult">{this.state.showIdResult}</h4>
                </div>
                <br />
                <label>이메일</label>
                <input type="email" name = "email" value = { this.state.email } onChange={this.changeEvent.bind(this)} />
                <br />
                <label>이름</label>
                <input type="text" name = "name" value = { this.state.name } onChange={this.changeEvent.bind(this)} />
                <br />
                아이디 :
                <input type="text" name="id"
                onChange={this.changeEvent.bind(this)}
                value={this.state.id}
                />
                <button type="button"
                onClick={this.onIdChk.bind(this)}>
                    아이디 확인
                </button>
                <br />
                <label>비밀번호</label>
                <input type="password" name="pass"
                onChange={this.changeEvent.bind(this)}
                value={this.state.pass}
                />
                <br />
                <label>비밀번호 확인</label>
                <input
                type = "password"
                name = "pwCheck"
                value = { this.state.pwCheck }
                onChange = { this.changeEvent.bind(this) }
                />
                <br />
                <select name="gender"
                onChange = {this.changeEvent.bind(this)}
                value = { this.state.gender }>
                    <option value="">성별선택</option>
                    <option value="여성">여성</option>
                    <option value="남성">남성</option>
                </select>
                <br />
                사진 : &nbsp;
                <input type="file" name="photo"
                onChange={this.imageUpload.bind(this)}
                ></input>
                <br />
                주소 : &nbsp;
                <input type="text" name="address"
                onChange={this.changeEvent.bind(this)}
                value = { this.state.address }></input>

                <input type="text" name="addrdetail"
                onChange={this.changeEvent.bind(this)}
                value = { this.state.addrdetail }></input>
                
                <br />
                휴대폰 : &nbsp;
                <input type="text" name="hp"
                onChange={this.changeEvent.bind(this)}
                value = { this.state.hp }></input>
                <br />
                <b>
                    내 아이디는 {this.state.id} 입니다
                    내 비밀번호는 {this.state.pass} 입니다
                    내 확인비밀번호는 { this.state.pwCheck } 입니다
                    내 이메일은 { this.state.email } 입니다
                    내 이름은 { this.state.name } 입니다
                    내 성별은 { this.state.gender } 입니다
                    내 사진은 { this.state.photo } 입니다
                    내 주소1 { this.state.address} 입니다
                    내 주소2 {this.state.addrdetail} 입니다
                    내 휴대폰 { this.state.hp } 입니다
                </b>
                <br />
                <button type = "submit">회원 가입</button>
                </form>
            </div>
        )
    }

}

export default SignupPageComp;
