const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let customers = [{
    "customerId": "1",
    "customerName": "vasanth",
    "customerPh": 8939008989,
    "location": "chennai",
    "address": "yyy"
},
{
    "customerId": "2",
    "customerName": "karthika",
    "customerPh": 8939565657,
    "location": "cuddalore",
    "address": "zzz"
},
{
    "customerId": "3",
    "customerName": "yamini",
    "customerPh": 893897656,
    "location": "ponneri",
    "address": "yyyzzz"
}];
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/customer', (req,res) => {
    const customer = req.body;
    console.log(customer);
    customers.push(customer);
    res.send("customer is added to the database");
});

app.get('/customer', (req,res) => {
  res.json(customers);
});

app.get('/customer/:customerId', (req,res)=>{
    //reading isbn from the url 
    const customerId = req.params.customerId;
    //searching books for the isbn
   for(let customer of customers){
       if(customer.customerId === customerId){
           res.json(customer);
           return;
       }
   }

   res.status(404).send("customer not found");
});

app.put('/customer/:customerId', (req,res)=>{
    const customerId = req.params.customerId;
    const newCustomer = req.body;

    for(let i =0; i<customers.length;i++){
        let customer = customers[i];

        if(customer.customerId === customerId) {
            customers[i]=newCustomer;
        }
    }
    res.send("customer is edited");
});

app.delete('/customer/:customerId', (req,res)=>{
    const customerId = req.params.customerId;
    customers = customers.filter(i =>{
        if(i.customerId !== customerId){
            return true;
        }
        return false;
    });
    res.send("customer is deleted");
})
app.listen(port, ()=>console.log(`Hello World listening on port ${port}!`));