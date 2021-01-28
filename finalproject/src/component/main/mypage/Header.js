import React, { Component } from 'react'
import moment from 'moment';
import {FcPrevious,FcNext,FcList} from 'react-icons/fc';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './style/RCA.css';



 class Header extends React.Component {
    constructor(props){
        super(props);

        this.state={
            open : false,
            setOpen : false
        }
        
    }

    handleClose = () => {
        this.setState({
            open: false
        })
      };
    render() {
        // const [getMoment, setMoment]=useState(moment());     
        // const today = getMoment;   
        return (
            <div className="RCA-header-container">
                <h2 className="RCA-header-calendarYM RCA-header-middle">
                    {this.props.calendarYM}
                    <div className="RCA-header-list" onClick={
                        ()=>{
                            this.setState({
                                open: true
                            })
                        }
                    }>
                        <FcList />
                    </div>

                </h2>
                <h3 className="RCA-header-today RCA-header-middle">
                    {this.props.today}
                </h3>
                <ul className="RCA-header-buttons RCA-header-middle">
                    <li>
                    <i className="move-button left icon" onClick={()=>{this.props.moveMonth(-1)}}>
                        <FcPrevious/>   
                    </i>
                    </li>
                    <li className="move">
                        이동
                    </li>
                    <li>
                    <i className="move-button right icon" onClick={()=>{this.props.moveMonth(1)}}>
                        <FcNext/>
                    </i>
                    </li>
                </ul>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="calModal"
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                    <div className="calPaper">
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                    </div>
                    </Fade>
                </Modal>
            </div>
        )
    }
}


  
  
  
    


export default Header;


