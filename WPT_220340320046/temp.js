
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'hrushimore',
    password: 'cdac',
    database: 'wpt',
	port:3306
});
const bodyParser = require('body-parser');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not


app.get("/findelement",(req,resp)=>{
let id=req.query.id;
let ip={status:false,con:{bookid:"",bookname:"",price:""}};
	con.query('select bookname,price from book where bookid=?',[id],
(err,arr)=>{
   if(err){
       console.log("Error");
   }
   else{
       if(arr.length>0){
           console.log(arr);
		   ip.status=true;
		   ip.con=arr[0];
       }
       else{
           console.log("Failed");
       }
   }
   resp.send(ip);
});
});

app.get("/update",(req,resp)=>{

	let id=req.query.id;
let name1=req.query.name;
let price=req.query.price;
let ip={status:false};
con.query('update book set bookname=?,price=? where bookid=?',[name1,price,id],
(err,arr)=>{
   if(err){
       console.log("Something Went Wrong");
   }
   else{
       if(arr.affectedRows>0){
           console.log("success");
		   ip.status=true;
       }
       else{
           console.log("Failed");
       }
   }
   resp.send(ip);
});
});



app.listen(8081, function () {
    console.log("server listening at port 8081...");
});