# 일상제주 - Front
2021.01.09 ~ 2021.02.15

## 프로젝트 소개
한 곳의 사이트에서 제주도의 관광명소와 주변 맛집을 소개하고, 회원 추천식당, 회원 일정 공유, 교통편 정보 등을 통하여 다양한 정보를 공유하고 자신만의 일정을 기록하여 여행객의 수월한 관광을 돕는 웹 사이트

## Team
* **PL** 김상희<br/>
* **Front-end** 김소연, 안현서, 양국현, 양호준<br/>
* **Back-end** 김상희, 성석우, 오상근<br/>

## Stack
* **Front-end** : React, Redux, Hooks, JavaScript, Node.js, react-router-dom, Axios, react-daum-postcode, HTML5, CSS, GSAP, Wow.js, Toast UI Editor, Material-ui, BootStrap4, mdbootstrap
* **Back-end** [Back-end 저장소](https://github.com/KkukYang/jeju-back "back")
* **Open API** : Naver Login, Google Login, Kakao map api
* **Tool** : VSCode, TortoiseGit, SourceTree

## 기능
### Main
* main home
<img src="https://user-images.githubusercontent.com/55429998/111215788-e4258a00-8616-11eb-91a9-962f04e7a9e7.png" width="800" height="300">
* 검색창을 통해서 관광지를 검색할 수 있다.<br/>
* 원하는 제주도 지역을 선택하여 날씨를 확인할 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111215914-0d461a80-8617-11eb-8d12-46cb216c5a97.png" width="800" height="300">
* 지도의 지역을 선택하면 인기 관광지 다섯개를 확인할 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111216043-41214000-8617-11eb-9b34-c65629b0b21e.png" width="800" height="300">
* 카테고리별 최신글을 확인할 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111216603-f7852500-8617-11eb-926f-338e2d08d79b.png" width="500" height="200">
<br/>

### 로그인<br/>
* 회원정보 및 프로필 사진을 입력한다. 
* react-daum-postcode를 사용하여 주소를 검색하여 입력한다.
<img src="https://user-images.githubusercontent.com/55429998/111214755-a2481400-8615-11eb-9f77-2d610fc182eb.png" width="300" height="300">
* Naver와 Google login api를 이용하여 소셜로그인을 등록한다.
<img src="https://user-images.githubusercontent.com/55429998/111214916-de7b7480-8615-11eb-8137-f0ad642b233b.png" width="300" height="100">
<br/>

### 공지사항<br/>
* Toast ui를 이용하여 smart editor를 사용하여 작성가능하다.
<img src="https://user-images.githubusercontent.com/55429998/111216919-55197180-8618-11eb-8c2f-218fa1f76c99.png" width="500" height="300">
<br/>

### 지역별 관광지 <br/>
* 지역별 해당 관광지를 원하는 카테고리순으로 볼 수 있다.
* <img src="https://user-images.githubusercontent.com/55429998/111217117-8b56f100-8618-11eb-901c-dac75bc6e977.png" width="800" height="300">
<br/>

### 관광지 상세 <br/>
* 상세 정보, 일정 추가
<img src="https://user-images.githubusercontent.com/55429998/111217242-b80b0880-8618-11eb-91a7-51d2e24e3d3e.png" width="200" height="100">
* 도착지를 해당 관광지로 입력하여 검색가능하다.
<img src="https://user-images.githubusercontent.com/55429998/111217398-dec93f00-8618-11eb-8d67-7ab8890dfcba.png" width="400" height="200">
* 관광지 주변 음식점, 카페, 숙소를 검색하여 일정추가할 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111217563-091afc80-8619-11eb-83ad-9a5971276223.png" width="600" height="300">
* 관광지 후기를 남길 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111217665-28198e80-8619-11eb-8dd9-bc838751798c.png" width="600" height="250">
<br/>

### 항공 일정<br/>
* 정보를 입력하면 네이버 항공 검색으로 연동된다.<br/>
* 항공 일정을 추가한다.
<img src="https://user-images.githubusercontent.com/55429998/111218096-a4ac6d00-8619-11eb-9bbc-189c749d83d9.png" width="600" height="200">
<br/>

### 렌트카 일정<br/>
* 렌트카 홈페이지를 연결해서 확인할 수 있다.<br/>
* 렌트카 일정을 추가한다.
<img src="https://user-images.githubusercontent.com/55429998/111218378-fb19ab80-8619-11eb-971c-b4fe6d3f5564.png" width="600" height="200">
<br/>

### 우도행 일정 <br/>
* 배편 정보를 추가하면 요금, 시간표 정보를 확인할 수 있다.<br/>
* 우도행 배편 일정을 추가한다.
* <img src="https://user-images.githubusercontent.com/55429998/111218877-af1b3680-861a-11eb-90eb-8a7dc58f4b3f.png" width="600" height="200">
<br/>

### 맛집 공유 페이지<br/>
* 회원들이 맛집을 공유할 수 있는 공간이다.
<img src="https://user-images.githubusercontent.com/55429998/111218982-d5d96d00-861a-11eb-9426-bac9f6e0e7dc.png" width="800" height="300">
* 답글형 리뷰를 남길 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111219175-0e794680-861b-11eb-94d5-978c6dea2847.png" width="300" height="300">
<br/>

### 일정 공유 페이지<br/>
* 동행을 구하고 싶은 회원들은 일정을 공유할 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111219430-5b5d1d00-861b-11eb-88ac-2f41433d8030.png" width="600" height="200">
* 아이디를 선택하면 채팅방으로 연결하여 대화를 나눌 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111219525-7e87cc80-861b-11eb-98db-0dcd4793f374.png" width="600" height="200">
<img src="https://user-images.githubusercontent.com/55429998/111219706-b2fb8880-861b-11eb-8188-fc5ce6ff09f2.png" width="200" height="400">
<br/>

## 코스 추천 페이지<br/>
* 원하는 코스를 일정 추가하면 코스 전체를 일정에 넣을 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111219935-e807db00-861b-11eb-8677-7c906ffadf23.png" width="800" height="300">

## 마이페이지 <br/>
* 회원 정보 및 추가 일정을 확인할 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111220058-0c63b780-861c-11eb-9dcc-cb89285f9106.png" width="800" height="300">
* 추가한 일정들을 한 눈에 확인할 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111220137-256c6880-861c-11eb-833e-56e5588b3ad4.png" width="800" height="300">
* 원하는 일정을 공유한다.
<img src="https://user-images.githubusercontent.com/55429998/111220239-459c2780-861c-11eb-9406-2128ea257570.png" width="200" height="300">
* 가계부를 관리할 수 있다.
<img src="https://user-images.githubusercontent.com/55429998/111220357-69f80400-861c-11eb-8c53-0dbdf7b9ae99.png" width="800" height="300">
