import React, {Component} from "react";
import {NavLink, Route} from "react-router-dom";
import store from "../../../redux/store";
import {actionType, mainViewType} from "../../../redux/config";
import TourList from '../../header/menus/TourList';
import TourPageComp from '../tour/TourPageComp';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BoardSample from "./BoardSample";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HotPlaceComp() {
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        console.log(event, newValue);
        setValue(newValue);
    };

    const setMainView = (mainView) => {
        console.log("HotPlaceComp setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            mainView: mainView
        });
    }

    return (
        <div className="hotPlaceComp">
            <Paper square>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Jeju" {...a11yProps(0)} />
                    <Tab label="Jocheon" {...a11yProps(1)} />
                    <Tab label="Gujwa" {...a11yProps(2)} />
                    <Tab label="Sungsan" {...a11yProps(3)} />
                    <Tab label="Pyoseon" {...a11yProps(4)} />
                    <Tab label="Namwon" {...a11yProps(5)} />
                    <Tab label="Seogwipo" {...a11yProps(6)} />
                    <Tab label="Andeok" {...a11yProps(7)} />
                    <Tab label="Daejung" {...a11yProps(8)} />
                    <Tab label="Hangyeong" {...a11yProps(9)} />
                    <Tab label="Hanrim" {...a11yProps(10)} />
                    <Tab label="Aewol" {...a11yProps(11)} />
                    <Tab label="Udo" {...a11yProps(12)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <BoardSample/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                </TabPanel>
                <TabPanel value={value} index={2}>
                </TabPanel>
                <TabPanel value={value} index={3}>
                </TabPanel>
                <TabPanel value={value} index={4}>
                </TabPanel>
                <TabPanel value={value} index={5}>
                </TabPanel>
                <TabPanel value={value} index={6}>
                </TabPanel>
                <TabPanel value={value} index={7}>
                </TabPanel>
                <TabPanel value={value} index={8}>
                </TabPanel>
                <TabPanel value={value} index={9}>
                </TabPanel>
                <TabPanel value={value} index={10}>
                </TabPanel>
                <TabPanel value={value} index={11}>
                </TabPanel>
                <TabPanel value={value} index={12}>
                </TabPanel>
            </Paper>
        </div>
    )
}


/*
<a href="/tourlist/jeju">제주</a>
<a href="/TourList/jocheon">조천</a>
<a href="/TourList/gujwa">구좌</a>
<a href="/TourList/sungsan">성산</a>
<a href="/TourList/pyoseon">표선</a>

<a href="/TourList/namwon">남원</a>
<a href="/TourList/seogwipo">서귀포</a><br/>
<a href="/TourList/andeok">안덕</a>
<a href="/TourList/daejung">대정</a>
<a href="/TourList/hangyeong">한경</a>

<a href="/TourList/hanrim">한림</a>
<a href="/TourList/aewol">애월</a>
<a href="/TourList/udo">우도</a><br/><br/>
*/


/*
<NavLink exact to="/tourlist/jeju"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>제주</NavLink>
<NavLink exact to="/tourlist/jocheon"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>조천</NavLink>
<NavLink exact to="/tourlist/gujwa"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>구좌</NavLink>
<NavLink exact to="/tourlist/sungsan"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>성산</NavLink>
<NavLink exact to="/tourlist/pyoseon"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>표선</NavLink>
<NavLink exact to="/tourlist/namwon"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>남원</NavLink>
<NavLink exact to="/tourlist/seogwipo"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>서귀포</NavLink>
<br/>
<NavLink exact to="/tourlist/andeok"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>안덕</NavLink>
<NavLink exact to="/tourlist/daejung"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>대정</NavLink>
<NavLink exact to="/tourlist/hangyeong"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>한경</NavLink>
<NavLink exact to="/tourlist/hanrim"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>한림</NavLink>
<NavLink exact to="/tourlist/aewol"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>애월</NavLink>
<NavLink exact to="/tourlist/udo"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>우도</NavLink>
*/

// <Route path="/TourList/:name?" component={TourList}></Route>
