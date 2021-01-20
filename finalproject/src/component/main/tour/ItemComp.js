import React,{Component} from 'react';

class ItemComp extends Component {
    render() {
        const {row,idx,history}=this.props;

        return (
            <div>
                <div onClick={
                    ()=>{
                        history.push("/Tour/" + row.contentsid);
                    }
                }>
                    <img style={{width: '100px', height: '100px'}} src={row.thumbnail}></img><br/>
                    title : {row.title}<br/>
                    addr : {row.roadaddr}<br/>
                </div>
                <hr/>
            </div>
        );
    }
}

export default ItemComp;