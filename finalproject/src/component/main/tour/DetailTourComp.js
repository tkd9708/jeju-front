import React,{Component} from 'react';
import axios from 'axios';
import MapComp from './MapComp';
import ReviewListComp from './ReviewListComp';
import {URL} from '../../../redux/config';

class DetailTourComp extends Component {

    

    constructor({match}, props) {
        super(props);

        this.state = {
            spotdata:[],
            contentsid: match.params.name
        }

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