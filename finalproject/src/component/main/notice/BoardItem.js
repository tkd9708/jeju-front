import React,{Component} from 'react';
import {Route, Link} from "react-router-dom";

class BoardItem extends Component
{
    render(){
        const {row, idx}=this.props;
        return(
            <tr>  
                <td align='center'>{idx+1}</td>
                <td align='center'>
                    <Link to={`/notice/content/${this.props.row.num}`}>
                        {row.subject}
                    </Link>
                </td>
                <td align='center'>{row.writeday.toLocaleString('ko-KR')}</td>
                <td align='left'>별</td>

            </tr>


        )
    }
}

export default BoardItem;