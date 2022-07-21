const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app= express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.set('view engine' , 'ejs')

mongoose.connect('mongodb+srv://admin-aryan:aryanok@cluster0.l8az8xd.mongodb.net/bankDB?retryWrites=true&w=majority' , {useNewUrlParser: true});

const customerSchema = new mongoose.Schema({
    name : String,
    email : String,
    currBal : Number,
})
const customer = mongoose.model("Customer" , customerSchema)


app.get("/" , function (req , res){
    res.render("index")
    
     
})

app.get("/customers" ,function(req , res){
   customer.find({} , function (err , customers) {
        if(err){
            console.log(err)
        }else{
            console.log(customers)
            res.render("customers" ,{
                customers:customers
            })
        }
   })
})
app.get("/customers/:Id" , function(req, res){
    const customerId = req.params.Id;
    

    
    customer.findOne({_id:customerId}, function(err , customer){
        res.render("transfer", {
            customer:customer

        })
    })
    
})



app.listen(3000 , function (req , res) {
    console.log("server running on port 3000")
})