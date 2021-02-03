import React,{Component} from 'react';

class RentCarItem extends Component
{
    render(){
        const {row, num}=this.props;
        return(
            <tr>
                <td align='center'>{num+1}</td>
                <td align='center'>{row.name}</td>
                <td align='center'>{row.form}</td>
                <td align='center'>{row.address}</td>
                <td align='center'>{row.totalcar}</td>
                <td align='center'>{row.opentime}</td>
                <td align='center'>{row.closetime}</td>
                <td align='center'>{row.homepage}</td>
                <td align='center'>{row.phonedate}</td>
                <td align='center'>{row.checkdate}</td>
            </tr>
        )
    }
}

export default RentCarItem;