import React,{Component} from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import store from '../../../redux/store';
import Backdrop from '@material-ui/core/Backdrop';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class RentCarItem extends Component
{
    constructor(props) {
        super(props);
        console.log("RentCarItem constructor", props);
        this.state={
            memId:'',  
            name:'',
            address: '',
            wishday:'',
            wishtime:'',
        };
    }

    onInsertContent = () => {
        let url = URL + "/wish/insertcontent";
        let memId = store.getState().loginId;        
        let content = '렌트카,' + this.refs.name.value + ',' + this.refs.address.value;
        let wishday = this.refs.wishday.value;
        let wishtime = this.refs.wishtime.value;
        
        // console.log(memId);
        // console.log(content);
        // console.log(wishday);
        if(wishday == '' || wishtime == '')
            alert("날짜와 시간을 모두 선택해주세요.");
        else{
            axios.post(url, {memId, content, wishday, wishtime
            }).then(res => {
                alert("저장 완료");
            }).catch(err=>{
                console.log("예약 내용 저장시 오류:"+err);
            })
        }
    } 

    // modal 함수
    handleOpen = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            this.setState({
                open: true
            })
        }
        
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    render(){
        const {row, num}=this.props;
        return(
            <tr>
                    <td>{num+1}</td>
                    <td>{row.name}</td>
                    <td>{row.form}</td>
                    <td>{row.address}</td>
                    <td>{row.totalcar}</td>
                    <td>{row.opentime}</td>
                    <td>{row.closetime}</td>
                    <td>{row.homepage}</td>
                    <td>{row.phonenum}</td>
                    <td>{row.checkdate}</td>
                    <td><Button variant="outlined" id="thumbAddBtn" 
                    onClick={this.handleOpen.bind(this)}>일정추가</Button></td>
                    {/* 렌트카 예약 시간 저장 모달 */}
                <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={this.state.open}>
                        <div className="rentcar">
                            <span>렌트카예약 저장</span><br/>
                            <input type="text" ref="name" value={row.name}/><br/>
                            <input type="text" ref="address" value={row.address}/><br/><br/>
                            🗓&nbsp;&nbsp;대여일
                            <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                            ⏰&nbsp;&nbsp;대여시작 시간
                            <input type="time" class="form-control form-control-sm" ref="wishtime"></input><br/>
                            <div style={{textAlign: 'center'}}>
                                <button type="button" class="btn btn-warning spotmodalBtn" 
                                onClick={this.onInsertContent.bind(this)}><b>추가</b></button>
                            </div>
                        </div>
                        </Fade>
                </Modal>
            </tr>
        )
    }
}

export default RentCarItem;