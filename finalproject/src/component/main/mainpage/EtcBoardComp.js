import React, {Component, useEffect} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BoardSample from "./BoardSample";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import NoticeItemComp from "./NoticeItemComp";
import axios from "axios";
import {URL} from "../../../redux/config";
// import ShareRestaurantItemComp from "./ShareRestaurantItemComp";
import ShareBoardRowItem from "../shareboard/ShareBoardRowItem";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paperRoot: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: "10px",
            padding: "10px",
            width: "300px",
            height: "400px",
            overflow: "hidden",
        }
    }
}));

export default function EtcBoardComp(props) {
    const classes = useStyles();
    const [selectedTabValue, setSelectedTabValue] = React.useState(1);
    const [noticeList, setNoticeList] = React.useState([]);
    const [shareRestaurant, setShareRestaurant] = React.useState([]);
    const [shareMyPlan, setShareMyPlan] = React.useState([]);

    useEffect(() => {
        if (selectedTabValue == 0) {
            getNoticeList();
        } else if (selectedTabValue == 1) {
            getShareRestaurantList();
        } else if (selectedTabValue == 2) {

        }
    }, [selectedTabValue]);

    const handleChange = (event, newValue) => {
        console.log(event, newValue);
        setSelectedTabValue(newValue);
    };

    const getNoticeList = () => {
        let url = URL + "/notice/list?start=0&perPage=10";
        console.log(url);

        axios.get(url
        ).then(res => {
            console.log(res);
            setNoticeList(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getShareRestaurantList = () => {
        let url = URL + "/share/list?start=0&perPage=10";
        console.log(url);

        axios.get(url
        ).then(res => {
            console.log(res);
            setShareRestaurant(res.data);
        }).catch(err => {
            console.log(err);
        })
    }


    /**
     * Notice | ShareRestaurant | ShareMyPlan
     */
    return (
        <div className="etcBoardComp">
            <Tabs value={selectedTabValue} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Notice" {...a11yProps(0)} />
                <Tab label="Share Restaurant" {...a11yProps(1)} />
                {/* <Tab label="Share MyPlan" {...a11yProps(2)} /> */}
            </Tabs>
            <TabPanel value={selectedTabValue} index={0}>
                <div style={{
                    display: "flex",
                    overflow: "auto",
                    // flexWrap: "wrap"
                }}>
                    {
                        noticeList.map((e, i) => {
                            return (
                                <NoticeItemComp key={i} row={e}/>
                            )
                        })
                    }
                </div>
            </TabPanel>
            <TabPanel value={selectedTabValue} index={1}>
                <div style={{
                    display: "flex",
                    overflow: "auto",
                    // flexWrap: "wrap"

                }}>
                    {
                        shareRestaurant.map((e, i) => {
                            return (
                                <ShareBoardRowItem key={i} row={e}
                                                   history={props.history}
                                />
                            )
                        })
                    }
                </div>
            </TabPanel>
            <TabPanel value={selectedTabValue} index={2}>
            </TabPanel>

        </div>
    );
}
