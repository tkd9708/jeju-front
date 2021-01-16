import React, { Component } from "react";

class RowItem extends Component
{
    render() {
        const url="http://localhost:9002/photo/";
        return (
            <div>
                {this.props.row.num}&nbsp;{this.props.row.id}&nbsp;{this.props.row.email}&nbsp;{this.props.row.name}&nbsp;
                <img alt="" src={url+this.props.row.photo} />
                &nbsp;{this.props.row.hp}
            </div>
        )
    }
}

export default RowItem;