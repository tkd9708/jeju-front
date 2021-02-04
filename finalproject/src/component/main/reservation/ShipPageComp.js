import React, {Component} from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ShipTableA1 from "./ShipTable/ShipTableA1";
import ShipTableA2 from "./ShipTable/ShipTableA2";
import ShipTableA3 from "./ShipTable/ShipTableA3";
import ShipTableA4 from "./ShipTable/ShipTableA4";
import ShipTableB1 from "./ShipTable/ShipTableB1";
import ShipTableB2 from "./ShipTable/ShipTableB2";

class ShipPageComp extends Component {
    constructor(props) {
        super(props);
        console.log("ShipPageComp constructor", props);

        this.state = {
            value: 0,
            month:'',
        }
    }

    tabProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleTabChange = (event,newValue) => {
        this.setState({ value: newValue });
    }

    changeMonth = (e) => {
        console.log("changeMonth 함수");
        this.setState({
            month: e.target.value
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    render() {
        const tag1 = this.state.month==1?<ShipTableA1/>:this.state.month==2?<ShipTableA2/>:
                    this.state.month==3?<ShipTableA3/>:this.state.month==4?<ShipTableA4/>:
                    <span>여행가는 달을 선택하세요</span>;
        const tag2 = this.state.month==11?<ShipTableB1/>:this.state.month==12?<ShipTableB2/>:
                    <span>여행가는 달을 선택하세요</span>;
        return (
            <div>
                <Paper square style={{marginTop: '100px'}}>
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleTabChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="성산 ↔ 우도행" {...this.tabProps(0)}/>
                        <Tab label="종달 ↔ 우도행" {...this.tabProps(1)}/>
                    </Tabs>
                    <TabPanel value={this.state.value} index={0}>
                        성산 ↔ 우도행<br/>
                        <select className="selectmonth" onClick={this.changeMonth}>
                            <option disabled selected>선택하세요</option>
                            <option value="1">1~2월, 11,12월</option>
                            <option value="2">3월, 10월</option>
                            <option value="3">4월, 9월</option>
                            <option value="4">5 ~ 8월</option>
                        </select>
                        <br/>{tag1}
                        
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        종달 ↔ 우도행<br/>
                        <select className="selectmonth" onClick={this.changeMonth}>
                            <option disabled selected>선택하세요</option>
                            <option value="11">1~3월, 10~12월</option>
                            <option value="12">4월 ~ 9월</option>
                        </select>
                        <br/>{tag2}
                    </TabPanel>
                </Paper>
            </div>
        )
    }
}
class TabPanel extends Component {
    render() {
      return (
        <Typography component="div" hidden={this.props.value !== this.props.index}>
          <Box p={2}>{this.props.children}</Box>
        </Typography>
      );
    }
  }
export default ShipPageComp;
