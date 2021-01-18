import React, {Component} from "react";
import { Link } from "react-router-dom";


class ShareBoardFormComp extends Component {

    constructor(props) {
        super(props);
        console.log("ShareBoardFormComp constructor", props);
    }

    render() {
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
                         <input type="file" style={{width:'200px',height:'30px'}}/>
                      </td>
                   </tr>

                   <tr>
                      <th><span>리뷰</span></th>
                      <td>
                         <textarea maxLength="1200" style={{width:'400px',height:'120px',resize:'none'}}></textarea>
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
                    
                    <button type="button">공유하기</button>
                    <Link to="./main/shareboard/ShardBoardPageComp">
                    <button type="button">맛집목록</button> 
                    </Link>
                </div>

            </div>
        )
    }

}

export default ShareBoardFormComp;
