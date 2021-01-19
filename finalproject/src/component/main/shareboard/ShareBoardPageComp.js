import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import ShareBoardFormComp from "./ShareBoardFormComp";
import ShareBoardRowItem from "./ShareBoardRowItem";
import axios from "axios";



class ShareBoardPageComp extends Component {
    
    
    state={
    listData:[]
    }

    
    constructor(props) {
        super(props);
        console.log("ShareBoardPageComp constructor", props);

 
       
    }


    list=()=>{
        let url="http://192.168.0.220:9002/share/list?start=0&perPage=3";
        
        console.log(url);
        axios.get(url)
        .then(res=>{
            this.setState({
                listData:res.data
            })
        })
    }

    componentWillMount()
    {
       this.list();
    }


    render() {
        console.log("ShareBoardPageComp render()", this.props);
        return (
            <div>
                {/* 제목 */}
                <div>
                    <b>맛집 공유게시판</b>
                </div>

                {/*/!* 공유버튼 *!/*/}
                <div>
                    <Link to="./ShareBoard/ShareBoardFormComp">
                        <button type="button">맛집공유</button>
                    </Link>

                    <Route exact path="/ShareBoard/ShareBoardFormComp" component={ShareBoardFormComp}/>
                </div>

                {/* 게시판 폼 */}
                <div>
                    <div>
                    {
                                this.state.listData.map((row,idx)=>(
                                    <ShareBoardRowItem row={row} key={row} 
                                     history={this.props.history}/>
                                ))
                            }

                    </div>
                </div>


                {/* 검색창 */}
                <div>
                    <input type="text" placeholder="검색할 단어를 입력하세요."/>
                    <button type="button">검색</button>
                </div>
            </div>
        )
    }

}

export default ShareBoardPageComp;
