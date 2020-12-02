const bodyParser = require('body-parser');
const cors = require('cors');
const express =  require('express');
const mysql = require('mysql');

const app = express();
const port = 1994;

app.use(bodyParser.json());
app.use(cors());

app.listen(port);

//SETUP DB\\

const db = mysql.createConnection({
    host  : 'localhost',
    user : 'root',
    password : 'abc123',
    database : 'db_hr_reimbus'
});

//==========


app.post('/api/employee/get-profile', (req,res) => {

    console.log(req.body)
    var data = req.body;
    var sql = `SELECT * FROM table_employee where employee_id = ${data.id} and password = ${data.password}`


    db.query(sql, (err, result)=>{
        if(err) return res.status(500).send({message : 'get profile' , err})

        let value = {};
        value["employee_id"] = result[0].employee_id;
        value["employee_name"] = result[0].employee_name;
        value["role"] = result[0].role;

        res.status(200).send(value);
        console.log(value)
    })
});

app.post('/api/reimbust/get-list', (req,res) => {

    var data = req.body.id;
    var sql = `SELECT * FROM table_reimbursement where employee_id = ${data}`


    db.query(sql, (err, result)=>{
        if(err) return res.status(500).send({message : 'get profile' , err})


        res.status(200).send(result)
    })
});


app.post('/api/reimbust/add', (req,res) => {

    var sql = `INSERT INTO table_reimbursement SET ?;`;
    console.log(req.body)

        db.query(sql, req.body,(err,result) => {
            if(err) return res.status(500).send({ message : 'Insert into products from database error', err})

            res.status(200).send(result)
        })
});

app.post('/api/reimbust/delete', (req,res) => {


    var sql = `DELETE FROM table_reimbursement WHERE reimbursement_id = ${req.body.id};`;

        db.query(sql, (err,result) => {
            if(err) return res.status(500).send({ message : 'Delete product from database error', err})

            res.status(200).send(result)
        })
});


app.put('/api/reimbust/edit/:id', (req,res) => {


    var sql = `UPDATE table_reimbursement SET ? WHERE reimbursement_id = ${req.params.id};`;

        db.query(sql, req.body, (err,result) => {
            if(err) return res.status(500).send({ message : 'Update product from database error', err})

            res.status(200).send(result)
        })
});
