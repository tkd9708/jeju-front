import React, {Component} from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import {URL} from '../../../redux/config';
import {Route, Link} from "react-router-dom";
import './style/MyReviewCss.css';

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
        const date = row.writeday.split(" ")[0];
        const photo = row.photo=="no"?"x":<img src={row.photo} alt="profile"/>;
        return (
           
                <TableRow> 
                
                <TableCell align="center" className="mypageReCol">{this.props.idx + 1}</TableCell>
                <TableCell align="center" className="mypageReCol">{photo}</TableCell>
                <TableCell className="mypageReCol"> 
                    <Link to={`/tour/${row.contentsid}`} id="mypageReviewLink">
                        {row.content}
                    </Link>   
                </TableCell>
                <TableCell align="center" className="mypageReCol">{row.star}</TableCell>
                <TableCell align="center" width="20%" className="mypageReCol">{date}</TableCell>
                
                </TableRow>
           
        );
    }
}
export default ReviewList;