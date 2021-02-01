import React,{Component} from 'react';
import './style/RCA.css';
import {URL} from "../../../redux/config";
import axios from 'axios';

class ClistItem extends Component {

    constructor(props){
        super(props);

    }

    
    onDelete=()=>{
        let url=URL+"/wish/delete?num="+this.props.row.num;
        
        console.log(this.props.row.num); 
        
        // axios.get(url)
        // .then(res=>{
          
        // }).catch(err=>{
        //   console.log("삭제시 오류:"+err);
        // });
      }

    render() {
        
        const {row} = this.props;
        
        return (
            <div>
                {row.content==="spot"?<div>🗼{row.title}{row.num}<button className="delete" type="button" onClick={this.onDelete.bind(this)}>❌</button></div>:
                row.content==="myplan"?<div>🌳{row.title}{row.num}<button className="delete" type="button" onClick={this.onDelete.bind(this)}>❌</button></div>:
                row.content==="share"?<div>✔{row.title}{row.num}<button className="delete" type="button" onClick={this.onDelete.bind(this)}>❌</button></div>:
                row.content.split(",")[0]==="카페"?<div>☕{row.title}{row.num}<button  className="delete" type="button" onClick={this.onDelete.bind(this)}>❌</button></div>:
                row.content.split(",")[0]==="음식점"?<div>🍽{row.title}{row.num}<button  className="delete" type="button" onClick={this.onDelete.bind(this)}>❌</button></div>:
                row.content.split(",")[0]==="숙박"?<div>🏟{row.title}{row.num}<button  className="delete" type="button" onClick={this.onDelete.bind(this)}>❌</button></div>:''}<br/>
            </div>
        );
    }
}

export default ClistItem;