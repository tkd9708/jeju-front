import React, { Component } from 'react'
import moment from 'moment';
import {IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


 class Header extends React.Component {
    constructor(props){
        super(props);
        
    }
    render() {
        // const [getMoment, setMoment]=useState(moment());     
        // const today = getMoment;   
        return (
            <div className="RCA-header-container">
                <h2 className="RCA-header-calendarYM RCA-header-middle">
                    {this.props.calendarYM}
                </h2>
                <h3 className="RCA-header-today RCA-header-middle">
                    {this.props.today}
                </h3>
                <ul className="RCA-header-buttons RCA-header-middle">
                    <li>
                    <i className="move-button left icon" onClick={()=>{this.props.moveMonth(-1)}}>
                        <IoIosArrowBack />   
                    </i>
                    </li>
                    <li className="move">
                        이동
                    </li>
                    <li>
                    <i className="move-button right icon" onClick={()=>{this.props.moveMonth(1)}}>
                        <IoIosArrowForward />
                    </i>
                    </li>
                </ul>
            </div>
        )
    }
}


export default Header;


