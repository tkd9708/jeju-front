import React, { Component,useState } from 'react';

class ReviewItem extends Component {
    
    render() {
        const {row}=this.props;
        return (
            <div>
               <div>
                <div style={{float:'left'}}>{row.photo}</div>
                <div>{row.regroup}</div>
                <div style={{float:'right'}}><button type="button" onClick="">+</button></div>
              </div>
            </div>
        )
    }
}

export default ReviewItem;