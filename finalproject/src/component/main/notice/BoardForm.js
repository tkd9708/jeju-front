import React,{Component}  from 'react';
import axios from "axios";

class BoardForm extends Component
{

    onDataInsert=()=>{
        let title=this.refs.title.value;
        let content=this.refs.content.value;
        
        let url=document.getElementById("url").textContent+"notice/insert";
        axios.post(url,{title,content})
        .then(res=>{
            this.refs.title.value='';
            this.refs.content.value='';

            })

    }
    render(){
        return (
            <div>
                <table className="table table-bordered"
                    style={{width:'400px',marginLeft:'20px'}}>
                    <caption><b>글쓰기</b></caption>
                    <tbody>
                        <tr>
                            <th style={{backgroundColor:'pink',width:'100px'}}>제 목</th>
                            <td>
                                <input type="text" ref='title' className="form-control"
                                    style={{width:'250px'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{backgroundColor:'pink',width:'100px'}}>내 용</th>
                            <td>
                                <textarea ref="content" style={{width:'280px',height:'80px'}}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <button type="button" className="btn btn-success"
                                    style={{width:'100px'}}
                                    onClick={this.onDataInsert.bind(this)}>게시글저장</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default BoardForm;