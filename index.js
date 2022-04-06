const express = require('express');
const cors = require('cors');
const { json } = require('express/lib/response');
const port = process.env.PORT || 5000;
const app = express();
const {MongoClient}= require('mongodb');
const ObjectId = require('mongodb').ObjectId


app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://Mdmishrat13:MdLikhon@cluster0.fkofk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect()
        const database = client.db('crudApp');
        const userCollection= database.collection("users")

        app.post('/users',async(req,res)=>{
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser)
            res.json(result)
        });

        app.get('/users',async(req,res)=>{
            const cursor = userCollection.find({})
            const users = await cursor.toArray()
            res.json(users)
        });
        app.delete('/users/:id',async(req,res)=>{
            const id= req.params.id;
            const quary = { _id:ObjectId(id)}
            const result = await userCollection.deleteOne(quary);
            res.json(result)
        })
        app.get('/users/:id',async(req,res)=>{
            const id = req.params.id;
            const quary = {_id:ObjectId(id)}
            const user = await userCollection.findOne(quary)
            res.json(user)

        })
        app.put('/users/:id',async(req,res)=>{
           const id = req.params.id;
           const updatedUser= req.body;
           const search = {_id:ObjectId(id)};
           const options = {upsert:false}
           const updateDoc = {
               $set:{
                   name:updatedUser.name,
                   email:updatedUser.email
               }
           };
           const result = await userCollection.updateOne(search,updateDoc,options)
           res.json(result)
        })
    }
    finally{
        // await client.close()
    }
}

run().catch(console.dir)
    
app.listen(port,()=>{
    console.log('listening port ',port)
})