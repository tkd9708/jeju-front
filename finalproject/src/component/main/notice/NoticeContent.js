import axios from 'axios';
import React,{Component}  from 'react';
import {URL} from '../../../redux/config';

class NoticeContent extends Component
{
    constructor({match})
    {
        super();
        
        this.state={
            selectData:''
        }
        this.num = match.params.num;
    }

    onSelectData=()=>{
        let url= URL + "/notice/detail?num=" + this.num;
    
        axios.get(url)
        .then(res=>{
            this.setState({
                selectData:res.data
            })
        }).catch(err=>{
            console.log("notice content 오류 : " + err);
        })
    }   

    onDeleteData=()=>{
        let url= URL + "/notice/delete?num=" + this.num;
    
        if(window.confirm("삭제하시겠습니까?")){
            axios.get(url)
            .then(res=>{
                this.props.history.push("/notice");
            }).catch(err=>{
                console.log("notice delete 오류 : " + err);
            })
        }
    }

    componentWillMount() {
        // console.log("content willmount");
        this.onSelectData();
    }

    render(){
        // let url=document.getElementById("url").textContent
        const {selectData}=this.state;


        return (
            <div>
                <table className="table table-bordered"
                style={{width:'400px'}}>
                    <caption><h3>{selectData.title}</h3></caption>
                    <tbody>
                        <tr>
                            <td>
                                <b>작성자:{selectData.subject}</b>
                                &nbsp;&nbsp;
                               <pre>내용:{selectData.content}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align='center'>
                                <button type="button" className="btn btn-success btn-sm" style={{marginLeft:'100px',width:'100px'}}
                                    onClick={
                                        ()=>{
                                            this.props.history.push("/notice/update/" + this.num);
                                        }
                                    }>수정</button>
                                <button type="button" className="btn btn-success btn-sm" style={{marginLeft:'100px',width:'100px'}}
                                    onClick={this.onDeleteData.bind(this)}>삭제</button>

                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default NoticeContent;