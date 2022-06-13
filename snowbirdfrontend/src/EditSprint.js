import './css/addsprintstyle.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Menu from './Menu'
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

function EditSprint() {
  const [options, setOption] = useState([])
  const [Sprintname, settextSprintname] = useState('')
  const [Description, setdescription] = useState('')
  const [Status, setStatus] = useState('')
  const [assignedto, settxtUserName] = useState([])
  const [fromdate, setdtActstartdate] = useState('2022-06-30')
  const [todate, setdtActenddate] = useState()
  const [array, setArray] = useState([])
  const [taskarray, settaskarray] = useState([])
  const [statarray, setstatarray] = useState([
    { Id: 1, Status: 'To Do' },
    { Id: 2, Status: 'In Progress' },
    { Id: 3, Status: 'Review' },
    { Id: 4, Status: 'Completed' },
  ])
  const [sparray, setsparray] = useState([])
  const navigate = useNavigate()
  const [Id, setid] = useState('')

  useEffect(() => {
    //localStorage.getItem(Id)
    var tempid = localStorage.getItem('spid')
    //console.log(tempid)
    setid(tempid)

    var url = 'http://localhost:8000/fetchuser'
    var req = {}
    var header = {}
    axios
      .post(url, req, header)
      .then((res) => {
        setArray(res.data)
      })
      .catch()
    
    var url1 = 'http://localhost:8000/sprintdetails'
    var req1 = { Id: tempid }
    var header1 = {}
    axios
      .post(url1, req1, header1)
      .then((res) => {
        //alert('hi')
        //console.log(JSON.stringify(req1))
        console.log('response' + JSON.stringify(res.data))
       
        setsparray(res.data)

        settextSprintname(res.data[0].txtSprintname)
        setdescription(res.data[0].Description)
        setStatus(res.data[0].Status)
        settxtUserName(res.data[0].assignedto)
        setdtActstartdate(res.data[0].dtActstartdate)
        setdtActenddate(res.data[0].dtActenddate)
        console.log("hi"+res.data[0].dtActenddate)
      })
      .catch()
      var url2 = 'http://localhost:8000/fetchsprintwisetasklist'
    var req2 = {Id:tempid}
    var header2 = {}
    axios
      .post(url2, req2, header2)
      .then((res) => {
        // console.log(res)
        settaskarray(res.data)
      
      })
      .catch()
  }, [])

  function handleclick() {
    console.log(fromdate)
    var url = 'http://localhost:8000/updatesprint'
    var request = {
      Id: Id,
      txtSprintname: Sprintname,
      Description: Description,
      dtActdate: fromdate,
      dtActenddate: todate,
      Status: Status,
      txtUsername: assignedto,
    }
    // console.log(request)
    var header = {}

    axios
      .post(url, request, header)
      .then((res) => {
        // console.log('result' + JSON.stringify(res.data))
        if (res.data !== 'undefined') {
          alert('updated sprint')
        }
      })
      .catch()
  }
  function newClick() {
    navigate('/Task')
  }
  // function newClick() {
  //   navigate('/EditTask')
  // }

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
              <label>EditSprint</label>
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
                value={Sprintname}
                onChange={(e) => {
                  settextSprintname(e.target.value)
                }}
              />
            </div>

            <div className="as_sc_row2_cl2">
              <label>Description</label>
              <textarea
                rows="8"
                cols="60"
                value={Description}
                onChange={(e) => {
                  setdescription(e.target.value)
                }}
              ></textarea>
            </div>
          </div>
          <div className="as_sc_row3">
            <div className="as_sc_row3_cl1">
              <label>Status</label>

              <select
                className="as_sc_dropbox1"
                value={Status}
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
            </div>
            <div className="as_sc_row3_cl2">
              <label>Assigned to</label>
              <select
                className="as_sc_dropbox2"
                value={assignedto}
                onChange={(e) => {
                  settxtUserName(e.target.value)
                }}
              >
                {array.map((item, index) => {
                  return (
                    <>
                      <option value={item.txtUserName}>
                        {item.txtUserName}
                      </option>
                    </>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="as_sc_row4">
            <div className="as_sc_row4_cl1">
              <label>From date</label>
              {/* <DatePicker selected={fromdate} onChange={date => setdtActstartdate(date)} /> */}
 
              <input
                type="date-time local"
                
                value={fromdate}
                onChange={(e) => {
                  setdtActstartdate(e.target.value)
                }}
              />
            </div>
            <div className="as_sc_row4_cl2">
              <label>To date</label>
              <input
                type="date-time local"
                value={todate}
                onChange={(e) => {
                  setdtActenddate(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="as_sc_row7">
            <div className="as_sc_row7_cl1">
              <label>Task</label>
            </div>
            <div className="as_sc_row7_cl2">
              <button onClick={newClick}>Add</button>
            </div>
          </div>
          <div></div>
          <table className="tablerow">
            <tr className="TblFirstrow">
              <th>#id</th>
              <th>Task</th>
              <th>Status</th>
              <th>Epic Name</th>
              <th>Project Name</th>
            </tr>

            {taskarray.map((item, index) => {
              return (
                <>
                  <tr>
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

        <div className="as_sc_row6">
          <button>1</button>
          <button>2</button>
          <button>...</button>
          <button>10</button>
        </div>
      </div>
    </div>
  )
}
export default EditSprint
