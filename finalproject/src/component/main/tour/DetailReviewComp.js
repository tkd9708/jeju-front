import React,{Component} from 'react';
import axios from 'axios';
import {URL} from '../../../redux/config';
import store from "../../../redux/store";
import {actionType, mainViewType} from "../../../redux/config";

class DetailReviewComp extends Component {

    constructor(props){
        super(props);

        this.state={
            content:''
        }

        this.contentsid = this.props.contentsid;
        this.url = window.location.href.split("/").reverse()[1];

    }

    setMainView = (mainView) => {
        console.log("Home setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            // mainView: mainViewType.MainPage
            mainView: mainView
        });
    }

    componentWillMount(){
        //const url = window.location.href.split("/").reverse();
        console.log("투어디테일 페이지 willMount : " + this.url);
        
    }

    componentWillUnmount(){
        console.log("투어디테일 페이지 willunMount");
    }

    componentDidUpdate(){
        console.log("투어디테일 페이지 DidUpdate : " + window.location.href);
        const changeUrl = window.location.href.split("/").reverse()[1];
        if(this.url != changeUrl){
            this.setMainView(mainViewType.TourList);
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

        //let url = "http://localhost:9002/sreview/insert";
        let url = URL + "/sreview/insert";

        axios.post(url, {contentsid, memNum, star, content})
            .then(res=>{
                this.setState({
                    content : ""
                })
                //window.location.reload();
                this.props.getList();
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
            </div>
        );
    }
}

export default DetailReviewComp;