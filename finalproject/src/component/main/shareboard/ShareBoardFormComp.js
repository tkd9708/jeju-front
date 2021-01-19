import React, {Component} from "react";
import { Route,Link } from "react-router-dom";
import ShareBoardPageComp from "./ShareBoardPageComp";
import axios from "axios";



class ShareBoardFormComp extends Component {

   
   state={       
      photoname:''
     }

    //서버에 임지 업로드하는 함수
    uploadImage=(e)=>{
      const uploadFile=e.target.files[0];
      const imageFile=new FormData();
      imageFile.append("uploadFile",uploadFile);
 
      let url="http://192.168.0.220:9002/share/list?start=0&perPage=3";
      
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
         let url="http://192.168.0.220:9002/share/list?start=0&perPage=3";
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

      componentWillMount()
      {
         this.list();
      }
 



    constructor(props) {
        super(props);
        console.log("ShareBoardFormComp constructor", props);

     
 
    }

  

    render() {
        const url="http://192.168.0.220:9002/share/list?start=0&perPage=3";
        console.log("ShareBoardFormComp render()", this.props);
        return (
            <div>
                <b>맛집공유</b>

                <table style={{width:'800px',border:'1px solid black'}}>
                   <tr>
                      <th><span>맛집이름</span></th>
                      <td>
                         <input type="text" style={{width:'200px',height:'20px'}} placeholder="맛집이름을 적어주세요"/>
                      </td>
                   </tr>

                   <tr>
                      <th><span>맛집주소</span></th>
                      <td>
                         <input type="text" style={{width:'400px',height:'20px'}} placeholder="맛집주소를 적어주세요"/>
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

                <div>
                    
                    <button type="button" onClick={this.onDataInsert.bind(this)}>공유하기</button>
                    <Link to="./ShareBoard/ShareBoardPageComp">
                    <button type="button">맛집목록</button> 
                    </Link>
                    <Route exact path="/ShareBoard/ShareBoardPageComp" component={ShareBoardPageComp}/>
                </div>

            </div>
        )
    }

}

export default ShareBoardFormComp;
