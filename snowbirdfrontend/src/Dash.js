
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Singleuser from "./Singleuser";
import "./style/styles.css";
import Menu from "./Menu";
function Dash() {
  var navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [task, setTask] = useState([]);
  var temp;
  useEffect(() => {
    var url = "http://localhost:8000/userfetch";
    var request = {};
    var header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        for (const element of res.data) {
          element.isSelected = true;
          setArray(res.data);
        }
        console.log("array"+JSON.stringify(array));
    
      })
      .catch()   
  }, []);

  const SingleUserClick=(indx)=>{
    // alert(indx)
    const temp=[...array]
    for (const element of temp) {
      element.isSelected = false;
    }
    temp[indx].isSelected=true; 
    setArray(temp)
  }

   function tasklist(id,index) {
    var url = "http://localhost:8000/usertaskfetch";
    var header = {};
    var request = { userId: id };
    //console.log("req" + JSON.stringify(request));
     axios
      .post(url, request, header)
      .then((res) => {
        setTask(res.data);
        
      })
      .catch((err)=>{});

      SingleUserClick(index)
  }

  return (
    <div>
      <div className="outer">
        {/* USer name with icon */}
        {/* <div className="firstrow">
            <div className="usericon"> 
            <div className="loginuser">
            <label>User</label>
            </div>
          </div>
        </div> */}
        <div className="secondrow">
          {/* Side navigation menu */}

          {<Menu />}

          {/* Main outline */}
          <div className="secondcolumn">
           
            <div className="listcontainer">
              <div className="usernamerow">
                {array.map((item, index) => {
                  return (
                    <>
                      {
                        <Singleuser
                          items={item}
                          index={index}
                          getUid={tasklist}
                          SingleUserClick={SingleUserClick}
                        />
                      }
                    </>
                  );
                })}
              </div>
            </div>
            
            {/* Task status name */}
            <div className="statusnamerow">
              <label>TO DO</label>
              <label>InProgress</label>
              <label>Review</label>
              <label>Complete</label>
            </div>

            <div className="tasks"></div>
            <div className="taskbar1">
              {task.map((taskitem, taskindex) => {
                if (taskitem.txtStatus == "to-do")
                  return (
                    <>
                      <p>{taskitem.txtTitle}</p>
                    </>
                  );
              })}
            </div>
            <div className="taskbar2">
              {task.map((taskitem, taskindex) => {
                if (taskitem.txtStatus == "review")
                  return (
                    <>
                      <p>{taskitem.txtTitle}</p>
                    </>
                  );
              })}
            </div>
            <div className="taskbar3">
              {task.map((taskitem, taskindex) => {
                if (taskitem.txtStatus == "Inprogress")
                  return (
                    <>
                      <p>{taskitem.txtTitle}</p>
                    </>
                  );
              })}
            </div>
            <div className="taskbar4">
              {task.map((taskitem, taskindex) => {
                if (taskitem.txtStatus == "completed")
                  return (
                    <>
                      <p>{taskitem.txtTitle}</p>
                    </>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dash;