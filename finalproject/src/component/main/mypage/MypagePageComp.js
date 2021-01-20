import React, {Component} from "react";
import "./Calendar.css";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';



class MypagePageComp extends Component {

    constructor(props) {
        super(props);
        console.log("MypagePageComp constructor", props);
    }

    render() {
        console.log("MypagePageComp render()", this.props);
        return (
        <div className="Calendar">
            <div className="head">
            <button><MdChevronLeft /></button>
            <span className="title">January 2021</span>
            <button><MdChevronRight /></button>
           </div>
            <div className="body">
                <div className="row">
                    <div className="box">
                    <span className="text">SUN</span></div>
                    <div className="box">
                    <span className="text">MON</span></div>
                    <div className="box">
                    <span className="text">TUE</span></div>
                    <div className="box">
                    <span className="text">WED</span></div>
                    <div className="box">
                    <span className="text">THU</span></div>
                    <div className="box">
                    <span className="text">FRI</span></div>
                    <div className="box">
                    <span className="text">SAT</span></div>   
                </div>
                <div className="row">
                    <div className="box grayed">
                    <span className="text">27</span></div>
                    <div className="box grayed">
                    <span className="text">28</span></div>
                    <div className="box grayed">
                    <span className="text">29</span></div>
                    <div className="box selected">
                    <span className="text">30</span></div>
                    <div className="box">
                    <span className="text">31</span></div>
                    <div className="box">
                    <span className="text">1</span></div>
                    <div className="box">
                    <span className="text">2</span></div>
                </div>
            </div>
        </div>      
        );
    }

}

export default MypagePageComp;
