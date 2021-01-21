import React,{Component} from 'react';
import store from "../../../redux/store";
import axios from 'axios';
import DetailMap from './DetailMap';
import DetailReview from './DetailReview';
import Map from './Map';

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
        const url = "http://localhost:9002/spot/select?contentsid=" + this.state.contentsid;

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
                {/* <img src={this.state.spotdata.img} alt="" /> */}
                {/* <DetailMap title={this.state.spotdata.title}/> */}
                <Map longitude={this.state.spotdata.longitude} latitude={this.state.spotdata.latitude}
                    title={this.state.spotdata.title}/>
                <DetailReview/>
            </div>
        );
    }
}

export default DetailTourComp;