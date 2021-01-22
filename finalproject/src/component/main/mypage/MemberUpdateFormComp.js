import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";

class MemberUpdateFormComp extends Component {

    constructor(props) {
        super(props);
        console.log("MemberUpdateFormComp constructor", props);

        this.state={
            id: '',
            name: '',
            gender: '',
            photo: '',
            address: '',
            addrdetail: '',
            email: '',
            email2: '',
            hp: '',
            pass: '',
            passCheck:''
        }
    }    
    
    // 스프링에서 목록 가져오기
    getData = () => {
        let url = URL + '/member/getdata?id=sanghee';
        axios.get(url)
        .then(response=>{
            this.setState({
                id: response.data.id,
                name: response.data.name,
                gender: response.data.gender,
                photo: response.data.photo,
                address: response.data.address,
                addrdetail: response.data.addrdetail,
                email: response.data.email,
                email2: response.data.email2,
                hp: response.data.hp            
            })
        }).catch(err=>{
            console.log("목록 오류:"+err);
        })
    }

    changeEmail = (e) => {
        console.log("changeEmail 함수");
        this.setState({
            email2: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    //사진 업로드시 호출되는 함수
    imageUpload=(e)=>{
        const uploadFile = e.target.files[0];

        //서버에 업로드
        const memberFile = new FormData();
        memberFile.append("uploadFile",uploadFile);

        axios({
            method: 'post',
            url: URL + '/member/upload',
            data: memberFile,
            headers: {'Content-Type':'multipart/form-data'}
        }).then(response=>{
            alert(response.data.photoname+" 이미지명으로 저장합니다");
            //이미지명 변경
            this.setState({
                photo: response.data.photo
            })
        }).catch(err=>{
            console.log("이미지 업로드시 오류남:"+err);
        })
    }

    componentDidMount() {
        this.getData(); //처음 시작시 백엔드로부터 데이타 가져오기
    }

    onUpdateMember = () => {
        let data = {
            id: this.state.id,
            name: this.state.name,
            gender: this.state.gender,
            photo: this.state.photo,
            address: this.state.address,
            addrdetail: this.state.addrdetail,
            email: this.state.email,
            email2: this.state.email2,
            hp: this.state.hp,
            pass: this.state.pass
          }
        
        let url = URL + "/member/update";

        //console.log(data);
        axios.post(url, data)
        .then(response => {
                this.props.history.push("/Mypage");//정보 변경후 마이페이지로 이동
        }).catch(err=>{
            console.log("회원업데이트중 오류:"+err);
        })
    }

    onDeleteMember = () => {
        let id = this.state.id;
        let passCheck = this.state.passCheck;
        let url = URL + "/member/delete";

        console.log(id + ", " +passCheck);
        axios.post(url , {id:id,pass:passCheck})
        .then(response => {
            if(response.data)
                this.props.history.push("/MainPage");//정보 변경후 메인페이지로 이동
            else
                alert("비밀번호 틀림");
        }).catch(err=>{
            console.log("회원삭제중 오류:"+err);
        })
    }
    onPassUpdateMember = () => {
        let id = this.state.id;
        let pass = this.state.pass;
        let url = URL + "/member/updatepass";

        axios.post(url, {id,pass})
        .then(response => {
            this.props.history.push("/MyPage");//정보 변경후 마이페이지로 이동
        }).catch(err=>{
            console.log("비밀번호 변경중 오류:"+err);
        })
    }
    render() {
        console.log("MemberUpdateFormComp render()", this.props);
        return (
            <div>
                <form>
                <h1>회원정보 수정</h1>
                <br/>
                <span>id</span>&nbsp;&nbsp;{this.state.id}<br/>
                <span>pass</span>&nbsp;&nbsp;
                <input type="password" name="pass" value = {this.state.pass} onChange={this.handleChange}/><br/>
                <span>name</span>&nbsp;&nbsp;
                <input type="text" name = "name" value = {this.state.name} onChange={this.handleChange}/><br/>
                <span>gender</span>&nbsp;&nbsp;
                <input type="text" name = "gender" value = {this.state.gender} onChange={this.handleChange}/><br/>
                <span>photo</span>&nbsp;&nbsp;
                <input type="file" name = "photo" value = {this.state.photo} onChange={this.handleChange}/><br/>
                <span>address</span>&nbsp;&nbsp;
                <input type="text" name = "address" value = {this.state.address} onChange={this.handleChange}/>
                <button type="button"><span>주소검색</span></button><br/>
                <span>addrdetail</span>&nbsp;&nbsp;
                <input type="text" name = "addrdetail" value = {this.state.addrdetail} onChange={this.handleChange}/><br/>
                <span>email</span>&nbsp;&nbsp;
                <input type="text" name = "email" value = {this.state.email} onChange={this.handleChange}/>@
                <input type="text" name = "email2" value = {this.state.email2} onChange={this.handleChange}/>
                <select name="selectemail" onChange={this.changeEmail}>
                    <option disabled>선택하세요</option>
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option> 
                </select><br/>
                <span>hp</span>&nbsp;&nbsp;
                <input type="text" name = "hp" value = {this.state.hp} onChange={this.handleChange}/><br/>
                
                {/* <button name="passUpdateBtn" type = "button" onClick={this.onPassUpdateMember}>비밀번호 변경</button><br/> */}

                <span>현재 비밀번호 확인</span>&nbsp;&nbsp;
                <input type="password" name="passCheck" value = {this.state.passCheck} onChange={this.handleChange}/>
                <br/>
                <button name="updateBtn" type = "button" onClick={this.onUpdateMember}>정보수정</button><br/>
                <button name="deleteBtn" type = "button" onClick={this.onDeleteMember}>회원탈퇴</button>
                </form>
            </div>
        )
    }
}

export default MemberUpdateFormComp;