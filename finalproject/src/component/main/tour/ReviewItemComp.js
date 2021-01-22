import React,{Component} from 'react';
import axios from 'axios';

class ReviewItemComp extends Component {


    render() {
        const {row}=this.props;
        const photoname = row.photoname=="no"?"":row.photo;
        return (
            <tr>
                <td style={{width:'15%'}}>
                    <img src={photoname} alt="이미지 없음" style={{width:'100px', height:'100px'}}/>
                </td>
                <td valign="top" style={{width:'50%'}} align="left">
                    <span style={{color: '#F0CD58', fontSize: '18px'}}>★★★★★</span>
                    <br/><br/>
                    <p style={{fontSize: '12pt'}}>{row.content}</p>
                </td>
                <td valign="bottom" style={{width:'15%'}}>
                    <div style={{float: 'right'}}>
                        <b>{row.memNum}</b> | {row.writeday}
                    </div>		
                </td>
            </tr> 
        );
    }
}

export default ReviewItemComp;