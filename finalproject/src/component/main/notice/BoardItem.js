import React,{Component} from 'react';
import {Route, Link} from "react-router-dom";
import axios from "axios";
import {URL} from '../../../redux/config';

class BoardItem extends Component
{
    updateStar=()=>{
        let url = URL + "/notice/updatestar?num=" + this.props.row.num;

        axios.get(url)
        .then(res=>{
            this.props.list();
        }).catch(err=>{
            console.log("notice updateStar 오류 : " + err)
        })
    }

    render(){
        const {row, idx, history}=this.props;
        return(
            
            <tr>

                <td align='center'>{idx+1}</td>
                
                    <td align='center'>
                        
                        <Link to={`/notice/content/${row.num}`}>{row.subject}</Link>
                    </td>
                <td align='center'>{row.writeday.toLocaleString('ko-KR')}</td>
                <td align='left'>{row.star==1?<span style={{cursor: 'pointer'}} onClick={this.updateStar.bind(this)}>⭐</span>
                    :<span className="far fa-star" style={{cursor: 'pointer'}} onClick={this.updateStar.bind(this)}></span>}</td>

            </tr>


        )
    }
}

export default BoardItem;