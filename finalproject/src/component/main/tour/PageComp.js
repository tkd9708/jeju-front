import React,{Component} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './TourCss.css';
import store from "../../../redux/store";
import {actionType} from "../../../redux/config";

class PageComp extends Component {

    // handleChange=(e, value)=>{
    //     this.props.paginate(value);
    // }

    setPageNum = (pageNum) => {
        store.dispatch({
            type: actionType.tourPage,
            pageNum: pageNum
        });
    }

    render() {
        const{startPage, endPage, currentPage, totalPage, paginate} = this.props;

        let prev = startPage>1?<li className="page-item"><a className="page-link" style={{color: 'black'}} onClick={(e)=>{
            e.preventDefault();
            this.setPageNum(startPage-1);
            this.props.paginate(startPage - 1);
        }}>◀</a></li>:"";

        let next = endPage < totalPage?<li className="page-item"><a className="page-link" style={{color: 'black'}} onClick={(e)=>{
            e.preventDefault();
            this.setPageNum(endPage + 1);
            this.props.paginate(endPage + 1);
        }}>▶</a></li>:"";

        let page = [];
        for(let i=startPage; i<=endPage; i++){
            page.push(i);
        }
        let pages = page.map(function(num,idx){
            return <li className="page-item"><a className="page-link" style={{color : num==currentPage?"#D1CC38":"black", fontWeight: num==currentPage?"700":""}} 
            onClick={(e)=>{
                e.preventDefault();
                store.dispatch({
                    type: actionType.tourPage,
                    pageNum: num
                });
                paginate(num);
            }}>{num}</a></li>
        });

        let pagination='';
        if (matchMedia("screen and (max-width:770px)").matches) {
            pagination = <ul className='pagination pagination-sm' style={{justifyContent: 'center', marginBottom: '100px'}}>
                            {prev}
                            {pages}
                            {next}
                        </ul>;
          } else {
            pagination = <ul className='pagination' style={{justifyContent: 'center', marginBottom: '100px'}}>
                            {prev}
                            {pages}
                            {next}
                        </ul>;
          }

        return (
            <div>
                {pagination}
                {/* <ul className='pagination' style={{justifyContent: 'center', marginBottom: '100px'}}>
                    {prev}
                    {pages}
                    {next}
			    </ul> */}
                {/* <Pagination id="tourListPage" color="primary" count={totalPage} page={currentPage} onChange={this.handleChange.bind(this)}/> */}
            </div>
        );
    }
}

export default PageComp;