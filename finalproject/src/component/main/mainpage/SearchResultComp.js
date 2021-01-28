import React from "react";
import store from "../../../redux/store";
import {actionType, mainViewType, URL} from "../../../redux/config";

export default function SearchResultComp(props) {
    console.log("SearchResultComp props", props);
    var mainSearch = store.getState().mainSearch;
    console.log(mainSearch);
    var category = mainSearch.category;
    var searchVal = mainSearch.searchVal;
    var searchResultDataList = mainSearch.searchResultDataList;
    // console.log(searchResultDataList)

    const getSearchResultDataList = ()=>{
        return searchResultDataList.map((value, index)=>{
           return(
               <div>
                   {index} , {value.title}<br/>
               </div>
           )
        });
    }
    return (
        <div>
            [{category}] {searchVal} 로 검색한 결과.<br/>
            {getSearchResultDataList()}
        </div>
    );
}
