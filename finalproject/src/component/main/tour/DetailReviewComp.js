import React,{Component} from 'react';
import axios from 'axios';
import {URL} from '../../../redux/config';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

class DetailReviewComp extends Component {

    constructor(props){
        super(props);

        this.state={
            content:''
        }

        this.contentsid = this.props.contentsid;

    }

    changeHandler=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    insertReview=()=>{
        let memNum = 'sanghee'; // 나중에 로그인상태의 아이디 집어넣기
        let star = 5;
        let content = this.state.content;
        let contentsid = this.contentsid;

        //let url = "http://localhost:9002/sreview/insert";
        let url = URL + "/sreview/insert";

        axios.post(url, {contentsid, memNum, star, content})
            .then(res=>{
                this.setState({
                    content : ""
                })
                //window.location.reload();
                this.props.getList();
            }).catch(err=>{
                console.log("DetailReviewComp insert 오류 : " + err);
            })

    }

    
      
      

    render() {

        return (
            <div>
                <Box
                        display="flex"
                        flexWrap="wrap"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                        justifyContent="center"
                        css={{ maxWidth: '100%' }}
                    >
                        <Box m={1}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating
                                    name="customized-icons"
                                    defaultValue={2}
                                    getLabelText={(value) => customIcons[value].label}
                                    IconContainerComponent={IconContainer}
                                    />
                            </Box>    
                            사진 선택
                        </Box>
                        <Box m={1}>
                            <textarea name="content" id="srContent" style={{width:'600px', height: '150px', resize: 'none'}} value={this.state.content} 
                                    className="form-control" onChange={this.changeHandler.bind(this)}></textarea>
                        </Box>
                        <Box m={1}>
                            <button type="button" className="btn btn-warning" id="btnInsertReview" style={{height:'150px', width: '100px'}}
                                    onClick={this.insertReview.bind(this)}><b>작&nbsp;성</b></button>
                        </Box>
                </Box>
                                   
                
            </div>
        );
    }
}

export default DetailReviewComp;