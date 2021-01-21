import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardUpdateForm from "./ShareBoardUpdateForm";
import axios from "axios";


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


//  모달창
// export  const [open, setOpen] = React.useState(false);
  
// export    const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     export    const handleClose = () => {
//       setOpen(false);
//     };


class ShareBoardRowItem extends Component {

    //삭제하는 함수 이벤트
    onDeleteData=()=>{
        let url="http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/share/delete?num="+this.num;
        axios.delete(url)
        .then(res=>{
            //목록으로 이동
            this.props.history.push("/list");
        })
    }

 



    render() {
        const {row}=this.props;
    
    

        return (
            <div>
                <div style={{border:'1px solid black',marginBottom:'50px'}}>
             
                <th style={{width: '400px', borderRight: '1px solid black'}} >{row.photo}</th>

                <th style={{width: '600px', borderRight: '1px solid black'}}>
                    
                    <tr><span>{row.star}</span></tr>
                    <tr><span>{row.subject}</span></tr>
                    <tr><span>{row.addr}</span></tr>
                    <tr><span>{row.content}</span></tr>
                    <tr><span>{row.id}/{row.writerday}</span></tr> 
                </th>

                <th style={{width: '200px'}}>
                    <tr>
                        <button type="button">좋아요</button>
                    </tr>
                    <tr>
                        <button type="button">찜하기</button>
                    </tr>
                    <tr>
                        <Link to="/ShareBoard/ShareBoardUpdateForm">
                        <button type="button">수정</button>
                        </Link>
                        <Route exact path="/ShareBoard/ShareBoardUpdateForm" component={ShareBoardUpdateForm}/>
                                     
                        <button type="button" onClick={this.onDeleteData.bind(this)}>삭제</button>
                    </tr>
                    <tr>
                        <button type="button">댓글쓰기</button>
                        <button type="button">댓글목록</button>
                    </tr>

                </th> 

                </div>
                {/* 모달창 */}

                {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog> */}
            </div>


        )
    }

}


export default ShareBoardRowItem;
