import React,{Component}  from 'react';
import { Route,Link } from "react-router-dom";
import ShareBoardPageComp from "./ShareBoardPageComp";
// import ShareBoardFormComp from "./ShareBoardFormComp";
import axios from "axios";

class ShareBoardUpdateForm extends Component
{
    constructor({match},props)
    {
        super(props);
        console.log("ShareBoardUpdateForm constructor", props);
        this.num=match.params.num;
        this.state={       
            photoname:''
        }
    }
   

      //서버에 이미지 업로드하는 함수
      uploadImage=(e)=>{
        const uploadFile = e.target.files[0];
        const upload=new FormData();
        upload.append("uploadFile", uploadFile);
        
         let url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/share/upload";

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

    //num 에 해당하는 데이타 가져오기
    onSelectData=()=>{
        let url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/share/select?num="+this.num;
        axios.get(url)
        .then(res=>{
            this.refs.subject.value=res.data.subject;
            this.refs.addr.value=res.data.addr;
            this.refs.content.value=res.data.content;
            //이미지명은 state 이므로
            this.setState({
                photoname:res.data.photoname
            })            
        })  

    }

    componentWillMount(){
        this.onSelectData();
    }


    onDataUpdate=()=>{
        //입력값 변수에 저장하기
        let subject=this.refs.subject.value;
        let addr=this.refs.addr.value;
        let content=this.refs.content.value;
        let star = 0;
        
        //db 에 update
        let url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/share/update";
        let num=this.num;
        axios.post(url,{num,subject,addr,content,star})
        .then(res=>{
            //리스트로 이동
            this.props.history.push("/ShareBoard"+num);
        }).catch(err=>{
         console.log("수정시 오류남:"+err);
      })

    }

   //  handleSubmit(event) {
   //      alert('수정하였습니다.' + this.state.subject);
   //      event.preventDefault();
   //      this.onDataInsert();
   //    }

    render(){
        const url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/share/upload";
        console.log("ShareBoardUpateForm render()", this.props);
        return (
            <div>
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
                {/* <button type="button" onClick={this.handleSubmit.bind(this)}>수정하기</button> */}
                <button type="button" onClick={this.onDataUpdate.bind(this)}>수정하기</button>
                <Link to="/ShareBoardPageComp">
                <button type="button">취소</button>
                </Link>
                <Route exact path="/ShareBoardPageComp" component={ShareBoardPageComp}/>

           

            </div>
        )
    }
}

export default ShareBoardUpdateForm;
