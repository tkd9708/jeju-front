import React, { Component,useState } from 'react';
import axios from "axios";
import {URL} from '../../../redux/config';
import ReviewItem from './ReviewItem';

class ShareReview extends Component {
    constructor(props){
        super(props);

        this.state={
            listData:[]
        }
        this.regroup = this.props.regroup;
    }

     getList=()=>{
        let url = URL + "/share/list";

        axios.get(url)
        .then(res=>{
            this.setState({
                listData: res.data
            })
          })

     }

    render() {
        return (
            <div>
               {
                    this.state.listData.map((row,idx)=>(
                        <ReviewItem row={row} key={idx} list={this.getList.bind(this)}
                            history={this.props.history}/>
                    ))
                 }
            </div>
        )
    }
}

export default ShareReview;