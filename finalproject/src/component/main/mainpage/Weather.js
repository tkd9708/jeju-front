import React, {Component} from 'react';
import axios from 'axios';

class Weather extends Component {

    getWeatherList = () => {

        let url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getCityTourClmIdx';
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML');
        let today = new Date();

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜
        let day = today.getDay(); // 요일

        let hours = today.getHours(); // 시
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hours = hours < 10 ? '0' + hours : hours;
        // document.write(year+month+date+hours);
        queryParams += '&' + encodeURIComponent('CURRENT_DATE') + '=' + encodeURIComponent(year+month+date+hours);
        queryParams += '&' + encodeURIComponent('DAY') + '=' + encodeURIComponent('8'); // CURRENT_DATE부터 7일후 (총8일)까지의 자료 호출
        queryParams += '&' + encodeURIComponent('CITY_AREA_ID') + '=' + encodeURIComponent('5013000000'); // 시군구 아이디
        
        url = url + queryParams;

        axios.get(url)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    render(){
        this.getWeatherList();

        return (
            <div>
                <h4>Weather</h4>
            </div>
        )
    }
}

export default Weather;
