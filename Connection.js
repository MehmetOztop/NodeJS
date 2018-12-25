var express = require('express');
var app = express();
var port = 8000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


var con = mysql.createConnection({
  host: "company.ckrdrkzztstb.eu-west-3.rds.amazonaws.com",
  user: "Mehmet20",
  password: "bananaphone",
  database: "Company"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});


app.post('/addEmp', (req, res) => {
//console.log(req.body);
//console.log(req.body.SSN, req.body.firstName, req.body.lastName, req.body.sex, req.body.depID);

    var sql = "INSERT INTO Employee (SSN, FirstName, LastName, Sex, DepID) VALUES ( '" +  req.body.SSN + "','"+ req.body.firstName + "','" +  req.body.lastName + "','"  + req.body.sex + "','" + req.body.depID +"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send('Employee is saved to the database.');
    });
  
});
app.listen(port, () => {
    console.log('The application has been started at port :', port);
  });
