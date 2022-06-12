const mysql = require('mysql')


let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12101210Sie',
  database: 'deneme'
});



exports.createUser = async (req, res) => {
  let addUser = await `INSERT INTO users (id,user_email,user_password,user_name,user_surname) VALUES( 0, '${req.body.email}', '${req.body.password}',NULL,NULL);`;

  await connection.connect(function (err) {
    if (err) throw err;
    connection.query(addUser, function (err, results) {
      if (err) throw err.message;
      console.log('Başarılı bir şekilde eklendi.');
    });
  });

  res.status(200).render('register')
}


exports.loginUser = async (req, res) => {

  try {
    connection.connect(function (err) {
      if (err) throw err;
      let user = `SELECT * FROM users WHERE user_email = '${req.body.email}'`;


      connection.query(user, function (err, results) {
        if (err) throw err.message;

        let pass = results[0].user_password

        let enteringPass = req.body.password



        let tasks = `SELECT * FROM todos WHERE user_id = '${results[0].id}'`;


        connection.query(tasks, function (err, toDos) {
          if (err) throw err.message;

          console.log(toDos)

          if (enteringPass === pass) { res.render('index', { toDos, results }) }


        });




      });
    });





  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};





exports.addTask = async (req, res) => {

  try {
    //connection.connect(function (err) {
    //if (err) throw err;
    let task = req.body.task

    let user = `SELECT * FROM users WHERE user_email = '${req.body.userEmail}'`;

    connection.query(user, function (err, results) {
      if (err) throw err.message;
      console.log(results[0])
      let toDo = `INSERT INTO todos VALUES(0, '${results[0].id}', '${task}', 0);`;
      connection.query(toDo, function (err, results2) {
        if (err) throw err.message;
      });

      let tasks = `SELECT * FROM todos WHERE user_id = '${results[0].id}'`;


      connection.query(tasks, function (err, toDos) {
        if (err) throw err.message;

        console.log(toDos)

        res.render('index', { toDos, results })


      });



    });






    //}

    //);





  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteTask = async (req, res) => {

  let deletingTask = `DELETE FROM todos WHERE id = ${req.body.taskID}  `;
  let user = `SELECT * FROM users WHERE id = ${req.body.taskUserID}    `;
  let tasks = `SELECT * FROM todos WHERE user_id = ${req.body.taskUserID}    `;


  connection.query(deletingTask, function (err, x) {
   
    connection.query(user, function (err, results) {
  
      connection.query(tasks, function (err, toDos) {

        res.render('index', { toDos, results })
  

    
      });
    
    });

 
 
  });

 



}