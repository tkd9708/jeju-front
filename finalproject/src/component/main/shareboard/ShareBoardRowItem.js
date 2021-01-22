import React, {Component,useState} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardUpdateForm from "./ShareBoardUpdateForm";
import Modal from './modal';

import axios from "axios";









class ShareBoardRowItem extends Component {

     state={
        modalOpen:false
     }

    constructor(props){
        super(props);

    }


    //삭제하는 함수 이벤트
    onDeleteData=(num)=>{
        //console.log("share : " + num);
        // let url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/share/delete?num="+ num;
        // axios.delete(url)
        // .then(res=>{
        //     //목록으로 이동
        //     this.props.history.push("/list");
        // })
    }

     openModal = () => {
         this.setState({ modalOpen: true })
     }
     closeModal = () => {
         this.setState({ modalOpen: false })
     }


    render() {
        const {row}=this.props;
    
    

        return (
            <div>
                 <React.Fragment>
                <div style={{border:'1px solid black',width:'400px',height:'450px',margin:'80px',float:'left',cursor:'pointer'}} onClick={this.openModal.bind(this)}>
                   
                    <div style={{borderBottom:'1px solid black', width:'400px',height:'250px'}}>{row.photo}</div>
                    
                                           
                    <div style={{borderBottom:'1px solid black', width:'400px',height:'50px', alignItems:'center'}} >맛집이름:{row.subject}</div>
                   

                  
                    <div style={{borderBottom:'1px solid black', width:'400px',height:'100px'}} >
                    
                    <div >평점:{row.star}</div>            
           
                    <div>주소:{row.addr}</div>
                    
                    </div >

                    <div>
                    
                    

                    <div style={{width:'400px',height:'50px'}}>

                    <div style={{float:'left'}}>조회수:{row.readcount}</div>
                        
                        
                        <button type="button" style={{float:'right'}}
                        onClick={
                        ()=>{
                        console.log(row.num + ", " + row.regroup);

                        // let url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/share/delete?regroup=" + row.regroup + "&num="+ num;
                        // axios.delete(url)
                        // .then(res=>{
                        //     //목록으로 이동
                        //     this.props.list();
                        // })
                        }
                        }>삭제</button>


                        <Link to="/ShareBoard/ShareBoardUpdateForm">
                        <button type="button" style={{float:'right'}} >수정</button>
                        </Link>
                        <Route exact path="/ShareBoard/ShareBoardUpdateForm" component={ShareBoardUpdateForm}/>
                        

                        
                     
                    </div>
                                         
                    
                    </div>  
                  
                   
                    
                    {/* //header 부분에 텍스트를 입력한다. */}
                    <Modal open={ this.state.modalOpen } close={ this.closeModal.bind(this) } header="맛집이름">

                     {/* // Modal.js <main> { props.children } </main>에 내용이 입력된다.  */}
                     <div style={{border:'1px solid black', width:'420px',height:'700px'}} margin="auto">
                         
                         <div style={{borderBottom:'1px solid black',height:'50px'}}>
                         
                            <div style={{float:"left"}}>(작성자) 님이 공유하신 맛집입니다.</div>
                         
                            <div style={{float:"right"}}>
                                <input type="button" value="찜하기"/>

                            </div>

                         </div>

                         <div style={{borderBottom:'1px solid black', width:'420px',height:'200px'}}>{row.photo}</div>

                         
                         <div style={{borderBottom:'1px solid black',width:'420px',height:'300px'}}>
                            <div>평점:{row.star}</div>

                            <div>주소:{row.addr}</div>

                            <div>리뷰:{row.content}</div>

                            <div>작성일:{row.writeday}</div>
                         </div>

                         <b>댓글------------------------------------------------------</b>

                         <div style={{width:'420px'}}>
                         
                            <div style={{float:'left',marginTop:'20px'}}>
                         
                               <div style={{float:'left',marginRight:'20px',marginBottom:'20px'}}>id</div>
                         
                               <div style={{float:'left'}}>
                                   <input type="button" className="glyphicon glyphicon-camera" value="이미지"/>
                               </div>
                        
                               <div style={{float:'left'}}>
                                   <textarea placeholder="댓글을 입력하세요" style={{width:'350px'}}/>
                                   <input type="button" value="저장" style={{float:'right'}}/>
                               </div>
  
                            </div>

                        </div>
                     </div>
                     </Modal>
                     
 
                    
            </div>
            </React.Fragment>
               
                     



               
            </div>


        )
    }

}


export default ShareBoardRowItem

