body {
  margin: 0;
}
.outer {
}
.outer .firstrow {
  display: flex;
  padding: 20px;
}
.column1,
.column2 {
  width: 50%;
}
.column2 {
  text-align: right;
}
.column1 h2 {
  margin: 0;
  color: gray;
}
.column2 button {
  border: none;
  background-color: gray;
  color: white;
  padding: 10px 40px;
}
.column2 button:hover {
  background-color: rgb(39, 33, 33);
}
.secondrow {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
}
.secondrow_column1 {
  width: 49%;
}
.secondrow_column1 input {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}
.secondrow_column2 {
  width: 49%;
}
.secondrow_column2 textarea {
  width: 100%;
  box-sizing: border-box;
}
.thirdrow {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
}
.thirdrow_column1 {
  width: 49%;
}
.thirdrow_column1 input {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}
.thirdrow_column2 {
  width: 49%;
}
.thirdrow_column2 input {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}
.fourthrow {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
}
.fourthrow_column1 {
  width: 49%;
}
.fourthrow_column1 input {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}
.fourthrow_column2 {
  width: 49%;
}
.fourthrow_column2 input {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}


************************************************************************************************************************
import { useState } from "react";

function sample1(){
    const [projectarray,setprojectarray]= useState([
        { Id: 1, name: 'project1', epic: [1, 2, 3] },
        { Id: 2, name: 'project1', epic: [1, 2] },
        { Id: 3, name: 'project1', epic: [] },
        { Id: 4, name: 'project1', epic: [] },
        { Id: 5, name: 'project1', epic: [1, 2, 3, 4] },
     
])
    return(
        <>
        <tr>
        <th>Id</th>
        <th>Projectname</th>
        <td></td>
      </tr>
      {projectarray.map((item, index) => {
        return (
          <>
            <tr>
              <td>{item.Id}</td>
              <td>{item.name}</td>
              <td></td>
            </tr>
            {item.epic.map((epicitem, epicindex) => {
              return (
                <tr>
                  <td></td>
                  <td>1</td>
                  <td>epic1</td>
                </tr>
              )
            })}
          </>
        )
      })}
    </>
  )
}
export default sample1

        
