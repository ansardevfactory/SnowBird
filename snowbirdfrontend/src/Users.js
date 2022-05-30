import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/styles.css';
import Menu from './Menu';
  
function Users() {
    const [array,setArray]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
      var url="http://localhost:8000/userfetchforusers";
    var header={};
    var request={};
    axios.post(url,request,header).then((res)=>{
        console.log(res.data);
        setArray(res.data);
    }).catch();

    },[])
    

function newuser()
{

         navigate('/adduser');
    }
    function edituser(n,name)
    {
      console.log(n);
      navigate("/edituser")
      localStorage.setItem("id",n);
      localStorage.setItem("name",name);

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
              <label>User List</label>
              <button onClick={newuser}>New User</button>
            </div>
            <div className='secthirdrow'>
              <table>
                <thead>
                  <th> Id</th>
                  <th> Users</th>
                  <th> UserRoles</th>
                </thead>
                <tbody>
                
                    {array.map((item,index)=>{
                       
                        return<>
                        <tr>
                        <td onClick={()=>{edituser(item.id,item.txtUserName)}}>{item.id}</td>
                        <td>{item.txtUserName}</td>
                        <td>{item.txtUserRole}</td>
                        <td></td>
                        </tr>
                        </>
                       
                    })}
                     
                    </tbody>
              </table>
            </div>
          </div>
          <div className="pages">
            <button>-</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>10</button>
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Users