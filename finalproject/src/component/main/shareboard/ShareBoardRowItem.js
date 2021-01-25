import React, {Component,useState} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardUpdateForm from "./ShareBoardUpdateForm";
import Modal from './Modal';
import axios from "axios";
import {URL} from '../../../redux/config';
import ShareReview from './ShareReview';


class ShareBoardRowItem extends Component {

     state={
        modalOpen:false
        
     }

    constructor(props){
        super(props);
        
        //스크롤
        this.myRef = React.createRef()
        this.state = {scrollTop: 0}
    }
  


    //스크롤
    onScroll = () => {
        const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
        const scrollTop = this.myRef.current.scrollTop
        console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`);
        this.setState({
          scrollTop: scrollTop
        })
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

    onInsertData=()=>{
      let url = URL + "/share/insert";

      axios.insert(url)
          .then(res => {
              this.insert = res.data;
              this.getList();
          })

    }

     openModal = () => {
         this.setState({ modalOpen: true })
     }

     closeModal = () => {
         this.setState({ modalOpen: false })
     }

     componentDidUpdate(){
      console.log("state변경");
     }
      
     
    

    render() {
        const {row}=this.props;
       //스크롤
        const {
            scrollTop
          } = this.state
    
    
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
                  
                   
            </div>

            {/* //header 부분에 텍스트를 입력한다. */}
            <Modal open={ this.state.modalOpen } close={ this.closeModal.bind(this) } title="share">

                    {/* // Modal.js <main> { props.children } </main>에 내용이 입력된다.  */}
                <div style={{border:'1px solid black', width:'1150px',height:'700px',margin:'auto',overflow: 'scroll'}} 
                      ref={this.myRef} onScroll={this.onScroll}>
        
                    <div style={{borderBottom:'1px solid black',height:'50px'}}>
    
                      <div style={{float:"left"}}><input type="button" value="좋아요"/></div>
       
                      <div style={{float:"left"}}>(작성자) 님이 공유하신 맛집입니다.</div>
          
                      <div style={{float:"right"}}>
                         <input type="button" value="찜하기"/>

                      </div>

                     </div>

                    <div style={{borderBottom:'1px solid black',width:'1150px',height:'400px'}}>
       
                       <div style={{borderBottom:'1px solid black',borderRight:'1px solid black',width:'550px',height:'400px',float:'left'}}>{row.photo}</div>

    
                        <div style={{borderLeft:'1px solid black', width:'600x', float:'right'}}>
                            <div style={{width:'550px',height:'50px'}}>평점:{row.star}</div>

                            <div style={{width:'550px',height:'50px'}}>주소:{row.addr}</div>

                            <div style={{width:'550px',height:'200px', marginTop:'50px'}}>리뷰:{row.content}</div>

                           <div style={{width:'550px',height:'50px'}}>작성일:{row.writeday}</div>
                        </div>
   
                    </div>


   

                    <div style={{borderBottom:'1px solid black',width:'1150px',height:'130px',marginTop:'20px'}}>
  
    
     
                        <div style={{marginLeft:"20px"}}>
                            <div style={{float:'left'}}>id</div>
    
                            <div style={{float:'left',marginRight:'100px'}} >
                              <input type="button" className="glyphicon glyphicon-camera" value="이미지"/>
                          </div>
                        </div>
   
                    <div>
                       <div>
                         <textarea placeholder="댓글을 입력하세요" style={{width:'800px',height:'100px',float:'left'}}/>
                       </div>
                       <div style={{float:'left',marginLeft:'50px'}}>
                          <button type="button" onClick={this.onInsertData.bind(this)}>저장</button>
                     </div>
                     </div>

             </div>

                   <div>
                     <ShareReview regroup={row.regroup}/>
                   </div>


   
              </div>
              </Modal>

            </React.Fragment>
               
                     



               
            </div>


        )
    }
  
}



export default ShareBoardRowItem

