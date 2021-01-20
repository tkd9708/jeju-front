import React, {Component} from "react";
import store from "../../../redux/store";
import {actionType} from "../../../redux/config";

const Tour = ({match}) => {
    console.log("Tour match", match.params.name);

    store.dispatch({
        type: actionType.setSpot,
        contentsid: match.params.name
    });

    return(
        <div>
        </div>
    )
}

export default Tour;
