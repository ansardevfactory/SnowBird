import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import "./style/styles.css";
function EditUser() {
  var id=localStorage.getItem("id");
  const[uid,setId]=useState("");
  const [array,setArray]=useState([]);
  const[uname,setUname]=useState("");
  const[pw,setPw]=useState("");
  const[role,setRole]=useState("");
  const [uarray,setUArray]=useState([]);
  var nme=localStorage.getItem("name");
  console.log("id"+id);
  useEffect(()=>{
    //alert("hi");
    var url="http://localhost:8000/userupdatefetch";
    var header={};
    setId(id);
    //setUname(nme);
    var request={id:id};
  
    axios.post(url,request,header).then((res)=>{
         console.log("res"+JSON.stringify(res.data));
         setArray(res.data);
       
          setUname(res.data[0].txtUserName);
         
          setPw(res.data[0].txtPassword);
       
          setRole(res.data[0].txtUserRole);

          setRole(res.data[0].refUserRole);

    }).catch();


    var url1="http://localhost:8000/userRolefetch";
    var req={};
    //console.log("name"+nme)
    var header1={};
    axios.post(url1,req,header1).then((res)=>{
      console.log(res.data);
      
        var len = res.data.length;
        if (len > 0) {
          setUArray(res.data);
          
          
          
         
       
          //console.log(JSON.stringify(array));
           }
    }).catch();

  },[])

  function edituser(){
    var url="http://localhost:8000/userupdate";
    var header={};
    var request={username:uname,password:pw,reftype:role,id:uid,suname:nme};
    console.log("req"+JSON.stringify(request));
    axios.post(url,request,header).then((res)=>{
      if(res.data.code=="ER_DUP_ENTRY")
      {
        alert("Duplicate entry");
       
      }
      else 
      {
        alert("User updated !")
      }
      console.log("after update"+JSON.stringify(res.data));

    }).catch();

  }
  return (
    <div>
      <div className="outer">
        {/* USer name with icon */}
        {/* <div className="firstrow">
          <div className="usericon"></div>
          <label>User</label>
        </div> */}

        <div className="secondrow">
          {/* Side navigation menu */}
          {<Menu/>}
          <div className="secondcolumn">
            <div className="prowone">
              <label>Edit User</label>
              <button onClick={edituser}>SAVE</button>
            </div>


            <div className="psecondrow">
              <div className="titlerow">
                <label>User Name</label>
                <br></br>
               <input type="text" value={uname} onChange={(e)=>{setUname(e.target.value)}}></input>
              </div>

              <div className="titlerow">
                <label>Password</label><br></br>
                  <input type="password" value={pw} onChange={(e)=>{setPw(e.target.value)}}/>
                 
              </div>
              <div className="typerow">
                <label>Role</label>
                <br></br>
                
                <select  value={role}  onChange={(e)=>{setRole(e.target.value)}}>
                    {uarray.map((uitem,uindex)=>{

                        return<>
                         
                         <option value={uitem.id}>{uitem.txtUserRole}</option>
                       
                           </>
                       
                      })}
                      </select>
                     
                      
                   

           
                
                   
                  
                  {/* <option>Employee</option>
                  <option>Manager</option> */}
                
              </div>

              </div>
            
              </div>

          
        </div>
      </div>
    </div>
  );
}
export default EditUser;
