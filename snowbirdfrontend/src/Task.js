import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Menu from './Menu'

function Task() {
  const navigate = useNavigate()
  const [taskarray, settaskarray] = useState([])
  function handleClick() {
    navigate('/AddTask')
  }
  function newClick() {
    navigate('/EditTask')
  }

  useEffect(() => {
    var url = 'http://localhost:8000/fetchtask'
    var request = {}
    var header = {}

    axios
      .post(url, request, header)
      .then((res) => {
        //console.log(res.data)
        settaskarray(res.data)
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
          {/* Main outline */}
          <div className="secondcolumn">
            <div className="prowone">
              <label>Task</label>
              <button onClick={handleClick}>Add Task</button>
            </div>

            <table className="tablerow">
              <tr className="TblFirstrow">
                <th>#id</th>
                <th>Task</th>
                <th>Status</th>
                <th>Epic</th>
                <th>ProjectName</th>
              </tr>
              {taskarray.map((item, index) => {
                return (
                  <>
                    <tr onClick={newClick}>
                      <td className="tbdata">{item.id}</td>
                      <td>{item.txtTitle}</td>
                      <td>{item.txtStatus}</td>
                      <td>{item.EpicName}</td>
                      <td>{item.txtName}</td>
                    </tr>
                  </>
                )
              })}
            </table>
          </div>

          <div className="pbutton">
            <button>1</button>
            <button>2</button>
            <button>...</button>
            <button>10</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Task
