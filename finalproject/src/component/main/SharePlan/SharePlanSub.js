import React, {Component} from "react";


class SharePlanSub extends Component {

    constructor(props) {
        super(props);
        //console.log("SharePlanRoot constructor", props);

        
        
    }

    // onGroup=()=>{
    //     let url=URL+"/plan/group?memId="+store.getState().loginId + "&wishday="+this.refs.wishday.value;
    //     axios.get(url)
    //     .then(res=>{
    //         this.setState({
    //             list:res.data
    //         });
    //     }).catch(err=>{
    //         console.log("목록 오류:"+err);
    //       })
    // }



    render(){
        // const {row}=this.props;
        // const {glist}=this.props;
        // const day=this.props.day;
        // var wishday=row.wishday;
        // var title=row.title;
        // const {groupNum}=this.props.groupNum;
        return(
            <div>
                {this.props.row.wishday===this.props.day?this.props.row.title:this.props.row.title}
            </div>
        )
    }

}

export default SharePlanSub;
