const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

var config = {
    server: conf.server,
    options: { encrypt: false, database: conf.database },
    authentication: {
        type: "default",
        options: {
            userName: conf.userName,
            password: conf.password
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
sql.connect(config, function (err) {
    if (err) {
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료')
})

const multer = require('multer');
const upload = multer({dest:'./upload'})


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

    q = 'select * from  [MMS_PT2].[dbo].[CUSTOMER] WHERE ISDELETED = 0';
    request.query(q, (err, recordset) => {
        if (err) {
            return console.log('query error :', err)
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
            // console.log('result :', result);
            res.send(result);

        });

});

// 사용자 입장에서 image이름 경로 접근 하지만 실제는 서버의 upload 경로로 맵핑
app.use('/image',express.static('./upload'));

app.post('/api/customers', upload.single('image'),(req, res)=>{
   
    let image = 'http://localhost:5000/image/' + req.file.filename;
   
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];

    image = "'"+image+"'";
    name = "'"+name+"'";
    birthday = "'"+birthday+"'";
    gender = "'"+gender+"'";
    job = "'"+job+"'";

    // console.log(name);
    console.log(image);
    // console.log(birthday);
    // console.log(gender);
    // console.log(job);

    
    var request = new sql.Request();
    request.stream = true;
    // sql.input('input_name',name, value)
    var ss ="Insert INTO [MMS_PT2].[dbo].[CUSTOMER] VALUES("+image+","+ name +","+birthday+","+gender+","+job+", GETDATE(), 0)";
    request.query(ss, (err, recordset) => {
        if(err){
            consnole.log('query error :', err)
        }
        else{
            console.log('insert 완료')
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
            // console.log('result :', result);
            res.send(result);

        });
})

app.delete('/api/customers/:id',(req,res)=>{
    let sss = 'UPDATE [MMS_PT2].[dbo].[CUSTOMER]  SET ISDELETED=1 WHERE ID= '+ req.params.id;
    console.log('result :', req.params.id);
    var request = new sql.Request();
    request.query(sss, (err, recordset) => {
        if(err){
            consnole.log('query error :', err)
        }
        else{
            console.log('insert 완료')
        }
    });
    
    var result = [];

    request.on('row', (row) => {
        result.push(row)
    })
        .on
        ('done', () => { // 마지막에 실행되는 부분
       
            res.send(result);

        });
});
app.listen(port, () => console.log(`Listening on port ${port}`));