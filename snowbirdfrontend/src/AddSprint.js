import './css/addsprintstyle.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Menu from './Menu'

function AddSprint() {
  const [options, setOption] = useState([])
  const [Sprintname, settextSprintname] = useState('')
  const [Description, setdescription] = useState('')
  const [assignedto, settxtUserName] = useState('')
  const [todate, settodate] = useState(new Date())
  const [fromdate, setfromdate] = useState(new Date())
  const [Status, setStatus] = useState('')
  const [array, setArray] = useState([])
  const [statarray, setstatarray] = useState([
    { Id: 1, Status: 'To Do' },
    { Id: 2, Status: 'In Progress' },
    { Id: 3, Status: 'Review' },
    { Id: 4, Status: 'Completed' },
  ])
  // const [taskarray, settaskarray] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    var url = 'http://localhost:8000/fetchuser'
    var req = {}
    var header = {}
    axios
      .post(url, req, header)
      .then((res) => {
        setArray(res.data)
      })
      .catch()
  }, [])

  function handleclick() {
    console.log(Status)
    var url = 'http://localhost:8000/insertSprint'
    var request = {
      txtSprintname: Sprintname,
      Description:Description,
      Status: Status,
      txtUsername:assignedto,
      dtActdate:fromdate,
      dtActenddate: todate
    }
    var header = {}

    axios
      .post(url, request, header)
      .then((res) => {
        console.log(request.dtActenddate)
        if (res.data) 
          //console.log('g1' + JSON.stringify(res.data))
          //console.log(request.dtActenddate)
          alert('added new sprint')
        
      })
      .catch()
  }

  return (
    <div className="outer">
      <div className="firstrow">
        <div className="usericon"> </div>
        <label>User</label>
      </div>
      <div className="secondrow">
        {<Menu />}
        <div className="as_sc">
          <div className="as_sc_row1">
            <div className="as_sc_row1_cl1">
              <label>Add Sprint</label>
            </div>
            <div className="as_sc_row1_cl2">
              <button onClick={handleclick}>SAVE</button>
            </div>
             </div>
          <div className="as_sc_row2">
            <div className="as_sc_row2_cl1">
              <label>Title</label>
              <input
                type="text"
                onChange={(e) => {
                  settextSprintname(e.target.value)
                }}
              />
            </div>

            <div className="as_sc_row2_cl2">
              <label>Description</label>
              <textarea rows="8" cols="60" onChange={(e) => {
                  setdescription(e.target.value)}}
                ></textarea>
            </div>
          </div>
          <div className="as_sc_row3">
            <div className="as_sc_row3_cl1">
              <label>Status</label>
              <select
                className="as_sc_dropbox1"
               // value={Status}
                onChange={(e) => {
                  setStatus(e.target.value)
                }}
              >
                {statarray.map((stitem, stindex) => {
                  return (
                    <>
                      <option value={stitem.Status}>{stitem.Status}</option>
                    </>
                  )
                })} 
                
              </select>

              {/* <select className="as_sc_dropbox1">
                <option>--options--</option>
                <option>To do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Completed</option>
              </select> */}
            </div>
            <div className="as_sc_row3_cl2">
              <label>Assigned to</label>
              <select
                className="as_sc_dropbox2"
                onChange={(e) => {
                  settxtUserName(e.target.value)
                }}
              >
                {array.map((item, index) => {
                  return (
                    <>
                      <option value={item.txtUserName}>{item.txtUserName}</option>
                    </>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="as_sc_row4">
            <div className="as_sc_row4_cl1">
              <label>From date</label>
              <input
                type="datetime-local"
                onChange={(e) => {
                  setfromdate(e.target.value)
                }}
              />
            </div>
            <div className="as_sc_row4_cl2">
              <label>To date</label>
              <input
                type="datetime-local"
                onChange={(e) => {
                  settodate(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="as_sc_row6">
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
export default AddSprint
