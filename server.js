const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

var config = {
    server: conf.server,
    options: { encrypt:false, database: conf.database },
    authentication:{
        type:"default",
        options:{
            userName:conf.userName,
            password:conf.password
        }
    }
};

// var config = {
//     user: conf.userName,
//     password: conf.password,
//     server: conf.server,
//     database: conf.database,
    
//     stream: true
// };

// sql.connect(config);

var sql = require('mssql');
sql.connect(config, function(err){
    if(err){
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료')
})


app.get('/api/customers', (req, res) => {
    // var request = new sql.Request();
    // request.query("select * from  [MMS_PT2].[dbo].[CUSTOMER]",
    // (err, rows, fields) => {
    //     console.log('result1 :', rows)
    //     console.log('result2 :', fields)
        
    //     // res.send(rows);
    // }
    // );
    var request = new sql.Request();
    request.stream = true;
    
    q = 'select * from  [MMS_PT2].[dbo].[CUSTOMER]';
    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });
    
    var result = [];
    // request.on('error', function(err){
    //     console.log(err); 
    // })
    request.on('row', (row) => {
        result.push(row)
    })
        .on
        ('done', () => { // 마지막에 실행되는 부분
            console.log('result :', result);
            res.send(result);

        });
 
});
app.listen(port,()=>console.log(`Listening on port ${port}`));