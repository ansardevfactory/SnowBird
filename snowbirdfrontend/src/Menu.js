import './style.css'
import { useNavigate } from 'react-router-dom'
function Menu() {
  var navigate = useNavigate()
  function project() {
    navigate('/project')
  }
  function epic() {
    navigate('/epic')
  }
  function board() {
    navigate('/')
  }
  function task() {
    navigate('/Task')
  }
  function sprint() {
    navigate('/Sprints')
  }
  function users() {
    navigate('/Users')
  }
  return (
    <>
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
  )
}
export default Menu
