import React, {Component} from 'react';
import jeju1 from "../../../image/jeju1.jpg";
import jeju2 from "../../../image/jeju2.jpg";
import udo1 from "../../../image/udo1.jpg";

class MainPhotoComp extends Component {
    render() {
        return (
            <div className="mainPhotoComp">
                <img src={jeju1}/>
                <img src={jeju2}/>
                <img src={udo1}/>
            </div>
        );
    }
}

export default MainPhotoComp
