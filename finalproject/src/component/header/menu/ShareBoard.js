import React, { Component } from 'react';

class ShareBoard extends Component{
  constructor(props){
    super(props);
    this.props.setMainView("shareboard")
  }
  render() {
    return (
      <div>
        <b>맛집공유게시판</b>
      </div>
     
    )
  }
}

export default ShareBoard;