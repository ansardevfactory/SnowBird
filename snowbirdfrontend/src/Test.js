import { isClickableInput } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import "./stylenew.css";

function Test() {
  const [array, setArray] = useState([
    { id: 2, Name: "Archana", Subject: ["English", "Hindi", "Maths"] },
    { id: 3, Name: "Alaka", Subject: ["English", "Hindi", "Maths"] },
    { id: 5, Name: "Aditya", Subject: ["English", "Hindi", "Maths"] },
    { id: 6, Name: "Aromal", Subject: ["English", "Hindi", "Maths"] },
  ]);
  

  for (const element of array) {
    element.isClicked = true;
  }
 
  const handleClick = (e,index) => {

    console.log(index)
    e.preventDefault();
    let temp=[...array];
    temp[index].isClicked=temp[index].isClicked?false:true;
    console.log(JSON.stringify(temp[index].isClicked))
    setArray(temp)
}

  return (
    <>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
      {array.map((item, index) => {
        return (
          <>
            <tr onClick={(e) => handleClick(e, index)}>
              <td>{item.id}</td>
              <td>{item.Name}</td>
            </tr>
            {item.Subject.map((citem, cindex) => {
              return (
                
                  <tr className={item.isClicked ? "display" : "displaynone"}>
                    <td>{citem}</td>
                  </tr>
                
              );
            })}
          </>
        );
      })}
    </>
  );
}

export default Test;
