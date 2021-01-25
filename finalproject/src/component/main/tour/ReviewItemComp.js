import React,{Component} from 'react';
import axios from 'axios';
import {URL} from '../../../redux/config';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

class ReviewItemComp extends Component {


    render() {
        const {row}=this.props;
        const url = URL + "/photo/";
        // const url = "http://localhost:9002/photo/";
        const photo = row.photo==="no"?"":<td style={{width:'10%'}}>
                            {/* <img src={url + row.photoname} alt="이미지 없음" style={{width:'100px', height:'100px'}}/> */}
                            <div className="tourReImg" style={{display:'inline-block', border: '1px solid gray'}}></div>
                        </td>;
        const w = row.photo==="no"?"2":"0";
        const star = row.star==1?<SentimentVeryDissatisfiedIcon/>:row.star==2?<SentimentDissatisfiedIcon/>
        :row.star==3?<SentimentSatisfiedIcon/>:row.star==4?<SentimentSatisfiedAltIcon/>:<SentimentVerySatisfiedIcon/>

        return (
            <tr>
                {photo}
                <td style={{width:'60%', padding: '10px'}} align="left" colSpan={w}>
                    
                    &nbsp;&nbsp;
                    <span style={{color: '#F0CD58'}}>{star}</span>
                    &nbsp; &nbsp;<b>{row.memNum}</b>
                    <br/><br/>
                    <p>{row.content}</p>
                    <div style={{float: 'right', color: '#aaa'}}>
                         {row.writeday}
                    </div>
                </td>
            </tr> 
        );
    }
}

export default ReviewItemComp;