import axios from "axios";
import { ReactSession } from "react-client-session";
import { useEffect, useState } from "react";
import Menu from "./Menu";
function EditProject() {
  const [options, setOption] = useState([]);
  const [name, setTextName] = useState("");
  const [type, setTextType] = useState("");
  const [owner, setRefOwner] = useState("3");
  const [pdetails,setPdetails]=useState([]);
  var pid;
  var pid=localStorage.getItem("Id");
 
  useEffect(()=>{

    
    console.log("pid"+pid);
    var url = "http://localhost:8000/ownerfetch";
    var url1="http://localhost:8000/projectload";
    var request1={"pid":pid};
    
    var header1={};
    var request = {};
    var header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data);
        var len = res.data.length;
        // setA(len);
        if (len > 0) {

          setOption(res.data);
         }
      })
      .catch();

      axios.post(url1,request1,header1).then((res)=>{
        console.log(res.data);
        setPdetails(res.data);

      }).catch();

  },[])
  function updateproject()
  {
    var url = "http://localhost:8000/projectUpdate";
    var request = { prjctname: name, prjcttype: type, refowner: owner ,id:pid};
    console.log("owner :" + JSON.stringify(owner));
    console.log("id :" + JSON.stringify(pid));
    var header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log("reS"+res);
        if (res.data !='undefined') {
          alert("Project updated successfully");
        }

      })
      .catch();
  }
  
    return (
      <div>
        <div className="outer">
          {/* USer name with icon */}

          <div className="firstrow">
            <div className="usericon"> </div>
            <label>User</label>
          </div>
          <div className="secondrow">
            {/* Side navigation menu */}
            {<Menu/>}
            
            <div className="secondcolumn">
              <div className="prowone">
                <label>Edit Project</label>
                <button onClick={updateproject}>SAVE</button>
              </div>
  
              <div className="psecondrow">
                  <div className="titlerow">
                  <label>Title</label><br></br>
                  {pdetails.map((item,index)=>{
                    return<>
                      <input type="text" defaultValue={item.txtName} onChange={(e) => { setTextName(e.target.value)}}></input>
                    </>
                  })}
                     
               </div>
               <div className="descriptiion">
                   <label>Description</label><br></br>
                   {/* <textarea/> */}
                   <input type="text"/>
               </div>
  
               <div className="typerow">
                 <label>Type</label><br></br>
                 
                 <select     onChange={(e) => { setTextType(e.target.value) }}>
                 {pdetails.map((pitem,pindex)=>{
                     return<>
                     
                     <option defaultValue={pitem.txtType}>{pitem.txtType}</option>
                      <option value={"Telecom"}>Telecom</option>
                     <option value={"Business"}>Business</option>
                     </>
                   })}
                    
                    
                 </select>
               </div>
  
               <div className="ownerrow">
                <label>Owner</label>
                <br></br>
                {/* onSelect={(e)=>{setRefOwner(e.target.value)}} */}
                <select onChange={(e) => { setRefOwner(e.target.value) }} >
                  
                  {options.map((item, index) => {
                    return <>

                  <option>{item.txtUserName}</option>
      </>
                    


                  })}

                </select>
              </div>
              </div>
            </div>
  
  
       </div>
        </div>
      </div>
    );
  }
  export default EditProject;
  