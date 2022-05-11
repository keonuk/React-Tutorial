const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

app.get('/api/customers', (req, res) => {
    res.send([
        {
          'id' : '1',
          'image' : 'https://placeimg.com/64/64/1',
          'name' : '김철수',
          'birthday' : '921104',
          'gender' : '남자',
          'job' : '대학생'
        },
        {
          'id' : '2',
          'image' : 'https://placeimg.com/64/64/2',
          'name' : '홍길동',
          'birthday' : '111111',
          'gender' : '남자',
          'job' : '디자이너'
        },
        {
          'id' : '3',
          'image' : 'https://placeimg.com/64/64/3',
          'name' : '김길동',
          'birthday' : '222222',
          'gender' : '남자',
          'job' : '의사'
        },
      ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
