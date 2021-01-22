import React, {Component} from "react";
import { Route,Link } from "react-router-dom";
import ShareBoardPageComp from "./ShareBoardPageComp";
import axios from "axios";
import {URL} from '../../../redux/config';



class ShareBoardFormComp extends Component {
   
   state={       
      photoname:''
     }

    constructor(props) {
        super(props);
        console.log("ShareBoardFormComp constructor", props);
 
    }

    //서버에 이미지 업로드하는 함수
    uploadImage=(e)=>{
         const uploadFile = e.target.files[0];
         const upload=new FormData();
         upload.append("uploadFile", uploadFile);
         
         let url = URL + "/share/upload";
          //let url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot8/share/upload";

          axios({
             method: 'post',
             url:url,
             data: upload,
             headers:{'Content-Type':'multipart/form-data'}
          }).then(res=>{
             this.setState({
                photoname: res.data.photoname
             })
          }).catch(err=>{
             console.log("shareboard upload 오류 : " + err);
          })

      }

       onDataInsert=()=>{
          //입력값 state 변수에 저장하기
          let subject=this.refs.subject.value;
          let addr=this.refs.addr.value;
          let content=this.refs.content.value;
          let star = 0;
         
         console.log(subject + ", " + addr + ", " + content);

          //db 에 insert
          let url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot8/share/insert";

          axios.post(url,{subject,addr,content,star})
          .then(res=>{
              //값 지우기
              this.refs.subject.value='';
              this.refs.addr.value='';
              this.refs.content.value='';
             
            
              //이미지도 지우기
              this.setState({
                  photoname:''
              })
          }).catch(err=>{
             console.log("shareboard insert 오류 : " + err);
          })
 
       }
     
       handleSubmit(event) {
         alert('공유하였습니다. 목록확인하세요 ' + this.state.subject);
         event.preventDefault();
         this.onDataInsert();
       }

    render() {
        //const url="http://localhost:9002/photo/";
        console.log("ShareBoardFormComp render()", this.props);

        return (
            <div>
                <b>맛집공유</b>

                <table style={{width:'800px',border:'1px solid black'}}>
                   <tr>
                      <th><span>맛집이름</span></th>
                      <td>
                         <input type="text" style={{width:'200px',height:'20px'}} placeholder="맛집이름을 적어주세요" ref="subject" />
                      </td>
                   </tr>

                   <tr>
                      <th><span>맛집주소</span></th>
                      <td>
                         <input type="text" style={{width:'400px',height:'20px'}} placeholder="맛집주소를 적어주세요" ref="addr"/>
                      </td>
                   </tr>

                   <tr>
                      <th><span>이미지</span></th>
                      <td>
                      <input type="file" onChange={this.uploadImage.bind(this)}/>
                      {/* <img src={url + this.state.photoname} alt="이미지없음" style={{width:'200px',height:'300px'}}/> */}
                      </td>
                   </tr>

                   <tr>
                      <th><span>리뷰</span></th>
                      <td>
                         <textarea maxLength="1200" style={{width:'400px',height:'120px',resize:'none'}} ref="content" ></textarea>
                      </td>
                   </tr>

                   <tr>
                      <th><span>평가</span></th>
                      <td>
                         <b>별점 이미지</b>
                      </td>
                   </tr>

                </table>
                <button type="button" onClick={this.handleSubmit.bind(this)}>공유하기</button>

                <Link to="./ShareBoard/ShareBoardPageComp">
                    <button type="button">맛집목록</button> 
                    </Link>
                    <Route exact path="/ShareBoard/ShareBoardPageComp" component={ShareBoardPageComp}/>
            </div>
        )
    }

}

export default ShareBoardFormComp;
