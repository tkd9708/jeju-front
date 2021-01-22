import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";

class MemberUpdateFormComp extends Component {

    constructor(props) {
        super(props);
        console.log("MemberUpdateFormComp constructor", props);

        this.state={
            memberData:[],
            email2:''
        }
    }    
    
    // 스프링에서 목록 가져오기
    getData = () => {
        let url = URL + '/member/getdata?id=sanghee';
        axios.get(url)
        .then(response=>{
            this.setState({
                memberData:response.data,
                email2: response.data.email2
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
          memberData: e.target.value
        })
    }
    
    updateMember = (e) => {
        e.preventDefault();
    
        let member = {
          id: this.state.memberData.id,
          name: this.state.memberData.name,
          gender: this.state.memberData.gender,
          photo: this.state.memberData.photo,
          address: this.state.memberData.address,
          addrdetail: this.state.memberData.addrdetail,
          email: this.state.memberData.email,
          email2: this.state.email2,
          hp: this.state.memberData.hp,
          pass: this.state.memberData.pass
        }
    
      }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.onUpdateMember();
    };

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
                photoname: response.data.photoname
            })
        }).catch(err=>{
            console.log("이미지 업로드시 오류남:"+err);
        })
    }

    onUpdateMember = () => {
        let data = this.state;
        let url = URL + "/member/update";

        axios.post(url, data)
        .then(response => {
            this.props.history.push("/Mypage");//정보 변경후 마이페이지로 이동
        }).catch(err=>{
            console.log("회원가입시 오류남:"+err);
        })
    }

    componentDidMount() {
        this.getData(); //처음 시작시 백엔드로부터 데이타 가져오기
    }

    render() {
        console.log("MemberUpdateFormComp render()", this.props);
        return (
            <div>
                <form>
                <h1>회원정보 수정</h1>
                <br/>
                <span>id</span>&nbsp;&nbsp;{this.state.memberData.id}<br/>
                <span>name</span>&nbsp;&nbsp;
                <input type="text" name = "name" value = {this.state.memberData.name} onChange={this.handleChange}/><br/>
                <span>gender</span>&nbsp;&nbsp;
                <input type="text" name = "gender" value = {this.state.memberData.gender} onChange={this.handleChange}/><br/>
                <span>photo</span>&nbsp;&nbsp;
                <input type="file" name = "photo" value = {this.state.memberData.photo} onChange={this.handleChange}/><br/>
                <span>address</span>&nbsp;&nbsp;
                <input type="text" name = "address" value = {this.state.memberData.address} onChange={this.handleChange}/>
                <button type="button"><span>주소검색</span></button><br/>
                <span>addrdetail</span>&nbsp;&nbsp;
                <input type="text" name = "addrdetail" value = {this.state.memberData.addrdetail} onChange={this.handleChange}/><br/>
                <span>email</span>&nbsp;&nbsp;
                <input type="text" name = "email" value = {this.state.memberData.email} onChange={this.handleChange}/>
                <input type="text" name = "email2" value = {this.state.email2} onChange={this.handleChange}/>
                <select name="selectemail" onChange={this.changeEmail}>
                    <option disabled>선택하세요</option>
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option> 
                </select><br/>
                <span>hp</span>&nbsp;&nbsp;
                <input type="text" name = "hp" value = {this.state.memberData.hp} onChange={this.handleChange}/><br/>
                <span>pass</span>&nbsp;&nbsp;
                <input type="password" name="password"/><br/>
                <button type = "submit">정보수정</button>
                </form>
            </div>
        )
    }
}

export default MemberUpdateFormComp;



