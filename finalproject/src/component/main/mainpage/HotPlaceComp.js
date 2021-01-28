import React, {Component, useState} from "react";
import {NavLink, Route} from "react-router-dom";
import store from "../../../redux/store";
import {actionType, mainViewType} from "../../../redux/config";
import TourList from '../../header/menus/TourList';
import TourPageComp from '../tour/TourPageComp';
import axios from 'axios';
import {URL} from "../../../redux/config";

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BoardSample from "./BoardSample";

function TabPanel(props) {
    const {children, value, index, ...other} = props;


    // photos, setPhotos 비구조화 할당
    let [photos, setPhotos] = useState([]);

    // 통신 메서드
    function searchApi() {
        const url = URL + '/spot/list';
        axios.get(url)
        .then(function(response) {
            setPhotos(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    }

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
    const [selectedLocation, setSelectedLocation] = React.useState("제주");

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

    const clickLocation = (e) => {
        e.preventDefault();
        // console.log(selectedLocation, e.target.dataset.location);
        setSelectedLocation(e.target.dataset.location);

    }

    return (
        <div className="hotPlaceComp">
            <div className="hotPlace_location">
                <a href="#" data-location="제주" onClick={clickLocation.bind(this)}>제주</a>
                <a href="#" data-location="조천" onClick={clickLocation.bind(this)}>조천</a>
                <a href="#" data-location="구좌" onClick={clickLocation.bind(this)}>구좌</a>
                <a href="#" data-location="성산" onClick={clickLocation.bind(this)}>성산</a>
                <a href="#" data-location="표선" onClick={clickLocation.bind(this)}>표선</a>
                <a href="#" data-location="남원" onClick={clickLocation.bind(this)}>남원</a>
                <a href="#" data-location="서귀" onClick={clickLocation.bind(this)}>서귀</a>
                <a href="#" data-location="안덕" onClick={clickLocation.bind(this)}>안덕</a>
                <a href="#" data-location="대정" onClick={clickLocation.bind(this)}>대정</a>
                <a href="#" data-location="한경" onClick={clickLocation.bind(this)}>한경</a>
                <a href="#" data-location="한림" onClick={clickLocation.bind(this)}>한림</a>
                <a href="#" data-location="애월" onClick={clickLocation.bind(this)}>애월</a>
                <a href="#" data-location="우도" onClick={clickLocation.bind(this)}>우도</a>
            </div>
            <div className="hotPlace_sample">
                <BoardSample location={selectedLocation}/>
            </div>

        </div>
    )
}


/*
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
 */


/*
<a href="/tourlist/jeju     ">제주</a>
<a href="/TourList/jocheon  ">조천</a>
<a href="/TourList/gujwa    ">구좌</a>
<a href="/TourList/sungsan  ">성산</a>
<a href="/TourList/pyoseon  ">표선</a>

<a href="/TourList/namwon   ">남원</a>
<a href="/TourList/seogwipo ">서귀</a><br/>
<a href="/TourList/andeok   ">안덕</a>
<a href="/TourList/daejung  ">대정</a>
<a href="/TourList/hangyeong">한경</a>

<a href="/TourList/hanrim   ">한림</a>
<a href="/TourList/aewol    ">애월</a>
<a href="/TourList/udo      ">우도</a><br/><br/>
*/


{/* <NavLink exact to="/tourlist/jeju"
         onClick={() => {
             console.log("TourList NavLink onClick");
             this.setMainView(mainViewType.TourList);
         }}
>제주</NavLink> */
}
{/* <NavLink exact to="/tourlist/jocheon"
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
>우도</NavLink> */
}


// <Route path="/TourList/:name?" component={TourList}></Route>
