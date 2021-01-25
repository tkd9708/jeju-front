import React,{Component} from 'react';
import axios from 'axios';
import MapComp from './MapComp';
import ReviewListComp from './ReviewListComp';
import {URL} from '../../../redux/config';
import detailTitle from '../../../image/detailTitle.jpg';

class DetailTourComp extends Component {

    constructor({match}, props) {
        super(props);

        this.state = {
            spotdata:[],
            contentsid: match.params.name
        }

    }

    // componentDidUpdate() {
    //     window.scrollTo(0,0);
    // }

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
                {/* <h4>DetailTourComp {this.state.contentsid} / {this.state.spotdata.longitude}</h4> */}
                {/* <img src={detailTitle} alt="이미지 없음" style={{width: '100%'}}/> */}
                {/* <h4>{this.state.spotdata.img}</h4> */}
                <img src={this.state.spotdata.img} alt="이미지 없음" style={{width: '100%'}}/>
                <br/><br/>

                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#3073BD'}}>
                        &nbsp;&nbsp;주변 정보&nbsp;&nbsp;
                    </span>
                </div>
                <br/>
                
                {/* 카카오 지도 */}
                <MapComp longitude={this.state.spotdata.longitude} latitude={this.state.spotdata.latitude}
                    title={this.state.spotdata.title}/>
                <br/><br/>

                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#3073BD'}}>
                        &nbsp;&nbsp;&nbsp;후기&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
                <br/>
                {/* 후기 */}
                <ReviewListComp contentsid={this.state.contentsid}/>
            </div>
        );
    }
}

export default DetailTourComp;