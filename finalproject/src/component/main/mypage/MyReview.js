import React, {Component} from "react";
import axios from 'axios';
import {URL} from "../../../redux/config";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ReviewList from './ReviewList';
import './style/MyReviewCss.css';

class MyReview extends Component {

    constructor(props) {
        super(props);
        // console.log("MyReview constructor", props); 
    }
    state = {
        reviewList: []
    }
    getMyReview = () => {
        let url = URL + '/wish/myreview?start=0&end=5&memNum=sanghee';
        axios.get(url)
            .then(response => {
                // console.log(response.data);
                this.setState({
                    reviewList: response.data
                })
            }).catch(err => {
            console.log("목록 오류:" + err);
        })
  
    }
    componentDidMount() {
        this.getMyReview();
    }
    render() {
        // console.log("MyReview render()", this.props);
        return (
            <div>
                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#036E38'}}>
                        &nbsp;&nbsp;&nbsp;나의 리뷰&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
                <br/>
                <div className="detailIntro" style={{color: "#888", textAlign: 'center', marginBottom: '0px'}}>
                    회원님이 작성하신 Review 목록입니다.
                </div>
                <Paper id="mypageReview">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className="mypageReCol">#</TableCell>
                                <TableCell align="center" className="mypageReCol">photo</TableCell>
                                <TableCell align="center" className="mypageReCol">review</TableCell>
                                <TableCell align="center" className="mypageReCol">star</TableCell>
                                <TableCell align="center" className="mypageReCol">date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.reviewList.map((row, idx)=>(
                                <ReviewList row={row} idx={idx}/>
                            ))}
                            {/* {this.state.reviewList ? this.state.reviewList.map(r, idx => {
                            return <ReviewList key={r.num} num={r.num} photo={r.photo} content={r.content} memNum={r.memNum} idx={idx} 
                            star={r.star} likes={r.likes} contentsid={r.contentsid} writeday={r.writeday} history={this.props.history}/>
                            }) : ''} */}
                        </TableBody>
                    </Table>
                </Paper>
            </div>              
        );
    }
}
        
export default MyReview;