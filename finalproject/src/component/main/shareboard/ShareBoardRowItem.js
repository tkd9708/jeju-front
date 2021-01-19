import React, {Component} from "react";





class ShareBoardRowItem extends Component {




    render() {
        const {row,idx,history}=this.props;
        return (
            <div>
                <div style={{border:'1px solid black',marginBottom:'50px'}}>
             
                <th style={{width: '400px', borderRight: '1px solid black'}} >이미지</th>

                <th style={{width: '600px', borderRight: '1px solid black'}}>
                    
                    <tr><span>{row.star}</span></tr>
                    <tr><span>{row.subject}</span></tr>
                    <tr><span>{row.addr}</span></tr>
                    <tr><span>{row.content}</span></tr>
                    <tr><span>{row.id}/{row.writerday}</span></tr> 
                </th>

                <th style={{width: '200px'}} >
                    <tr>
                        <button type="button">좋아요</button>
                    </tr>
                    <tr>
                        <button type="button">찜하기</button>
                    </tr>
                    <td>
                        <button type="button">댓글쓰기</button>
                        <button type="button">댓글목록</button>
                    </td>
                </th> 
                </div>
            </div>


        )
    }

}

export default ShareBoardRowItem;
