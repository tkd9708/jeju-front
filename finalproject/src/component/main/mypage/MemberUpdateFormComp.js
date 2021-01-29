import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import './style/UpdateFormCss.css';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AddrList from './AddrList';

class MemberUpdateFormComp extends Component {

    constructor(props) {
        super(props);

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
            password: '',
            showPassword: false,
            keyword:'',
            addrs: []
        }
    }    
    
    handleClickShowPassword=()=>{
        var s = this.state.showPassword
        this.setState({
            showPassword: !s
        })
    }

    handleMouseDownPassword=(e)=>{
        e.preventDefault();
    }

    passChange = (prop) => (e) => {
        this.setState({
            [prop] : e.target.value
        });
    }

    // 스프링에서 목록 가져오기
    getData = () => {
        let url = URL + '/member/getdata?id=sanghee';
        axios.get(url)
        .then(response=>{
            this.setState({
                id: response.data.id,
                name: response.data.name,
                password: response.data.pass,
                gender: response.data.gender,
                photo: response.data.photo,
                address: response.data.address,
                addrdetail: response.data.addrdetail,
                email: response.data.email,
                email2: response.data.email2,
                hp: response.data.hp            
            })
            if(this.state.gender=='여자')
                this.refs.woman.className = 'mypageUpdateBtn clickMypageUpdateBtn';
            else
                this.refs.man.className = 'mypageUpdateBtn clickMypageUpdateBtn';
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
            this.setState({
                photo: response.data.photoname
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
            pass: this.state.password,
            gender: this.state.gender,
            photo: this.state.photo,
            address: this.state.address,
            addrdetail: this.state.addrdetail,
            email: this.state.email,
            email2: this.state.email2,
            hp: this.state.hp
          }
          console.log(data);
        
        let url = URL + "/member/update";

        console.log(data);
        axios.post(url, data)
        .then(response => {
            this.props.passOk(false);
            window.scrollTo(0,0);
            alert("정보가 수정되었습니다.");
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

    womanClick=(e)=>{
        if(e.target.className == 'mypageUpdateBtn clickMypageUpdateBtn'){
            e.target.className = 'mypageUpdateBtn';
            this.setState({
                gender: ''
            })       
        }
        else{
            this.refs.man.className = "mypageUpdateBtn";
            e.target.className = 'mypageUpdateBtn clickMypageUpdateBtn';
            
            this.setState({
                gender: '여자'
            })
        }
    }
    manClick=(e)=>{
        if(e.target.className == 'mypageUpdateBtn clickMypageUpdateBtn'){
            e.target.className = 'mypageUpdateBtn';
            this.setState({
                gender: ''
            })         
        }
        else{
            this.refs.woman.className = "mypageUpdateBtn";
            e.target.className = 'mypageUpdateBtn clickMypageUpdateBtn';
            this.setState({
                gender: '남자'
            })  
        }
    }

    // 주소검색
    findAddress=()=>{
        fetch(
            `https://www.juso.go.kr/addrlink/addrLinkUrl.do?currentPage=1&countPerPage=100&keyword=${this.state.keyword}&confmKey=devU01TX0FVVEgyMDIxMDEyOTEzNDgxNTExMDc1ODU=&resultType=4`
        )
            .then(res => res.json())
            .then(json => this.pushAddrs(json))
            .catch(err => console.log("주소 불러오기 실패: " + err));
    }

    pushAddrs=json=>{
        let tempAddr = [];
        json.results.juso.map(addr=>{
            return tempAddr.push(addr.zipNo + " " + addr.roadAddr);
        });
        this.setState({
            addrs: tempAddr
        })
    }

    render() {
        console.log("MemberUpdateFormComp render()", this.props);
        return (
            <div id="MypageUpdateForm" style={{textAlign: 'center'}}>
               <ul>
                <AddrList list={this.state.addrs}/>
               </ul>


                {/* <form onSubmit={this.onUpdateMember}> */}
                    <table class="table table-bordered">
                        <caption style={{captionSide: 'top', textAlign: 'center'}}><b>회원정보 수정</b></caption>
                        <tr>
                        <td colSpan="2"> <span class="fas fa-user-alt"></span>&nbsp;&nbsp;{this.state.id}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                {/* <input type="password" name="pass" class="form-control" value = {this.state.pass} onChange={this.handleChange} required/> */}
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="mypageUpdatePassword">Password</InputLabel>
                                    <OutlinedInput
                                        id="mypageUpdatePassword"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.passChange('password').bind(this)}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword.bind(this)}
                                            onMouseDown={this.handleMouseDownPassword.bind(this)}
                                            edge="end"
                                            >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>  
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="text" name = "name" class="form-control" value = {this.state.name} onChange={this.handleChange} required/></td>
                        </tr>
                        <tr>
                            <td className="mypageUpdateBtn" ref="woman" onClick={this.womanClick.bind(this)}>여자</td>
                            <td className="mypageUpdateBtn" ref="man" onClick={this.manClick.bind(this)}>남자</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="file" name = "photo" onChange={this.imageUpload.bind(this)}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="text" name = "address" class="form-control" value = {this.state.address} onChange={this.handleChange} required/>
                                <br/>
                                <input type="text" name = "addrdetail" class="form-control" value = {this.state.addrdetail} onChange={this.handleChange} required/>
                                <input type="text" name = "keyword" value={this.state.keyword} onChange={this.handleChange.bind(this)}/>
                                <button type="button" onClick={this.findAddress.bind(this)}>주소검색</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="text" name = "email" value = {this.state.email} className="mypageUpdateAddr" onChange={this.handleChange} required/>@
                                <input type="text" name = "email2" value = {this.state.email2} className="mypageUpdateAddr" onChange={this.handleChange} required/>
                                &nbsp;
                                <select name="selectemail" className="mypageUpdateAddr" onChange={this.changeEmail}>
                                    <option disabled>선택하세요</option>
                                    <option value="">직접입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="nate.com">nate.com</option> 
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="text" class="form-control" name = "hp" value = {this.state.hp} onChange={this.handleChange} required/></td>
                        </tr>
                        <tr>
                            <td className="mypageUpdateBtn">
                                <span onClick={this.onUpdateMember.bind(this)}>정보 수정</span>
                                {/* <button type="submit" style={{padding: '0', fontWeight: '0', backgroundColor: 'rgba(255,255,255,0)', border: 'none'}}>정보 수정</button> */}
                            </td>
                            <td className="mypageUpdateBtn">
                                <span onClick={this.onDeleteMember.bind(this)}>회원 탈퇴</span>
                            </td>
                        </tr>
                    </table>
            </div>
        )
    }
}

export default MemberUpdateFormComp;