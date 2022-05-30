import axios from "axios";
import {useState } from "react";
import React from 'react';
function Singleuser({ items,index,getUid,SingleUserClick}){
  
 
   const id=items.id;
   const status=items.isSelected;
   console.log("sts"+status);
  

  return (
    <div>
       
      <div className="eachuser">
        <div ></div>
        <div className={items.isSelected ? "selectedredcircle" : "redcircle"} onClick={()=>{getUid(id,index,items.isSelected); }}>
          <div className="userlabel">
            <>
              <label>{items.txtUserName}</label>
            </>
          </div>
        </div>
      </div>
     
    </div>
  );
}
export default Singleuser;