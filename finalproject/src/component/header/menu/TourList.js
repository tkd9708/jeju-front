import React from 'react';
import {Link} from "react-router-dom";

import "../MyStyle.css";

const TourList=()=>{
    const activeStyle={
      
        

    }
    return (
  
       <div>       
           <ul className="menu"> 
               <li>
                    <Link to="/Reservation">예약</Link> 
               </li>
               <li>
                    <Link to="/Notice">공지사항</Link>
               </li>
               <li>
                    <Link to="/Tour">관광명소</Link> 
               </li>
               <li>
                    <Link to="/ShareBoard">공유게시판</Link> 
               </li>
               <li>
                    <Link to="/MyPage">MyPage</Link> 
               </li>
               <li>
                    <Link to="/Login">Login</Link> 
               </li>
           </ul>
       </div>
    )
}

export default TourList;