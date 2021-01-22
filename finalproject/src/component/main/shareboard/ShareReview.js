import React, { Component,useState } from 'react';
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

    }

    render() {
        return (
            <div>
               {
                    this.state.listData.map((row,idx)=>(
                        <ReviewItem row={row} key={idx} list={this.list.bind(this)}
                            history={this.props.history}/>
                    ))
                 }
            </div>
        )
    }
}

export default ShareReview;