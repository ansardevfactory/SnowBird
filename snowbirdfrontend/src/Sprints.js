import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Menu from './Menu'

//1.create new-click-redirect to the add sprint page

//2.inside button tag of "create new"

//Onload list- fetch - display
//No. of pages - current page

//Page no.-click-current -task 3 & disable click on the current page

//Row click - edit page//No. of pages - current page

//Page no.-click-current -task 3 & disable click on the current page

//Row click - edit page

function Sprints() {
  const navigate = useNavigate()
  //const count = 10
  const [sprintarray, setsprintarray] = useState([])

  //   { Id: 1, name: 'sprint1', count },
  //   { Id: 2, name: 'sprint2', count },
  //   { Id: 3, name: 'sprint3', count },
  //   { Id: 4, name: 'sprint4', count },
  //   { Id: 5, name: 'sprint5', count },
  function handleClick() {
    navigate('/AddSprint')
  }
  function newClick(e, Id) {
    localStorage.setItem('spid', Id)
    navigate('/EditSprint')
  }
  useEffect(() => {
    var url = 'http://localhost:8000/fetchsprintlist'
    var request = {}
    var header = {}

    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data)
        setsprintarray(res.data)
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
          <div className="usericon"> </div>
          <label>User</label>
        </div>
        <div className="secondrow">
          {/* Side navigation menu */}
          {<Menu />}

          <div className="secondcolumn">
            <div className="prowone">
              <label>Sprint</label>
              <button onClick={handleClick}>Create New</button>
            </div>
            <table className="tablerow">
              <tr className="TblFirstrow">
                <th>#id</th>
                <th>Title</th>
                <th>Start date</th>
                <th>End date</th>
              </tr>

              {sprintarray.map((item, index) => {
                return (
                  <>
                    <tr onClick={(e) => newClick(e, item.Id)}>
                      <td className="tbdata">{item.Id}</td>
                      <td>{item.txtSprintname}</td>
                      <td>{item.dtActstartdate}</td>
                      <td>{item.dtActenddate}</td>
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
export default Sprints
