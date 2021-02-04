import React, {Component} from "react";
import ShipNoticeB from "./ShipNoticeB";
import ShipFareTableB from "./ShipFareTableB";

class ShipTableB1 extends Component {
    constructor(props) {
        super(props);
        console.log("ShipPageComp constructor", props);
    }
    render() {
        return (
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <td>회수</td>
                            <td>우도발</td>
                            <td>종달발</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>&nbsp;&nbsp;-</td>
                            <td>09:00</td>
                        </tr>                         
                        <tr>
                            <td>2</td>
                            <td>10:30</td>
                            <td>11:30</td>
                        </tr>                         
                        <tr>
                            <td>3</td>
                            <td>12:30</td>
                            <td>13:30</td>
                        </tr>                         
                        <tr>
                            <td>4</td>
                            <td>14:30</td>
                            <td>15:30</td>
                        </tr>                         
                        <tr>
                            <td>5</td>
                            <td>16:00</td>
                            <td>&nbsp;&nbsp;-</td>
                        </tr>                                            
                    </tbody>
                </table>
                <br/>
                <ShipNoticeB/>
                <br/>
                <ShipFareTableB/>
            </div>
        )
    }
}

export default ShipTableB1;