import React,{Component} from 'react';
import './TourCss.css';
import Box from '@material-ui/core/Box';

class ItemComp extends Component {


    render() {
        const {row}=this.props;

        return (
            <Box p={1} m={1} id="itemBox" onClick={
                ()=>{
                    this.props.history.push("/tour/" + row.contentsid);
                }
            }>
                <img id="itemImg" src={row.thumbnail} alt=""></img><br/>
                        title : {row.title}<br/>
                        addr : {row.roadaddr}<br/>
                {/* <NavLink exact to={url}>
                    
                </NavLink> */}
            </Box>
        );
    }
}

export default ItemComp;