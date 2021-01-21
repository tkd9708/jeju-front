import React,{Component} from 'react';
import axios from 'axios';
import ReviewItemComp from './ReviewItemComp';

class ReviewList extends Component {

    state={
        reviewList: []
    }

    getList=()=>{
        const url = "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/sreview/list?start=0&perPage=5&contentsid=CONT_000000000500027";

        axios.get(url)
            .then(res=>{
                this.setState({
                    reviewList : res.data
                })
            }).catch(err=>{
                console.log("Tour ReviewList 오류 : " + err);
            })
    }

    componentWillMount(){
        this.getList();
    }

    render() {

        return (
            <div>
                <h4>Review List </h4>
                <table className="table table-bordered" style={{width:'80%'}}>
                    <tbody>
                        {this.state.reviewList.map((row,idx)=>(
                            <ReviewItemComp row={row} key={idx} history={this.props.history}></ReviewItemComp>
                        ))} 
                    </tbody>
				</table>
            </div>
        );
    }
}

export default ReviewList;