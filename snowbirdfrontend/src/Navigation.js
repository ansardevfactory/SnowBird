import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditSprint from './EditSprint'
import Users from './Users'
import AddSprint from './AddSprint'
import Sprints from './Sprints'
import Task from './Task'
import Newlogin from './newpro/Newlogin'

function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/Sprints" element={<Sprints />}></Route>
          <Route path="/AddSprint" element={<AddSprint />}></Route>
          <Route path="/EditSprint" element={<EditSprint />}></Route>
          <Route path="/Task" element={<Task />}></Route>
          <Route path="/Newlogin" element={< Newlogin/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default Navigation
