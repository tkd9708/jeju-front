import React, {Component} from "react";
import { Route,Link } from "react-router-dom";
import ShareBoardFormComp from "./ShareBoardFormComp";



class ShareBoardPageComp extends Component {

    constructor(props) {
        super(props);
        console.log("ShareBoardPageComp constructor", props);
    }

    render() {
        console.log("ShareBoardPageComp render()", this.props);
        return (
       <div>
          {/* 제목 */}
          <div>
          <b>맛집 공유게시판</b>
          </div>
         
          {/* 공유버튼 */}
          <div>
          <Link to="./ShareBoard/ShareBoardFormComp">
          <button type="button">맛집공유</button>
          </Link>

          <Route exact path="/ShareBoard/ShareBoardFormComp" component={ShareBoardFormComp} />
          </div>
         
          {/* 게시판 폼 */}
        <div>
          <table style={{width:'1200px',border:'1px solid black'}}>
            
               <th style={{width:'400px',borderRight:'1px solid black'}}>이미지</th>
               
               <th style={{width:'600px',borderRight:'1px solid black'}}>
                 <tr ><span>별점</span></tr>
                 <tr><span>맛집이름</span></tr>
                 <tr><span>맛집주소</span></tr>
                 <tr><span>리뷰</span></tr>
                 <tr><span>작성자/작성날짜</span></tr>
               </th>
               
               <th style={{width:'200px'}}>
                 <tr><button type="button">좋아요</button></tr>
                 <tr><button type="button">찜하기</button></tr> 
                 <td>
                   <button type="button">댓글쓰기</button>
                   <button type="button">댓글목록</button>  
                 </td> 
               </th>
             
        
            
           </table>
        </div> 

          {/* <div style={{width:'1000px', height:'300px',border:'1px solid black'}}>
          
          <div style={{width:'200px',height:'300px',borderRight:'1px solid black',float:'left'}}>
          첫번째 영역
          </div>
          
          <div style={{width:'200px',height:'100px',borderRight:'1px solid black',float:'left'}}>
          두번째 영역
          </div>
          
          <div style={{width:'200px',height:'300px',borderRight:'1px solid black'}}>
          세번째 영역
          </div>
          
          </div> */}

          
      
        
          {/* 검색창 */}
          <div>
          <input type="text" placeholder="검색할 단어를 입력하세요."/>
          <button type="button">검색</button>
          </div>
    </div>
        )
    }

}

export default ShareBoardPageComp;
