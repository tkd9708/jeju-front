import React, {Component} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BoardSample from "./BoardSample";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

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
    pagesRoot: {
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

export default function EtcBoardComp() {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        console.log(event, newValue);
        setValue(newValue);
    };

    /**
     * Notice | ShareRestaurant | ShareMyPlan
     */
    return (
        <div className="etcBoardComp">
            <Paper square>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Notice" {...a11yProps(0)} />
                    <Tab label="Share Restaurant" {...a11yProps(1)} />
                    <Tab label="Share MyPlan" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div className={classes.pagesRoot}>
                        <Paper elevation={3}>
                        </Paper>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                </TabPanel>
                <TabPanel value={value} index={2}>
                </TabPanel>
            </Paper>
        </div>
    );
}
