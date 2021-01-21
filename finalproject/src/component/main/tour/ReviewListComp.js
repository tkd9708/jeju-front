import React,{Component} from 'react';
import axios from 'axios';
import ReviewItemComp from './ReviewItemComp';
import PageComp from "./PageComp";

class ReviewList extends Component {

    state={
        reviewList: [],
        pageNum : '0'
    }

    constructor(props){
        super(props);

        this.currentPage=1;
        this.totalCount=0;
        this.perPage = 3; // 한페이지당 보여질 글의 갯수
        this.perBlock = 5; // 한블럭당 출력할 페이지의 갯수
        this.totalPage=0; // 총 페이지의 갯수
        this.startPage=0; // 각 블럭당 시작 페이지 번호
        this.endPage=0; // 각 블럭당 끝페이지 번호
        this.start=0; // 각 블럭당 불러올 글의 시작번호
        this.end=0; // 각 블럭당 글의 끝번호
        this.no=0; // 각 페이지에서 출력할 시작번호
    }

    getList=()=>{
        // 나머지가 있을 경우에는 1페이지 더 추가 (예 : 총글수가 9이고 한페이지당 2개씩 볼 경우)
        this.totalPage = Math.floor(this.totalCount/this.perPage) + (this.totalCount % this.perPage > 0 ? 1 : 0);
        
        // 시작페이지와 끝페이지 구하기
        this.startPage = Math.floor((this.currentPage - 1) / this.perBlock) * this.perBlock + 1;
        this.endPage = this.startPage + this.perBlock - 1;
        // 마지막 블럭은 endPage를 totalPage로 해놔야 한다.
        if(this.endPage > this.totalPage)
            this.endPage = this.totalPage;
        
        // mysql은 첫 글이 0번이므로 +1 안해도됨 (오라클은 1번)
        this.start = (this.currentPage-1) * this.perPage;
        
        this.no = this.totalCount-(this.currentPage - 1) * this.perPage;

        const url = "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/sreview/list?start=" + this.start 
            + "&perPage=" + this.perPage + "&contentsid=CONT_000000000500027";

        axios.get(url)
            .then(res=>{
                this.setState({
                    reviewList : res.data
                })
            }).catch(err=>{
                console.log("Tour ReviewList 오류 : " + err);
            })
    }

    getTotalCount=()=>{
        let url = "http://ec2-3-36-28-35.ap-northeast-2.compute.amazonaws.com:8080/FinalProjectSpringBoot/sreview/count?contentsid=CONT_000000000500027";

        axios.get(url)
            .then(res=>{
                this.totalCount = res.data;
                this.getList();
            }).catch(err=>{
                console.log("ReviewListComp getTotalCount 오류 : " + err);
            })
    }

    paginate = (num) => {
        
        this.currentPage = num;
        this.getList();
    }

    componentWillMount(){
        this.getTotalCount();
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

                {/* 페이징 */}
                <PageComp area={this.state.area} startPage={this.startPage} endPage={this.endPage} currentPage={this.currentPage} 
                    totalPage={this.totalPage} paginate={this.paginate.bind(this)}></PageComp>
            </div>
        );
    }
}

export default ReviewList;