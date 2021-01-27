import React, {Component} from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import {URL} from '../../../redux/config';
import {Route, Link} from "react-router-dom";

class ReviewList extends Component {
    updateLikes = () =>{
        let url = URL + "/spot/updatelikes?contentsid=" + this.props.row.contentsid;

        axios.get(url)
            .then(res=>{
                this.props.getList();
            }).catch(err=>{
                console.log("tourlist likes 업데이트 오류 : " + err);
            })
    }
    render() {
        const {row}=this.props;
        return (
           
                <TableRow style={{cursor: 'pointer'}}> 
                
                <TableCell>{this.props.num}</TableCell>
                <TableCell><img src={this.props.photo} alt="profile"/></TableCell>
                <TableCell> 
                    <Link to={`/tour/${this.props.contentsid}`}>
                        {this.props.content}
                    </Link>   
                </TableCell>
                <TableCell>{this.props.memNum}</TableCell>
                <TableCell>{this.props.star}</TableCell>
                <TableCell>{this.props.likes}</TableCell>
                <TableCell>{this.props.writeday}</TableCell>
                
                </TableRow>
           
        );
    }
}
export default ReviewList;