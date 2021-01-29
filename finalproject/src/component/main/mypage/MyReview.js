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

class MyReview extends Component {

    constructor(props) {
        super(props);
        // console.log("MyReview constructor", props); 
    }
    state = {
        reviewList: []
    }
    getMyReview = () => {
        let url = URL + '/wish/recentreview?memNum=sanghee';
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
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>num</TableCell>
                            <TableCell>photo</TableCell>
                            <TableCell>content</TableCell>
                            <TableCell>memNum</TableCell>
                            <TableCell>star</TableCell>
                            <TableCell>likes</TableCell>
                            <TableCell>writeday</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.reviewList ? this.state.reviewList.map(r => {
                        return <ReviewList key={r.num} num={r.num} photo={r.photo} content={r.content} memNum={r.memNum} 
                        star={r.star} likes={r.likes} contentsid={r.contentsid} writeday={r.writeday} history={this.props.history}/>
                        }) : ''}
                    </TableBody>
                </Table>
            </Paper>              
        );
    }
}
        
export default MyReview;