import "./style/styles.css";
import { useNavigate } from "react-router-dom";
function Menu() {
  var navigate = useNavigate();
  function project() {
    navigate("/project");
  }
  function epic() {
    navigate("/epic");
  }
  function board(){
      navigate("/");
  }
  function task()
  {
      navigate("/task");
  }
  function sprint()
  {
      navigate("/sprint")
  }
  function users()
  {
    navigate("/users")
}
  return (
    <>
    <div className="firstrow">
     
            <div className="usericon"> 
            <div className="loginuser">
            <label>User</label>
            </div>
          </div>
        
        </div>
      <div className="firstcolumn">
        <nav>
          <li onClick={board}>Board</li>
          <li onClick={project}>Projects</li>
          <li onClick={epic}>Epics</li>
          <li onClick={task}>Tasks</li>
          <li onClick={sprint}>Sprints</li>
          <li onClick={users}>Users</li>
        </nav>
      </div>
    </>
  );
}
export default Menu;
