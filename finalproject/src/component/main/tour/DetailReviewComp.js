import React,{Component} from 'react';
import ReviewListComp from './ReviewListComp';

class DetailReviewComp extends Component {

    render() {

        return (
            <div>
                <table style={{width: '80%'}}>
				    <thead>
                        <tr>
                            <td style={{width: '70%'}}>
                                {/* </td><input type="hidden" name="star" id="spotReviewStar" value="0"> */}
                                <textarea name="content" id="srContent" style={{height: '150px', resize: 'none'}} className="form-control"></textarea>
                    
                            </td>
                            <td style={{width: '10%', paddingLeft: '10px'}}>
                                <button type="button" className="btn btn-warning" id="btnInsertReview" style={{height:'150px', width: '100%'}}><b>작&nbsp;성</b></button>
                            </td>
                        </tr>
                    </thead>
			    </table>
                <br/><br/>
                <ReviewListComp/>
            </div>
        );
    }
}

export default DetailReviewComp;