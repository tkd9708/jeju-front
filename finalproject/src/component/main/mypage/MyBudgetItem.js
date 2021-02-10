import React,{Component} from 'react';

class MyBudgetItem extends Component
{
    constructor(props) {
        super(props);
        console.log("MyBudgetItem constructor", props);
        this.state={
            memId:'',  
            content:'',
            shereNum:'',
            spotId:'',
            aroundId:'',
            money: '',
            wishday:'',
            wishtime:'',
            num:'',
        };
    }

    render(){
        const {row}=this.props;      
        // var budget = row.aroudId!=null?row.aroudId:row.shereNum!=null?row.shereNum:
        // row.spotId!=null?row.spotId:row.content;
        var budget='';
        if(row.aroundId!=null){
            budget=row.aroundId;
        }else if(row.shereNum!=null){
            budget=row.shereNum;
        }else if(row.spotId!=null){
            budget=row.spotId;
        }else{
            budget=row.content;
        }
        return(
            <tr>
                    <td>{budget}</td>
                    <td>{row.wishday}&nbsp;&nbsp;&nbsp;{row.wishtime}</td>
                    <td>{row.money}</td>
            </tr>
        )
    }
}

export default MyBudgetItem;