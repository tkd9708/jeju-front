import React, {Component} from "react";
import axios from 'axios';

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
        let url = "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/member/getdata?id=sanghee";
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

      email2HandleChange = (e) => {
        this.setState({
          email2: e.target.value
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
                <span>hp</span>&nbsp;&nbsp;
                <input type="text" name = "hp" value = {this.state.memberData.hp} onChange={this.handleChange}/><br/>
                <span>address</span>&nbsp;&nbsp;
                <input type="text" name = "address" value = {this.state.memberData.address} onChange={this.handleChange}/>
                <button type="button"><span>주소검색</span></button><br/>
                <span>addrdetail</span>&nbsp;&nbsp;
                <input type="text" name = "addrdetail" value = {this.state.memberData.addrdetail} onChange={this.handleChange}/><br/>
                <span>email</span>&nbsp;&nbsp;
                <input type="text" name = "email" value = {this.state.memberData.email} onChange={this.handleChange}/>
                <input type="text" name = "email2" value = {this.state.email2} onChange={this.email2HandleChange}/>
                <select name="selectemail" onChange={this.changeEmail}>
                    <option disabled>선택하세요</option>
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option> 
                </select>
                <br/>
                <span>pass</span>&nbsp;&nbsp;
                <input type="password" name="password"/><br/>
                <button type = "submit">정보 수정</button>
                </form>
            </div>
        )
    }

}

export default MemberUpdateFormComp;
