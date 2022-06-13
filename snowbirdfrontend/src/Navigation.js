import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditSprint from './EditSprint'
import Users from './Users'
import AddSprint from './AddSprint'
import Sprints from './Sprints'
import Task from './Task'
// import Newlogin from './newpro/Newlogin'
import Dash from './Dash'
function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dash />}></Route>
          <Route path="/Users" element={<Users />}></Route>
          <Route path="/Sprints" element={<Sprints />}></Route>
          <Route path="/AddSprint" element={<AddSprint />}></Route>
          <Route path="/EditSprint" element={<EditSprint />}></Route>
          <Route path="/Task" element={<Task />}></Route>
          <Route path="/AddProject" element={<Task />}></Route>
          <Route path="/EditProject" element={<Task />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default Navigation
