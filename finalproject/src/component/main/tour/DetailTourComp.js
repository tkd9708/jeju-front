import React,{Component} from 'react';
import store from "../../../redux/store";
import axios from 'axios';
import DetailReviewComp from './DetailReviewComp';
import MapComp from './MapComp';
import ReviewListComp from './ReviewListComp';
import {URL} from '../../../redux/config';

class DetailTourComp extends Component {

    state = {
        spotdata:[],
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

    getData=()=>{
        const url = URL + "/spot/select?contentsid=" + this.state.contentsid;

        axios.get(url)
            .then(res=>{
                this.setState({
                    spotdata : res.data
                })
            }).catch(err=>{
                console.log("DetailTourComp getData 오류 : " + err);
            })
    }

    componentWillMount(){
        this.getData();
    }

    render() {

        return (
            <div>
                <h4>DetailTourComp {this.state.contentsid} / {this.state.spotdata.longitude}</h4>
                <MapComp longitude={this.state.spotdata.longitude} latitude={this.state.spotdata.latitude}
                    title={this.state.spotdata.title}/>
                <br/><br/>
                {/* <DetailReviewComp contentsid={this.state.contentsid}/> */}
                <ReviewListComp contentsid={this.state.contentsid}/>
            </div>
        );
    }
}

export default DetailTourComp;