import React, {Component} from "react";

class ShipNoticeA extends Component {
    constructor(props) {
        super(props);
        console.log("ShipPageComp constructor", props);
    }
    render() {
        return (
            <div>
                대체로 추가운항되며 그 시간은 시간표를 기준으로<br/>
                10~30분 간격으로 운항됨.
                <b>특히 태풍, 풍랑주의보, 안개 등 기상악화시 운항이 중단됩니다</b>
            </div>
        )
    }
}

export default ShipNoticeA;