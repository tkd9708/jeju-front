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
            aroudId:'',
            money: '',
            wishday:'',
            wishtime:'',
            num:'',
        };
    }

    render(){
        const {row}=this.props;
        const budget = row.content!=null?<td>{row.content}</td>:row.shereNum!=null?<td>{row.shereNum}</td>:
        row.spotId!=null?<td>{row.spotId}</td>:<td>{row.aroudId}</td>;
        return(
            <tr>
                    <td>{row.num}</td>
                    <td>{budget}</td>
                    <td>{row.money}</td>
                    <td>{row.wishday}&nbsp;&nbsp;&nbsp;{row.wishtime}</td>
            </tr>
        )
    }
}

export default MyBudgetItem;