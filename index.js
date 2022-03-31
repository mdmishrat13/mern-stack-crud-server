const express = require('express');
const cors = require('cors');
const { json } = require('express/lib/response');
const port = process.env.PORT || 5000;
const app = express();

const users=[
    {
    "id":0,
    "name":"md mishrat",
    "email":"mdmishrat13@gmail.com"
    },
    {
    "id":1,
    "name":"md mishrat",
    "email":"mdmishrat13@gmail.com"
    },
    {
    "id":2,
    "name":"md mishrat",
    "email":"mdmishrat13@gmail.com"
    },
    {
    "id":3,
    "name":"md mishrat",
    "email":"mdmishrat13@gmail.com"
    },
    {
    "id":3,
    "name":"md mishrat",
    "email":"mdmishrat13@gmail.com"
    }
]

app.use(cors());
app.use(express.json())

app.get('/users',(req,res)=>{
    res.send(users)
})

app.post('/users',(req,res)=>{
    const newUser= req.body;
    newUser.id = users.length;
    users.push(newUser);
    res.json(newUser)
})

app.listen(port,()=>{
    console.log('listening port ',port)
})