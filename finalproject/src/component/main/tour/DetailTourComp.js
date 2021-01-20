import React,{Component} from 'react';
import store from "../../../redux/store";

class DetailTourComp extends Component {

    state = {
        contentsid: store.getState().contentsid
    }

    constructor(props) {
        super(props);

        store.subscribe(function () {
            console.log("DetailTourComp subscribe()");
            this.setState({
                contentsid: store.getState().contentsid
            });
        }.bind(this));
    }

    render() {

        return (
            <div>
                <h4>DetailTourComp {this.state.contentsid}</h4>
            </div>
        );
    }
}

export default DetailTourComp;