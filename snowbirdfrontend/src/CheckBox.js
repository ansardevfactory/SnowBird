
import "./style/styles.css";
import { useState } from "react";
const CheckBox=()=>{
    const [checked, setChecked] = useState("true");
    return<>
    <input type="checkbox"  defaultChecked="true" id="fbox"/><label>abc<br></br></label>
    <input type="checkbox"  defaultChecked="true"  id="secbox" /><label >def<br></br></label>
    <input type="checkbox" id ="thirdbox"/><label for thirdbox>ghi</label><br></br>
    <input type="checkbox" id="fourbox"/><label for fourbox>jkl</label><br></br>
    </>

}
export default CheckBox;