import React, {Component} from 'react';
import './MyPlanComp.css';
import axios from 'axios';
import {URL} from '../../../redux/config';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';

class MyPlanLeftItem extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            title:''
        }

        let date = new Date();
        this.today = date.getFullYear() + "-" + date.getMonth()+1 + "-" + date.getDate();
    }

    getSpotTitle = () => {
        let url = URL + "/wish/spottitle?contentsid=" + this.props.row.spotId;

        axios.get(url)
            .then(res=>{
                this.setState({
                    title: res.data
                })
            }).catch(err=>{
                console.log("myplan getSpotTitle 오류 : " + err);
            })
    }

    getShareSubject = () => {
        let url = URL + "/wish/sharesubject?num=" + this.props.row.shareNum;

        axios.get(url)
            .then(res=>{
                this.setState({
                    title: res.data
                })
            }).catch(err=>{
                console.log("myplan getShareSubject 오류 : " + err);
            })
    }

    componentWillMount(){
        if(this.props.row.spotId != null)
            this.getSpotTitle();
        else if(this.props.row.shareNum != null)
            this.getShareSubject();
    }

    render(){
        
        const {row} = this.props;
        const title = row.spotId!=null?this.state.title:row.shareNum!=null?this.state.title:row.aroundId!=null?row.aroundId:row.content;
        const icon = row.spotId!=null?"🛕":row.shareNum!=null?"👨‍🍳":row.content!=null&row.aroundId==null?"📅"
            :row.aroundId!=null&row.content.split(",")[0]=="음식점"?"🍔":row.aroundId!=null&row.content.split(",")[0]=="카페"?"☕":"🛌";

        var betweenDay = parseInt((new Date(row.wishday) - new Date(this.today))/ (24*60*60*1000));

        return (
            <div>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            {/* <ImageIcon/> */}
                            {icon}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={title} secondary={row.wishday==this.today?`예정시간 ${row.wishtime}`:`D-${betweenDay}`}/>
                </ListItem>
                <Divider variant="inset" component="li"/>
            </div>
        )
    }
}

export default MyPlanLeftItem;
