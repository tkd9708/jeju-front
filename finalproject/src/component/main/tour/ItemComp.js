import React,{Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import store from "../../../redux/store";
import {actionType, mainViewType} from "../../../redux/config";
import Tour from "../../header/menus/Tour";

class ItemComp extends Component {

    setMainView = (mainView) => {
        console.log("DetailTour setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            mainView: mainView
        });
    }

    render() {
        const {row}=this.props;
        const url = "/Tour/" + row.contentsid; 

        return (
            <div>
                <NavLink exact to={url}
                                 onClick={() => {
                                     this.setMainView(mainViewType.Tour);
                                 }}>
                                     <img style={{width: '100px', height: '100px'}} src={row.thumbnail}></img><br/>
                                        title : {row.title}<br/>
                                        addr : {row.roadaddr}<br/>
                                 </NavLink>
                    
                <hr/>
            </div>
        );
    }
}

export default ItemComp;