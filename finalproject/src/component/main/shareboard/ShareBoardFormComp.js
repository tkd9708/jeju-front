import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardPageComp from "./ShareBoardPageComp";
import axios from "axios";
import {URL} from '../../../redux/config';
import "./Share.css";
// import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';





class ShareBoardFormComp extends Component {

    state = {
        photoname: ''
    }

    constructor(props) {
        super(props);
        console.log("ShareBoardFormComp constructor", props);

    }

    //서버에 이미지 업로드하는 함수
    uploadImage = (e) => {
        const uploadFile = e.target.files[0];
        const upload = new FormData();
        upload.append("uploadFile", uploadFile);

        let url = URL + "/share/upload";

        axios({
            method: 'post',
            url: url,
            data: upload,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            this.setState({
                photoname: res.data.photoname
            })
        }).catch(err => {
            console.log("shareboard upload 오류 : " + err);
        })

    }

    onDataInsert = (resolve = null) => {
        //입력값 state 변수에 저장하기
        let subject = this.refs.subject.value;
        let addr = this.refs.addr.value;
        let content = this.refs.content.value;
        let star = 0;

        console.log(subject + ", " + addr + ", " + content);

        //db 에 insert
        let url = URL + "/share/insert";

        axios.post(url, {subject, addr, content, star}
        ).then(res => {
            //값 지우기
            this.refs.subject.value = '';
            this.refs.addr.value = '';
            this.refs.content.value = '';

            //이미지도 지우기
            this.setState({
                photoname: ''
            });

            if (resolve != null) {
                resolve();
            }
        }).catch(err => {
            console.log("shareboard insert 오류 : " + err);
        })

    }

    handleSubmit(event) {
        event.preventDefault();
        let _promise = new Promise((resolve, reject) => {
            this.onDataInsert(resolve);
        });

        _promise.then(() => {
            alert('공유하였습니다. 목록확인하세요 ' + this.state.subject);
        }).then(() => {
            this.props.history.push("/share");
        });
    }

    render() {
        //const url="http://localhost:9002/photo/";
        console.log("ShareBoardFormComp render()", this.props);

     
            

        return (
            <div>
                <div id="ShareFormSubject">
                <h3>맛집공유</h3>
                </div>

             
                <table id="ShareFormAll" className="table table-bordered" style={{borderRadius:'50px'}}>
                    <tr>
                        <th style={{verticalAlign:'middle'}}><span>맛집이름</span></th>
                        <td>
                            <input className="form-control" type="text" style={{width: '200px', height: '60px'}}
                                   placeholder="맛집이름을 적어주세요" ref="subject"/>
                        </td>
                    </tr>

                    <tr>
                        <th style={{verticalAlign:'middle'}}><span >맛집주소</span></th>
                        <td>
                            <input className="form-control" type="text" style={{width: '400px', height: '60px'}}
                                   placeholder="맛집주소를 적어주세요" ref="addr"/>
                        </td>
                    </tr>

                    <tr>
                        <th style={{verticalAlign:'middle'}}><span>이미지</span></th>
                        <td>
                            <input type="file" onChange={this.uploadImage.bind(this)}/>
                            {/* <img src={url + this.state.photoname} alt="이미지없음" style={{width:'200px',height:'300px'}}/> */}
                        </td>
                    </tr>

                    <tr>
                        <th style={{verticalAlign:'middle'}}><span>리뷰</span></th>
                        <td>
                         <textarea maxLength="1000" className="form-control"
                                   style={{width: '600px', height: '150px', resize: 'none',cursor:'auto'}}
                                   ref="content" placeholder="리뷰를 입력하세요">
                         </textarea>
                        </td>
                    </tr>

                    <tr>
                        <th style={{verticalAlign:'middle'}}><span>평가</span></th>
                        <td>
                            <b>별점 이미지</b>
                        </td>
                    </tr>

                </table>
              
                
                <div id="ShareFormButton">
                <button type="button" className="btn btn-outline-warning"
                        style={{color:'darkorange'}}
                        onClick={this.handleSubmit.bind(this)}
                >공유하기
                </button>
                <Link to="/share">
                    <button type="button" className="btn btn-outline-warning"
                    style={{color:'darkorange'}}>목록</button>
                </Link>
                </div>
            </div>
        )
    }

}

export default ShareBoardFormComp;
