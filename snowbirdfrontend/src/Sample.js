import { useState } from 'react'
function Sample() {
  const [projectarray, setprojectarray] = useState([
    { Id: 1, name: 'project1', epic: [1, 2, 3] },
    { Id: 2, name: 'project1', epic: [1, 2] },
    { Id: 3, name: 'project1', epic: [] },
    { Id: 4, name: 'project1', epic: [] },
    { Id: 5, name: 'project1', epic: [1, 2, 3, 4] },
  ])

  return (
    <>
      <tr>
        <th>Id</th>
        <th>Projectname</th>
        <td></td>
      </tr>
      {projectarray.map((item, index) => {
        return (
          <>
            <tr>
              <td>{item.Id}</td>
              <td>{item.name}</td>
              <td></td>
            </tr>
            {item.epic.map((epicitem, epicindex) => {
              return (
                <tr>
                  <td></td>
                  <td>1</td>
                  <td>epic1</td>
                </tr>
              )
            })}
          </>
        )
      })}
    </>
  )
}
export default Sample
