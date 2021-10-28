const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.a85bo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('CRUD_0');
        const productCollection = database.collection('products');

        //GET ALL PRODUCTS API 
        app.get('/productlist', async (req, res) => {
            const cursor = productCollection.find({});
            const count = await cursor.count();
            const page = req.query.page;
            const size = parseInt(req.query.size);
            let products;
            if (page) {
                products = await cursor.skip(page * size).limit(size).toArray();
            } else {
                products = await cursor.toArray();

            }
            res.send({
                count,
                products
            });
        });
        //ADD NEW PRODUCT API
        app.post('/productlist', async (req, res) => {
            const product = req.body;
            const insertToDb = await productCollection.insertOne(product);
            res.json(insertToDb);
        });
        // UPDATE PRODUCT WORKS
        // GETTING THE PRODUCT FOR UPDATE
        app.get('/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await productCollection.findOne(query);
            res.send(user);
        });
        //UPDATE API
        app.put('/update/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const updatedProduct = req.body;
            console.log(updatedProduct);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    productname: updatedProduct.productname,
                    price: updatedProduct.price,
                    quantity: updatedProduct.quantity,
                    unit: updatedProduct.unit
                }
            };
            const result = await productCollection.updateOne(filter, updateDoc, options);
            res.json(result);

        })
        //DELETE API 
        app.delete('/productlist/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.json(result);
        });
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running mern-crud0');
})

app.listen(port, () => {
    console.log('merncrud0 on port', port);
})