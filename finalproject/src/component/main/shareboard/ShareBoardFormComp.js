import React, {Component} from "react";
import { Route,Link } from "react-router-dom";
import ShareBoardPageComp from "./ShareBoardPageComp";
import axios from "axios";



class ShareBoardFormComp extends Component {

   
   state={       
      photoname:''
     }

    //서버에 이미지 업로드하는 함수
    uploadImage=(e)=>{
      const uploadFile=e.target.files[0];
      const imageFile=new FormData();
      imageFile.append("uploadFile",uploadFile);
 
      let url="http://192.168.0.220:9002/share/insert";
      
      axios({
          method:'post',
          url:url,
          data:imageFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            this.setState({
                photoname:res.data.photoname
            })
        })

      }

       onDataInsert=()=>{
          //입력값 state 변수에 저장하기
          let subject=this.refs.subject.value;
          let addr=this.refs.addr.value;
          let content=this.refs.content.value;
         
         
          //db 에 insert
          let url="http://192.168.0.220:9002/share/insert";
          axios.post(url,{subject,addr,content})
          .then(res=>{
              //값 지우기
              this.refs.subject.value='';
              this.refs.addr.value='';
              this.refs.content.value='';
             
            
              //이미지도 지우기
              this.setState({
                  photoname:''
              })
          })
 
       }

      handleChange(event) {
         this.setState({value: event.target.subject});
         this.setState({value: event.target.addr});
         this.setState({value: event.target.content});
       }
     
       handleSubmit(event) {
         alert('공유하였습니다. 목록확인하세요 ' + this.state.subject);
         event.preventDefault();
         this.onDataInsert();
       }





    constructor(props) {
        super(props);
        console.log("ShareBoardFormComp constructor", props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
 
    }

  

    render() {
        const url="http://192.168.0.220:9002/share/insert";
        console.log("ShareBoardFormComp render()", this.props);
        return (
            <div>
                <b>맛집공유</b>

                <form onSubmit={this.handleSubmit} method="post">
                <table style={{width:'800px',border:'1px solid black'}}>
                   <tr>
                      <th><span>맛집이름</span></th>
                      <td>
                         <input type="text" style={{width:'200px',height:'20px'}} placeholder="맛집이름을 적어주세요" name="subject" />
                      </td>
                   </tr>

                   <tr>
                      <th><span>맛집주소</span></th>
                      <td>
                         <input type="text" style={{width:'400px',height:'20px'}} placeholder="맛집주소를 적어주세요" name="addr"/>
                      </td>
                   </tr>

                   <tr>
                      <th><span>이미지</span></th>
                      <td>
                      <input type="file" onChange={this.uploadImage.bind(this)}/>
                      <img src={url+this.state.photoname} alt="이미지없음" style={{width:'200px',height:'30px'}}/>
                      </td>
                   </tr>

                   <tr>
                      <th><span>리뷰</span></th>
                      <td>
                         <textarea maxLength="1200" style={{width:'400px',height:'120px',resize:'none'}} name="content" ></textarea>
                      </td>
                   </tr>

                   <tr>
                      <th><span>평가</span></th>
                      <td>
                         <b>별점 이미지</b>
                      </td>
                   </tr>

                </table>
               

                <div>
                    
                    <input type="submit" value="공유하기"/>
                    <Link to="./ShareBoard/ShareBoardPageComp">
                    <button type="button">맛집목록</button> 
                    </Link>
                    <Route exact path="/ShareBoard/ShareBoardPageComp" component={ShareBoardPageComp}/>
                </div>

                </form>
            </div>
        )
    }

}

export default ShareBoardFormComp;
