import React, {Component} from "react";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import FastfoodIcon from '@material-ui/icons/Fastfood';


class SharePlanListSub extends Component{
    constructor(props) {
        super(props);
        //console.log("SharePlanPageComp constructor", props);

        



    
    }

    render(){
        return(
            <div>
                 <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            {this.props.row.wishtime}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          
            <Typography variant="h6" component="h1">
              {this.props.row.title}
            </Typography>
            <Typography>{this.props.row.content}</Typography>
        </TimelineContent>
      </TimelineItem>
            </div>
        )
    }
}


export default SharePlanListSub;