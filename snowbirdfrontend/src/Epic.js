import axios from "axios";
import { useEffect, useState } from "react";
import "./style/styles.css";
import Menu from "./Menu";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
function Epic() {
  const [array, setArray] = useState([]);
  var url = "http://localhost:8000/epicfecth";
  var request = {};
  var header = {};
  useEffect(() => {
    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data);
        for (const element of res.data) {
          element.isClicked = true;
        }
        setArray(res.data);
      })
      .catch();
  }, []);

  const handleClick = (e, index) => {
    e.preventDefault();
    var temp = [...array];
    console.log("temp" + JSON.stringify(temp[index]));
    temp[index].isClicked = temp[index].isClicked ? false : true;
    console.log("temp" + JSON.stringify(temp[index]));
    setArray(temp);
  };

  return (
    <div>
      <div className="outer">
        {/* USer name with icon */}
       
        <div className="secondrow">
          {/* Side navigation menu */}
          {<Menu />}

          {/* Main outline */}
          <div className="secondcolumn">
            <div className="prowone">
              <label>Epic </label>
              <button>Create New</button>
            </div>
            <div className="tablerow">
              <table>
                <thead>
                  <th className="withborder constant"></th>
                  <th className="withborder constant">id</th>
                  <th className="withborder">EpicName</th>
                  <th className="withborder">Status</th>
                  <th className="withborder">ProjectName</th>
                </thead>
                <tbody>
                  {array.map((item, index) => {
                    return (
                      <>
                        <tr 
                          onClick={(e) => {
                            handleClick(e, index);
                          }}
                        >
                          <td>
                            {item.isClicked? (
                              <FaAngleDown
                                onClick={(e) => handleClick(e, item, index)}
                              />
                            ) : (
                              <FaAngleRight
                                onClick={(e) => handleClick(e, item, index)}
                              />
                            )}
                          </td>
                         
                          <td className="constant">{item.id}</td>
                          <td>{item.txtStatus}</td>
                          <td>{item.txtName}</td>
                          <td></td>
                        </tr>
                        {item.Task.map((childItem, ChildIndex) => {
                          return (
                            <>
                              <tr
                                className={item.isClicked ? "display" : "none"}
                              >
                                <td></td>
                                <td></td>
                                <td className="task">{childItem.txtTitle}</td>
                                <td className="task">{childItem.txtStatus}</td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="pbutton">
              <button>1</button>
              <button>2</button>
              <button>3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Epic;
