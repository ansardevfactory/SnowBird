const express = require('express');
const app = express();
var mysql = require('mysql');
const cors = require('cors');
//const react = require('react');
//const { useSyncExternalStore } = require('react/cjs/react.production.min');
app.use(cors());
app.use(express.json());
var con = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "agileprom"

  });
con.connect(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Connected");
  }
})
/**********************************  BOARD PAGE  ************************************************************/

/*All Users fetch (display all users on top)- Board Page*/

app.post('/userfetch', function (req, res) {
  var sql = "select tu.txtUserName,tu.id from tblusers tu join tbluserroles tr on tu.refUserRole=tr.id where tr.txtUserRole='Employee';;"
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

/* User task fetch of a selected user - Board Page*/

app.post('/usertaskfetch', function (req, res) {
  var uid = req.body.userId;
  var sql = "select txtTitle,txtStatus from tbltasks where refAssignee='" + uid + "';"
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})


/***************************************PROJECT PAGE***********************************************************************************************/
/* API to fetch project details -Project Page  */

app.post('/projectdetailfetch', function (req, res) {

  var pownerid = req.body.poid;
  console.log(pownerid);
  var project = [];
  var epic = [];
  var task = [];
  //var sql = "select tp.id,tp.txtName AS projectName,te.refAssignee as assignee,te.txtTitle AS Epic,te.id as Epicid ,te.txtStatus as Epicstatus,tt.txtTitle AS Task,tt.txtStatus AS taskstatus,tu.txtUserName as Projectowner FROM tblprojects tp JOIN tblepic te ON tp.id = te.refProjectId JOIN tbltasks tt ON tt.refEpicid = te.refProjectId join tblusers tu on te.refAssignee=tu.id WHERE tp.refProjectOwner = '3';";

  con.query("SELECT  tp.id,tp.txtName,tu.txtUserName FROM tblprojects tp join tblusers tu on tp.refProjectOwner=tu.id where refProjectOwner ='" + pownerid + "';", function (err, result) {
    //console.log(result);
    project = [...result];

  })
  con.query("select id,refProjectId,refAssignee,txtTitle,txtStatus from tblepic;", function (err, result) {
    //console.log(result);

    epic = [...result];


  })
  con.query("select id,refEpicid,txtTitle,txtStatus from tbltasks;", function (err, result) {
    task = [...result];
    //})
    taskobj = {};
    epicobj = {};
    projectobj = {};
    task.forEach(element => {
      if (taskobj[element.refEpicid] == undefined)
        taskobj[element.refEpicid] = [element];
      else {
        temparray = taskobj[element.refEpicid];
        temparray.push(element)
      }
    });

    epic.forEach(element => {
      if (epicobj[element.refProjectId] == undefined)
        epicobj[element.refProjectId] = [element];


      else {
        temparray1 = epicobj[element.refProjectId];
        temparray1.push(element)
      }
      element["task"] = taskobj[element.id]
    });

    project.forEach(element => {
      if (projectobj[element.refProjectId] == undefined)
        projectobj[element.refProjectId] = [element];
      else {
        temparray = projectobj[element.refEpicid];
        temparray.push(element)
      }
      element["Epic"] = epicobj[element.id]
    });

    console.log(JSON.stringify(project));
    res.send(project);

  })

})



/**************************************************ADD PROJECT PAGE***************************************************************************************/
/*API to insert project details - Add Project Page */

app.post('/projectinsert', function (req, res) {
  var txtName = req.body.name;
  var txtType = req.body.type;
  var refProjectOwner = req.body.owner;
  // var dtEstStartDate = req.body.stdate;
  // var dtEstEndDate = req.body.endate;

  var sql = "insert into tblprojects(txtName,txtType,refProjectOwner)values('" + txtName + "','" + txtType + "','" + refProjectOwner + "');";
  con.query(sql, function (err, result) {
    if (err) throw err;
    else
      //res.send(JSON.stringify(req));
      res.send(result);
      console.log(sql);
  })
})
/* API to fetch Managers- populate dropdown list  */

app.post('/ownerfetch', function (req, res) {

  var sql = "select tu.txtUserName,tu.id from tblusers tu join tbluserroles tr on tu.refUserRole=tr.id where txtUserRole='Manager'"
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

/*API for project Update */
app.post('/projectUpdate', function (req, res) {

  var pname = req.body.prjctname;
  var ptype = req.body.prjcttype;
  var owner = req.body.refowner;
  var prjctid = req.body.id;
  var sql = "update tblprojects set txtName='" + pname + "', txtType='" + ptype + "',refProjectOwner='" + owner + "' where id='" + prjctid + "' ;;"
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

/*API to dispaly the details pf selected project*/
app.post('/selectedproject', function (req, res) {
  var id = req.body.prjctId;
  var sql = "SELECT tb.txtName,tb.txtType,tb.refProjectOwner ,tu.txtUserName from tblprojects tb join tblusers tu on tb.refProjectOwner=tu.id where tb.id='"+id+"';"
  con.query(sql,function(err,result)
  {
    if(err)throw err;
    res.send(result);
  })
})


/**************************************************************************************************************************************************************************** */

app.post('/projectdetailfetchNew', function (req, res) {

  var pownerid = 3;
  const project = new Promise((resolve, reject) => {
    con.query(
      "SELECT  tp.id,tp.txtName,tu.txtUserName FROM tblprojects tp join tblusers tu on tp.refProjectOwner=tu.id where refProjectOwner ='" + pownerid + "'",
      function (err, result) {
        if (err) resolve(err);
        resolve(result);
      }
    );
  });


  const epic = new Promise((resolve, reject) => {
    con.query(
      "select id,refProjectId,refAssignee,txtTitle,txtStatus from tblepic;",
      function (err, result) {
        if (err) resolve(err);
        resolve(result);
      }
    );
  });

  const task = new Promise((resolve, reject) => {
    con.query(
      "select id,refEpicid,txtTitle,txtStatus from tbltasks",
      function (err, result) {
        if (err) resolve(err);
        resolve(result);
      }
    );
  });

  Promise.all([project, epic, task]).then((values) => {
    var project = values[0];
    var epic = values[1];
    var task = values[2];

    var taskobj = {};
    for (element of task) {
      if (taskobj[element.refEpicid] == undefined) {
        taskobj[element.refEpicid] = [element];
      } else {
        var temp = taskobj[element.refEpicid];
        taskobj[element.refEpicid] = [...temp, element];
      }
    }
    for (element of epic) {
      if (taskobj[element.id] == undefined) element.task = [];
      else {
        element.task = taskobj[element.id];
      }
    }

    var epicobj = {};
    for (element of epic) {
      if (epicobj[element.refProjectId] == undefined) {
        epicobj[element.refProjectId] = [element];
      } else {
        var temp = epicobj[element.refProjectId];
        epicobj[element.refProjectId] = [...temp, element];
      }
    }
    for (element of project) {
      if (epicobj[element.id] == undefined) element.epic = [];
      else {
        element.epic = epicobj[element.id];
      }
    }
    console.log(JSON.stringify(project));
    res.send(project);
  });

})
/****************************************************Epic ****************************************/



/*****************************************  ADD USER  **************************************************************** */
/* API for fetchUserRole-- populate dropdown*/

app.post('/userRolefetch', function (req, res) {
  var sql = "select id, txtUserRole from tbluserroles;"
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
  })
})


app.post('/projectload', function (req, res) {
  var pid=req.body.pid;
  var sql = "select tb.txtName,tb.txtType ,tu.txtUserName from tblprojects tb join  tblusers tu on tb.refProjectOwner=tu.id  where tb.id='"+pid+"';"
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
  })
})


app.post('/insertuser', function (req, res) {
  var uname = req.body.username;
  var pass = req.body.password;
  var typ = req.body.type;
  var sql1 = "select id from tblusers where txtUserName='" + uname + "';"
  var sql2 = "insert into tblusers(txtUserName,txtPassword,refUserRole)values('" + uname + "','" + pass + "','" + typ + "');"
  con.query(sql1, function (err, result) {
      var a = result[0];
      if (a != undefined) {
          res.send("User already exist!!!");
      }
      else {
          //res.send("Ready to insert values into user "+uname);
          con.query(sql2, function (err, result) {
              if (err) throw err;
              res.send(result);
          })
      }
  });
})

app.post('/userupdatefetch',function(req,res){
  usrid=req.body.id;
   var sql="SELECT tu.txtUserName,tu.txtPassword,tr.txtUserRole,tu.refUserRole from tblusers tu join tbluserroles tr on tu.refUserRole=tr.id where tu.id='"+usrid+"';"
  con.query(sql,function(err,result){
     if(err)throw err;
     res.send(result);
   })
})

app.post('/userupdate', function (req, res) {
  //fetch id from users where username=req username

  var uname = req.body.username;
  var suname=req.body.suname;
  var pass = req.body.password;
  var ty = req.body.reftype;
  var uid = req.body.id;
  var sql1 = "select id from tblusers where txtUserName='" + suname + "';";
  console.log("uname"+suname);
  var sql2 = "update tblusers set txtPassword='" + pass + "',txtUserName='" + uname + "' ,refUserRole='" + ty + "'where id= '" + uid + "';";
  con.query(sql1, function (err, result) {

     
      if (result.length > 0) {
          
          if (result[0].id == req.body.id) {

              
              con.query(sql2, function (err, result1) {
                  if(err) throw res.send(err);
                  res.send(result1);
                  //console.log(result1);
              })

          }
        
          else {
             
              res.send("Username duplicate");
          }
      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  });
})
/*****************************************USERS PAGE********************************************************************************** */
app.post('/userfetchforusers', function (req, res) {
  var sql = "select tu.txtUserName,tu.id ,tr.txtUserRole from tblusers tu join tbluserroles tr on tu.refUserRole=tr.id where tr.txtUserRole='Employee';;"
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

 app.post('/epicfecth',function(req,res){

  const Epic = new Promise((resolve, reject) => {
    var sql="select te.id,te.refProjectId,te.txtTitle,te.txtStatus,tb.txtName from tblepic te join tblprojects tb where te.refProjectId=tb.id;"
    con.query(sql,function (err, result)
    {
        if (err) resolve(err);
        resolve(result);
        //res.send(result);
      }
    );
  });

  const Task = new Promise((resolve, reject) => {
    var sql="select id,refEpicid,txtTitle,txtStatus from tbltasks;"
    con.query(sql,function (err, result)
    {
        if (err) resolve(err);
        resolve(result);
        //res.send(result);
      }
    );
  });

  Promise.all([Epic,Task]).then((values) => {
    var Epic = values[0];
    var Task = values[1];
  var Epicobj = {};
  var Taskobj = {};
  for (element of Task) {
    if (Taskobj[element.refEpicid] == undefined) {
      Taskobj[element.refEpicid] = [element];
    } else {
      var temp =Taskobj[element.refEpicid];
      Taskobj[element.refEpicid] = [...temp, element];
    }
    //res.send(Taskobj);
    //console.log(Taskobj);
  }

    for (element of Epic) {
      if (Epicobj[element.refProjectId] == undefined) {
        Epicobj[element.refProjectId] = [element];
      } else {
        var temp =Epicobj[element.refProjectId];
        Epicobj[element.refProjectId] =[...temp, element];
      }
      //res.send(Epicobj);
    }
  //console.log(Epicobj);
  for (element of Epic) {
    if (Taskobj[element.id] == undefined) element.Task = [];
    else {
      element.Task = Taskobj[element.id];
    }
  }
  //console.log(Epic);
  res.send(Epic);
})

})

/*****************************************************************************************************************************/
                                                /***Sushmita******/
/*****************************************************************************************************************************/
/**********************************  USERS ************************************************************/

/*API for FetchUserrole*/

app.post('/fetchuserRole', function (req, res) {
  var sql =
    'select tu.id,tu.txtUserName,tr.txtUserrole from tblusers tu join tbluserroles tr on tu.RefUserRole=tr.id order by tu.id asc;'

  con.query(sql, function (err, result) {
    if (err) throw err
    else {
      res.send(result)
    }
  })
})

/*API for FetchUser*/

app.post('/fetchuser', function (req, res) {
  var sql = ' select id,txtUserName,txtPassword from tblusers'

  con.query(sql, function (err, result) {
    if (err) throw err
    else {
      res.send(result)
    }
  })
})

/*API for Insert User*/

app.post('/insertuser', function (req, res) {
  var uname = req.body.txtUsername
  var paswd = req.body.txtPassword
  var userrole = req.body.RefUserRole

  var sql1 = "Select id from tblusers where txtUsername='" + uname + "';"
  var sql2 =
    "Insert into tblusers(txtUsername,txtPassword,RefUserRole) values('" +
    uname +
    "','" +
    paswd +
    "','" +
    userrole +
    "');"

  con.query(sql1, function (err, result) {
    var a = result[0]
    if (a != undefined) {
      res.send('user already exists!!')
    } else {
      con.query(sql2, function (err, result) {
        if (err) throw err
        else {
          res.send(result)
        }
      })
    }
  })
})

/*API for Update User*/

app.post('/updateuser', function (req, res) {
  var Username = req.body.txtUsername
  var id = req.body.id
  var sql =
    "UPDATE tblusers SET txtUsername='" + Username + "' WHERE id='" + id + "';"

  con.query(sql, function (err, result) {
    if (err) throw err
    res.send(result)
  })
})

/**********************************  Sprints ************************************************************/

/*API for Update Sprint*/

app.post('/updatesprint', function (req, res) {
  console.log(req.body.dtActdate)
  var Sprint = req.body.txtSprintname
  var Description = req.body.Description
  var Status = req.body.Status
  var txtUserName = req.body.txtUsername
  var actualdt = req.body.dtActdate
  var Enddate = req.body.dtActenddate
  var id = req.body.Id
  var sql =
    "UPDATE tblsprints SET txtSprintname='" +
    Sprint +
    "',Description='" +
    Description +
    "',Status ='" +
    Status +
    "',txtUserName='" +
    txtUserName +
    "',dtActstartdate='" +
    actualdt +
    "',dtActenddate='" +
    Enddate +
    "'WHERE id='" +
    id +
    "';"

  con.query(sql, function (err, result) {
    if (err) throw err
    res.send(result)
  })
})

/*API for InsertSprint*/

app.post('/InsertSprint', function (req, res) {
  var Sname = req.body.txtSprintname
  var Desc = req.body.Description
  var assign = req.body.txtUsername
  var Status = req.body.Status
  var Acstdate = req.body.dtActdate
  var Acenddate = req.body.dtActenddate

  //var sql1 = "Select id from tblusers where txtUsername='" + uname + "';"
  var sql =
    "Insert into tblsprints(txtSprintname,Description,txtUsername,Status,dtActstartdate,dtActenddate) values('" +
    Sname +
    "' ,'" +
    Desc +
    "','" +
    assign +
    "','" +
    Status +
    "','" +
    Acstdate +
    "','" +
    Acenddate +
    "')"

  con.query(sql, function (err, result) {
    if (err) throw err
    else {
      console.log(Acstdate)
      res.send(result)
    }
  })
})
/*API for FetchSprintlist*/

app.post('/fetchsprintlist', function (req, res) {
  var sql =
    ' select Id,txtSprintname,dtActstartdate,dtActenddate from tblsprints'

  con.query(sql, function (err, result) {
    if (err) throw err
    else {
      res.send(result)
    }
  })
})

/*API for Fetch FetchTasklist*/

app.post('/fetchtask', function (req, res) {
  var sql =
    'select ta.id,ta.txtTitle,ta.txtStatus,ep.EpicName,pr.txtName from ((tbltasks ta join tblepics ep on ta.refepicid=ep.id)join tblprojects pr on pr.id=ep.refprojectid) order by ta.id asc;'

  con.query(sql, function (err, result) {
    if (err) throw err
    else {
      res.send(result)
    }
  })
})
/*API for Fetch Sprintdetails as per sprintid*/
app.post('/sprintdetails', function (req, res) {
  var Sid = req.body.Id
  var sql =
    "select txtSprintname,Description,txtUsername,Status,dtActstartdate,dtActenddate from tblsprints where Id='" +
    Sid +
    "';"

  con.query(sql, function (err, result) {
    if (err) throw err
    else {
      res.send(result)
    }
  })
})

/*API for Fetch Sprintwisetasklist*/

app.post('/fetchsprintwisetasklist', function (req, res) {
  var Sprintid = req.body.Id
  var sql =
    "select ta.id,ta.txtTitle,ta.txtStatus,ep.EpicName,pr.txtName from ((tbltasks ta join tblepics ep on ta.refepicid=ep.id)join tblprojects pr on pr.id=ep.refprojectid) where refsprintid='" +
    Sprintid +
    "';"
  con.query(sql, function (err, result) {
    if (err) throw err
    else {
      res.send(result)
    }
  })
})

/*API for Fetch Insert Task*/

app.post('/InsertTask', function (req, res) {
  var Tname = req.body.txtTitle
  var Tdesc = req.body.txtDesc
  var Status = req.body.txtStatus
  var Refepicid = req.body.refepicid
  var Assignedto = req.body.refAssignee
  var Refsprintid = req.body.refsprintid
  // var Start date
  // console.log(Refepicid)
  // console.log(Refsprintid)
  // console.log(Assignedto)

  var sql =
    "insert into tbltasks (txtTitle,txtDesc,txtStatus,refepicid,refAssignee,refsprintid) values('" +
    Tname +
    "' ,'" +
    Tdesc +
    "','" +
    Status +
    "','" +
    Refepicid +
    "','" +
    Refsprintid +
    "','" +
    Assignedto +
    "')"

  con.query(sql, function (err, result) {
    if (err) throw err
    else {
      res.send(result)
    }
  })
})

/*API for update Task*/

app.post('/updatetask', function (req, res) {
  var Status = req.body.txtStatus
  var ID = req.body.id
  var sql =
    "update tbltasks set txtStatus ='" + Status + "' where id='" + ID + "'"

  con.query(sql, function (err, result) {
    if (err) throw err
    res.send(result)
  })
})


app.listen(8000, () => {
  console.log("Server is running");
})
