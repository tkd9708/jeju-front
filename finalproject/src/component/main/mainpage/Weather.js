import React, {Component} from 'react';

class Weather extends Component {

    getWeatherList = () => {

        let url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML');
    }
    
    render(){

        return (
            <div>
                <h4>Weather</h4>
            </div>
        )
    }
}

export default Weather;
