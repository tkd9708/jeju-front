import React,{Component} from 'react';

class BoardItem extends Component
{
    render(){
        const {row, idx}=this.props;
        return(
            <tr>
                
                <td align='center'>{idx+1}</td>
                <td align='center'>{row.subject}</td>
                <td align='center'>{row.writeday.toLocaleString('ko-KR')}</td>
                <td align='left'>별</td>

            </tr>


        )
    }
}

export default BoardItem;