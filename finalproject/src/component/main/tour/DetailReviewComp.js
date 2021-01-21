import React,{Component} from 'react';
import ReviewListComp from './ReviewListComp';
import axios from 'axios';

class DetailReviewComp extends Component {

    constructor(props){
        super(props);

        this.contentsid = this.props.contentsid;

        this.state={
            content:''
        }
    }

    changeHandler=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    insertReview=()=>{
        let memNum = 'sanghee'; // 나중에 로그인상태의 아이디 집어넣기
        let star = 5;
        let content = this.state.content;
        let contentsid = this.contentsid;

        let url = "http://localhost:9002/sreview/insert";
        //let url = "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/sreview/insert";

        axios.post(url, {contentsid, memNum, star, content})
            .then(res=>{
                this.setState({
                    content : ""
                })
            }).catch(err=>{
                console.log("DetailReviewComp insert 오류 : " + err);
            })

    }

    render() {

        return (
            <div>

                <table style={{width: '80%'}}>
				    <tbody>
                        <tr>
                            <td style={{width: '70%'}}>
                                {/* </td><input type="hidden" name="star" id="spotReviewStar" value="0"> */}
                                <textarea name="content" id="srContent" style={{height: '150px', resize: 'none'}} value={this.state.content} 
                                    className="form-control" onChange={this.changeHandler.bind(this)}></textarea>
                    
                            </td>
                            <td style={{width: '10%', paddingLeft: '10px'}}>
                                <button type="button" className="btn btn-warning" id="btnInsertReview" style={{height:'150px', width: '100%'}}
                                    onClick={this.insertReview.bind(this)}><b>작&nbsp;성</b></button>
                            </td>
                        </tr>
                    </tbody>
			    </table>
                <br/><br/>
                <ReviewListComp contentsid={this.contentsid}/>
            </div>
        );
    }
}

export default DetailReviewComp;