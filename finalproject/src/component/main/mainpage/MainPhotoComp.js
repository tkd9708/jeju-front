import React, {Component} from 'react';
import jeju1 from "../../../image/jeju1.jpg";
import jeju2 from "../../../image/jeju2.jpg";
import jeju3 from "../../../image/jeju3.jpeg";
import udo1 from "../../../image/udo1.jpg";
import gsap from "gsap";
import WaveBorder from "./WaveBorder";
import { createMuiTheme, MuiThemeProvider, WithStyles } from "@material-ui/core";
import { ThemeProvider } from 'styled-components';
import theme from "./theme";
import PropTypes from "prop-types";
import styledComponents from "styled-components";

class MainPhotoComp extends Component {
    
    constructor(props) {
        super(props);


    }

    setImageScroll = () => {
        gsap.to("")
    }

    render() {
        return (
            <>
                <div className="mainPhotoComp">
                    <img className="mainPhotoComp_img1" src={jeju1}/>
                    <img className="mainPhotoComp_img2" src={jeju2}/>
                    <img className="mainPhotoComp_img3" style={{width:"1920px"}} src={jeju3}/>
                    <img className="mainPhotoComp_img4" src={udo1}/>
                </div>
                <MuiThemeProvider theme={theme}>
                    <WaveBorder 
                        upperColor="#FFFFFF"
                        lowerColor={theme.palette.common.darkBlack}
                        animationNegativeDelay={4}
                    />
                </MuiThemeProvider>
            </>
        );
    }
}

export default MainPhotoComp
