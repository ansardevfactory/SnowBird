import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProject from "./AddProject";
import Dash from "./Dash";
import EditProject from "./EditProject";
import Epic from "./Epic";
import Project from "./Project";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import Users from "./Users";
import CheckBox from "./CheckBox";
import Sample1 from "./Sample1";
import Sample from "./Sample";
import Menu from "./Menu";
import Sprint from "./Sprint";
import Task from "./Task";
import Test from "./Test";

function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dash />}>
            {" "}
          </Route>
          <Route path="/project" element={<Project />}>
            {" "}
          </Route>
          <Route path="/addproject" element={<AddProject />}>
            {" "}
          </Route>
          <Route path="/editproject" element={<EditProject />}></Route>
          <Route path="/epic" element={<Epic />}></Route>
          <Route path="/adduser" element={<AddUser />}></Route>
          <Route path="/edituser" element={<EditUser />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/task" element={<Task />}></Route>
          <Route path="/sprint" element={<Sprint />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/sample" element={<Sample />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Navigation;
