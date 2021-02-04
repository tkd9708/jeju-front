import React, {Component} from "react";

class ShipNoticeB extends Component {
    constructor(props) {
        super(props);
        console.log("ShipPageComp constructor", props);
    }
    render() {
        return (
            <div>
                조석(간만) 및 기상상태, 물양장 사정 등으로 인하여<br/>
                시간변경, 입출항포구변경 등 단축운항이 될 수 있사오니<br/>
                양지하시기 바랍니다<br/>
                <b>특히 태풍, 풍랑주의보, 안개 등 기상악화시 운항이 중단됩니다</b>
            </div>
        )
    }
}

export default ShipNoticeB;