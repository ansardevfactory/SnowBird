import axios from "axios";
import { useState } from "react";
import "./style/styles.css";

function Epic() {
const[array,setArray]=useState([]);
var url="http://localhost:8000/epicfecth";
var request={};
var header={};
axios.post(url,request,header).then((res)=>{
    console.log(res.data);
    setArray(res.data);
}).catch();

  return (
    <div>
      <div className="outer">
        {/* USer name with icon */}
        <div className="firstrow">
          <div className="usericon"></div>
          <label>User</label>
        </div>
        <div className="secondrow">
          {/* Side navigation menu */}
          <div className="firstcolumn">
            <nav>
              <li>Board</li>
              <li>Projects</li>
              <li>Epics</li>
              <li>Tasks</li>
              <li>Sprints</li>
              <li>Users</li>
            </nav>
          </div>

          {/* Main outline */}
          <div className="secondcolumn">
          <div className="prowone">
              <label>Epic </label>
              <button>Create New</button>
            </div>
            <div className="tablerow">
              
              <table >
                <tr>
                <th className="withborder constant"></th>
                  <th className="withborder constant">id</th>
                  <th className="withborder">EpicName</th>
                  <th className="withborder">Status</th>
                  <th className="withborder">ProjectName</th>
                  </tr>
                    {array.map((item,index)=>{
                        return<>
                        <tr>
                        <td></td>
                        <td>{item.id}</td>
                        <td>{item.txtTitle}</td>
                        <td>{item.txtStatus}</td>
                        <td>{item.txtName}</td>
                        <td></td>
                        </tr>
                        </>
                    })}
                    <tr className="trow"> 

                    </tr>
                    <tr className="trow">
                        <td>11</td>  
                         <td>User2</td> 
                          <td>ToDo</td>  
                          <td>Ecommerce</td></tr>
               
              </table>
              
            </div>
            <div className="pbutton">
                <button>1</button>
                <button>2</button>
                <button>3</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Testcollapse;