const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

// image라는 이름의 경로로 접근을 하는데 실제 서버의 upload 폴더와 매핑이 됨
app.use('/image', express.static('./upload'));

// post 방식으로 경로에 사용자가 고객추가 데이터를 전송했을 때 처리
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename; // multer 라이브러리가 자동으로 겹치지않는 이름 핟당
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];

    connection.query(sql, params, 
        // 성공적으로 입력이 되었다면 관련 메시지를 client에게 출력
        (err, rows, fields) => {
            res.send(rows);
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));