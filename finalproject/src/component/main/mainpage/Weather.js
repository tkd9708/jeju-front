import React, {Component} from 'react';
import axios from 'axios';
import store from "../../../redux/store";
import { URL, actionType } from "../../../redux/config";

class Weather extends Component {

    constructor(props) {
        super(props);
        console.log("Weather class 생성자", props);

        store.subscribe(function() {
            console.log("날씨 클래스 생성자에서 state 변경에 대한 변화를 구독합니다 변화를 확인했습니다 store에서 weatherInfo 값을 가져와 보여줍니다 : " + store.getState().weatherInfo[0].courseAreaName);
        }.bind(this));
    }

    getWeatherList = () => {
        /*
        let url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
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
        let callHour = String(24 * 8); // 8일
        queryParams += '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent(callHour); // CURRENT_DATE부터 8일 후까지의 자료 호출
        queryParams += '&' + encodeURIComponent('COURSE_ID') + '=' + encodeURIComponent('1'); // 관광 코스ID

        url = url + queryParams;

        axios.get(url)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        */

        var url = 'http://apis.data.go.kr/1360000/TourStnInfoService/getTourStnVilageFcst';
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ijFCZNWcCKbWGchBc5vZ%2F%2FXIG5vnZeeOgt1m23u3U0BXhc8dVvq%2BdymzHUQDmarDgb0XcV%2BV7gmzgn9T3JSsZQ%3D%3D';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('json');
        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth(); // 월
        let date = today.getDate(); // 날짜

        let hours = today.getHours(); // 시
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hours = hours < 10 ? '0' + hours : hours;
        queryParams += '&' + encodeURIComponent('CURRENT_DATE') + '=' + encodeURIComponent(year+month+date+hours);
        let callHour = String(24 * 8); // 8일
        queryParams += '&' + encodeURIComponent('HOUR') + '=' + encodeURIComponent(callHour); // CURRENT_DATE부터 8일 후까지의 자료 호출
        queryParams += '&' + encodeURIComponent('COURSE_ID') + '=' + encodeURIComponent('1'); // 관광 코스ID
        console.log("/getTourStnVilageFcst" + queryParams);

        // 아래 url이 중간부터 있는 이유는 package.json 에
        // "proxy": "http://apis.data.go.kr/1360000/TourStnInfoService",
        // 저것을 미리 세팅해두었기 때문입니다.
        axios.get("/getTourStnVilageFcst" + queryParams)
            .then(res => {
                console.log("기상청 리턴값 res:", res);
                store.dispatch({
                    type: actionType.weatherUpdate,
                    weatherInfo: res.data,
                });
            })
            .catch(err => {
                console.log("기상청 리턴값 err:", err);
            });
    }


    render() {
        this.getWeatherList();
        return (
            <div>
                <h4>Weather</h4>
            </div>
        )
    }
}

export default Weather;
