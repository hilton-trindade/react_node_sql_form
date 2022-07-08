const express = require('express');
const cors = require('cors');
var app = require('express')();
var http = require('https').Server(app);
const mysql = require('mysql');


const SELECT_ALL_FEEDBACKS_QUERY = 'SELECT * FROM feedbacks';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'react_sql'
});

var mysql_pool  = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : 'password',
    database        : 'react_sql'
  });

  app.get('/api/database/status',function(req,res) {
	console.log('API CALL: /api/database/status');
	var retvalSettingValue = "?";
	mysql_pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
	  		console.log(' Error getting mysql_pool connection: ' + err);
	  		throw err;
	  	}
	    connection.query('SELECT SettingValue FROM your_database_table WHERE SettingKey =\'DatabaseStatus\'', function(err2, rows, fields) {	
	    	if (err2) {
				var data = { "Time":"", "DatabaseStatus":"" };
				data["Time"] = (new Date()).getTime();
				data["DatabaseStatus"] = "Down";
				res.json(data); 
			} else {
				var dbretval = rows[0].SettingValue;
				if (dbretval == 1 ) {
					var data = { "Time":"", "DatabaseStatus":"" };
					data["Time"] = (new Date()).getTime();
					data["DatabaseStatus"] = "Up";
					res.json(data); 
				} else {
					var data = { "Time":"", "DatabaseStatus":"" };
					data["Time"] = (new Date()).getTime();
					data["DatabaseStatus"] = "Down";
					res.json(data); 
				}
			}
			console.log(' mysql_pool.release()');
			connection.release();
	    });
	});
});


app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /feedbacks to see feedbacks')
});

app.get('/feedbacks/add', (req, res) => {
    const { name, review } = req.query;
    const INSERT_REVIEWS_QUERY = `INSERT INTO feedbacks (name, review) VALUES('${name}', ${review})`
    connection.query(INSERT_REVIEWS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('successfully added feedback')
        }
    });
});

app.get('/feedbacks', (req, res) => {
    connection.query(SELECT_ALL_FEEDBACKS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    });
}); 

app.listen(4000, () => {
    console.log('Server listening on port 4000')
});