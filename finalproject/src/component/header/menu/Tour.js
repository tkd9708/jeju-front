import React, {Component} from "react";

<<<<<<< HEAD
const Tour=()=>{
    return (
      <div>
          <b>관광명소</b>
       
      </div>
    )
=======
class Tour extends Component{
    constructor(props) {
        super(props);
        this.props.setMainView("tour");
    }

    render() {
        return (
            <div>
                {/*<b>관광명소</b>*/}
            </div>
        )
    }
>>>>>>> d3327e8bd579dd56b71ca28ff7b537965da135dd
}

export default Tour;
