import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// mock一个get请求接口
app.get('/api/get', (req, res) => {
    res.json(
        {
            code: 200,
            msg: 'success',
            data: 'get'
        }
    );
});

// mock一个post请求接口
app.post('/api/post', (req, res) => {
    const {name,age} = req.body;
    console.log(name,age);
    res.json(
        {
            code: 200,
            msg: 'success',
            data: {
                name,
                age
            }
        }
    );
});

// mock一个get失败的接口
app.get('/api/error', (req, res) => {
    res.body.code = 500;
    res.json(
        {
            code: 500,
            msg: 'fail'
        }
    );
});

// mock一个put请求接口
app.put('/api/test', (req, res) => {
    res.json({data: 'hello world'});
});

// mock一个delete请求接口
app.delete('/api/test', (req, res) => {
    res.json({data: 'hello world'});
});

// mock一个patch请求接口
app.patch('/api/test', (req, res) => {
    res.json({data: 'hello world'});
});

// mock一个options请求接口
app.options('/api/test', (req, res) => {
    res.json({data: 'hello world'});
});

// mock一个head请求接口
app.head('/api/test', (req, res) => {
    res.json({data: 'hello world'});
});

app.listen(7777, () => {
    console.info('Example app listening on port 3000!');
});
