import React, { Component, useState } from "react";
import * as ReactDOM from "react-dom";
import axios from 'axios';
import {URL} from "../../../redux/config";
import { makeStyles, createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Upload } from "@progress/kendo-react-upload";

import Button from "@material-ui/core/Button";
import { green, grey, orange } from "@material-ui/core/colors";

import { createRipples } from "react-ripples";

import RippleBtn from "./SubmitBtn";
import RippleBtn2 from "./SubmitBtn2";

import store from "../../../redux/store";
import { actionType, mainViewType } from "../../../redux/config";

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

const genders = [
    '남성',
    '여성',
];

const fileStatuses = [
    'UploadFailed',
    'Initial',
    'Selected',
    'Uploading',
    'Uploaded',
    'RemoveFailed',
    'Removing'
];

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(orange[200]),
        '&:hover': {
            backgroundColor: grey[100],
        },
        outline: 'none !important',
        
    },
}))(Button);

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const MyRipples = createRipples({
    color: 'orange',
    during: 2200,
})

let uploadFile = null;

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
            email2:'',
            hp : "",
            idcanUse: false,//중복된 아이디찾기 true여야 로그인가능
            files: [],
            events: [],
            filePreviews: {},
        };

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
        let url = URL + '/member/checkid?id=' + this.state.id;
        axios.get(url)
        .then(response=>{
            alert(response.data.idcanUse + "를 받았습니다");
            if(response.data.idcanUse === "true")
            {
                alert("사용가능한 아이디입니다");
                this.setState({
                    idcanUse: true
                })
            }
            else if(response.data.idcanUse === "false")
            {
                alert("다른 아이디를입력해주세요");
                this.setState({
                    id: '',
                })
            }
        }).catch(err => {
            console.log("아이디체크시 오류남:"+err);
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.onInsertMember();
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

    //사진 업로드시 호출되는 함수
    // imageUpload=(e)=>{
    //     uploadFile = e.affectedFiles[0].name;
    //     alert("업로드할 파일은 : " + uploadFile);

    //     //서버에 업로드
    //     const memberFile = new FormData();
    //     memberFile.append("uploadFile",uploadFile);

    //     axios({
    //         method: 'post',
    //         url: URL + '/member/upload',
    //         data: memberFile,
    //         headers: {'Content-Type':'multipart/form-data'}
    //     }).then(response=>{
    //         alert(response.data.photoname+" 이미지명으로 저장합니다");
    //         //이미지명 변경
    //         this.setState({
    //             photoname: response.data.photoname
    //         })
    //     }).catch(err=>{
    //         console.log("이미지 업로드시 오류남:"+err);
    //     })
    // }

    onInsertMember = () => {
        let data = this.state;
        let url = URL + "/member/insert";

        axios.post(url, data)
        .then(response => {
            //성공시
            //입력값 지우기
            this.setState({
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
            })

            // 예전 location.href 와 같은 코드
            this.props.history.push("/login");//저장 성공후 로그인으로 이동되도록 한다
        }).catch(err=>{
            console.log("회원가입시 오류남:"+err);
        })
    }

    handleChange = (event) => {
        this.setState({
            gender: event.target.value,
        });
    };

    onAdd = (event) => {
        const afterStateChange = () => {
            event.affectedFiles
                .filter(file => !file.validationErrors)
                .forEach(file => {
                    const reader = new FileReader();

                    reader.onloadend = (ev) => {
                        this.setState({
                            filePreviews: {
                                ...this.state.filePreviews,
                                [file.uid]: ev.target.result
                            }
                        });
                    };

                    reader.readAsDataURL(file.getRawFile());
                });
        };

        this.setState({
            files: event.newState,
            events: [
                ...this.state.events,
                `선택된 파일: ${event.affectedFiles[0].name}`
            ],
        }, afterStateChange);

        uploadFile = event.affectedFiles[0].name;
    }

    onRemove = (event) => {
        const filePreviews = {
            ...this.state.filePreviews
        };

        event.affectedFiles.forEach(file => {
            delete filePreviews[file.uid];
        });

        this.setState({
            files: event.newState,
            events: [
                ...this.state.events,
                `파일 제거됨: ${event.affectedFiles[0].name}`
            ],
            filePreviews: filePreviews
        });
    }

    onProgress = (event) => {
        this.setState({
            files: event.newState,
            events: [
                ...this.state.events,
                `진행 정도: ${event.affectedFiles[0].progress} %`
            ]
        });
    }

    changeEmail = (e) => {
        this.setState({
            email2: e.target.value
        })
    }

    onStatusChange = (event) => {
        const file = event.affectedFiles[0];

        this.setState({
            files: event.newState,
            events: [
                ...this.state.events,
                `File '${file.name}' status changed to: ${fileStatuses[file.status]}`
            ]
        });
    }
    
    render() {
        const { classes } = this.props;
        console.log("SingupPageComp render()", this.props);
        return (
            <div>
                <form
                className={classes.root}
                noValidate autoComplete="off"
                onSubmit = { this.onSubmitHandler.bind(this) }
                >
                <h1>회원가입</h1>
                <div>
                    <h4 className="showIdResult">{this.state.showIdResult}</h4>
                </div>
                <br />
                <TextField id="standard-secondary" label="이메일" color="secondary" 
                type="email" name="email" value={ this.state.email }
                onChange = { this.changeEvent.bind(this) } />
                @
                <TextField id="standard-secondary2" color="secondary" 
                type="email" name="email2" value={ this.state.email2 }
                onChange = { this.changeEvent.bind(this) } />
                <select name="selectemail" onChange={this.changeEmail.bind(this)}>
                    <option disabled>선택하세요</option>
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option> 
                </select><br/>
                
                
                <br />
                
                
                
                <TextField id="standard-secondary" label="이름" color="secondary" 
                type="text" name="name" value={ this.state.name }
                onChange = { this.changeEvent.bind(this) } />

                <br />
                
                <TextField id="standard-secondary" label="아이디" color="secondary" 
                type="text" name="id" value={ this.state.id }
                onChange = { this.changeEvent.bind(this) } />

                <button type="button"
                onClick={this.onIdChk.bind(this)}>
                    아이디 확인
                </button>
                <br />
                
                <TextField id="standard-secondary" label="비밀번호" color="secondary" 
                type="password" name="pass" value={ this.state.pass }
                onChange = { this.changeEvent.bind(this) } />

                <br />
                
                <TextField id="standard-secondary" label="비밀번호 확인" color="secondary" 
                type="password" name="pwCheck" value={ this.state.pwCheck }
                onChange = { this.changeEvent.bind(this) } />

                <br />
                

                <InputLabel id="demo-simple-select-label">성별</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.gender}
                    onChange={this.handleChange}
                >
                    {genders.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                            {gender}
                        </MenuItem>
                    ))}
                </Select>

                <br />
                사진 : &nbsp;
                <input type="file" name="photo"
                onChange={this.imageUpload.bind(this)}
                ></input>

                {/* <div>
                    <InputLabel id="demo-simple-select-label">사진</InputLabel>
                    <br />
                    <Upload 
                        batch={false}
                        multiple={true}
                        files={this.state.files}
                        onAdd={this.onAdd}
                        onRemove={this.onRemove}
                        onProgress={this.onProgress}
                        onStatusChange={this.onSatusChange}
                        withCredentials={false}
                        saveUrl={URL + '/member/upload'}
                        removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                        onChange={this.imageUpload.bind(this)}
                    />
                    <div className={'example-config'} style={{ marginTop: 20 }}>
                        <ul className={'event-log'}>
                            {
                                this.state.events.map(event => <li key={event}>{event}</li>)
                            }
                        </ul>
                    </div>
                    {
                        this.state.files.length ? 
                        <div className={'img-preview example-config'}>
                            <h3>선택된그림들 미리보기</h3>
                            {
                                Object.keys(this.state.filePreviews)
                                    .map((fileKey, index) => (<img 
                                        src={this.state.filePreviews[fileKey]} 
                                        alt={index}
                                        style={{ width: 200, margin: 10 }} 
                                    />))
                            }
                        </div> : undefined
                    }
                </div> */}


                <br />
                

                <TextField id="standard-secondary" label="주소" color="secondary" 
                type="text" name="address" value={ this.state.address }
                onChange = { this.changeEvent.bind(this) } />

                
                
                <TextField id="standard-secondary" label="상세주소" color="secondary" 
                type="text" name="addrdetail" value={ this.state.addrdetail }
                onChange = { this.changeEvent.bind(this) } />

                <br />
                

                <TextField id="standard-secondary" label="휴대폰" color="secondary" 
                type="text" name="hp" value={ this.state.hp }
                onChange = { this.changeEvent.bind(this) } />
                <br />
                
                <RippleBtn2 />
                </form>
            </div>
        );
    }

}

SignupPageComp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupPageComp);
