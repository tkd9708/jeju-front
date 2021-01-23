import React,{Component} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './TourCss.css';

class PageComp extends Component {

    handleChange=(e, value)=>{
        this.props.paginate(value);
    }
    render() {
        const{currentPage, totalPage} = this.props;

        // let prev = startPage>1?<li className="page-item"><a className="page-link" onClick={(e)=>{
        //     e.preventDefault();
        //     this.props.paginate(startPage - 1);
        // }}>◀</a></li>:"";

        // let next = endPage < totalPage?<li className="page-item"><a className="page-link" onClick={(e)=>{
        //     e.preventDefault();
        //     this.props.paginate(endPage + 1);
        // }}>▶</a></li>:"";

        // let page = [];
        // for(let i=startPage; i<=endPage; i++){
        //     page.push(i);
        // }
        // let pages = page.map(function(num,idx){
        //     return <li className="page-item"><a className="page-link" style={{color : num==currentPage?"red":"black"}} onClick={(e)=>{
        //         e.preventDefault();
        //         paginate(num);
        //     }}>{num}</a></li>
        // });

        return (
            <div id="aaaa">
                {/* <ul className="pagination" style={{padding: '0 auto'}}>
                    {prev}
                    {pages}
                    {next}
			    </ul> */}
                <Pagination id="tourListPage" color="primary" count={totalPage} page={currentPage} onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

export default PageComp;