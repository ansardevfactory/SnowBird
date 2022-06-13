import axios from 'axios'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Menu from './Menu'

function Users() {
  const navigate = useNavigate()
  function handleClick() {
    navigate('/AddUser')
  }
  function newClick() {
    navigate('/EditUser')
  }

  const [array, setarray] = useState([])
  useEffect(() => {
    var request = {}
    var header = {}
    var url = 'http://localhost:8000/fetchuserRole'

    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data)
        setarray(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
          {<Menu />}
          <div className="secondcolumn">
            <div className="prowone">
              <label>Users</label>
              <button onClick={handleClick}>Create New</button>
            </div>
            <table className="tablerow">
              <tr className="TblFirstrow">
                <th className="tblId">Id</th>
                <th className="tblusers">Users</th>
                <th className="tblrole">UserRoles</th>
              </tr>

              {array.map((item, index) => {
                return (
                  <>
                    <tr onClick={newClick}>
                      <td>{item.id}</td>
                      <td>{item.txtUserName}</td>
                      <td>{item.txtUserrole}</td>
                    </tr>
                  </>
                )
              })}
            </table>

            <div className="pbutton">
              <button>1</button>
              <button>2</button>
              <button>...</button>
              <button>10</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Users
