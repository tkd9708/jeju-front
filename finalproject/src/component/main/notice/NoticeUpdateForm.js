import React,{Component}  from 'react';
import axios from "axios";
import {URL} from '../../../redux/config';

class NoticeUpdateForm extends Component
{

    constructor({match}, props){
        super(props);

        this.state={
            subject: '',
            content:''
        }

        this.num = match.params.num;
    }

    onSelectData=()=>{
        let url= URL + "/notice/detail?num=" + this.num;
    
        axios.get(url)
        .then(res=>{
            this.setState({
                subject : res.data.subject,
                content: res.data.content
            })
        }).catch(err=>{
            console.log("notice update getData 오류 : " + err);
        })
    }   

    componentWillMount() {
        // console.log("content willmount");
        this.onSelectData();
    }

    // onDataInsert=()=>{
    //     let subject = this.state.subject;
    //     let content = this.state.content;
    //     let id = '관리자';

        
    //     let url = URL + "/notice/insert";

    //    console.log("notice insert : " + subject + ", " + content);
    //     axios.post(url, {id,subject,content})
    //     .then(res=>{
    //         this.setState({
    //             subject:'',
    //             content:''
    //         })
    //         this.props.list();
    //     }).catch(err=>{
    //         console.log("notice insert 오류 : " + err)
    //     })

    // }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render(){
        return (
            <div>
                <table className="table table-bordered"
                    style={{width:'400px',marginLeft:'20px'}}>
                    <caption><b>수정</b></caption>
                    <tbody>
                        <tr>
                            <th style={{backgroundColor:'pink',width:'100px'}}>제 목</th>
                            <td>
                                <input type="text" className="form-control" name="subject" value={this.state.subject}
                                    style={{width:'250px'}} onChange={this.handleChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{backgroundColor:'pink',width:'100px'}}>내 용</th>
                            <td>
                                <textarea style={{width:'280px',height:'80px'}} name="content" onChange={this.handleChange.bind(this)} value={this.state.content}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <button type="button" className="btn btn-success"
                                    style={{width:'100px'}}>게시글수정</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default NoticeUpdateForm;