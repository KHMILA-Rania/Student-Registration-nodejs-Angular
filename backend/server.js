const express = require('express');
const server= express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors=require('cors');
server.use(bodyParser.json());
//db cnx
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'dbschool'

});
//check cnx
server.use(cors());
db.connect(function(error) {
    if(error) {
        console.log("error connecting");
    }
    else console.log("connection established");
});
//port

server.listen(8088,function(error) {
    if(error) console.log("error ...!");
    else console.log("started listening on post 4200");
});



//create record
server.post("/api/student/add",(req,res)=>{
    let details={
        stname:req.body.stname,
        course: req.body.course,
        fee: req.body.fee
    };
    let sql="INSERT INTO student SET ?";
   

    db.query(sql,details,(error)=>{
    if(error){
        res.send({stats:false,message:"failed"});
        console.log("error inserting student ",error);
    }
    else{
        res.send({stats:true,message:"student created successfully"});
    }
});
});


//view record
server.get("/api/student" , (req,res)=>{
    var sql="SELECT * FROM student";
    db.query(sql,function(error,result){
        if(error){console.log("eroor connceting to db ");}
        else{
            res.send({stats:true,data:result});
        }
    });
})

//search for rcords 
server.get("/api/student/:id",function(req,res){
    var studentid=req.params.id;
    var sql="SELECT * FROM student where id="+studentid;
    db.query(sql,function(error,result){
        if(error){console.log("erroe connecting to db ");}
        else{res.send({stats:true,data:result});}
    });
});

//update records 
server.put("/api/student/update/:id",function(req,res){
    let sql="update student set stname='"+
    req.body.stname+
    "' , course='"+req.body.course+"' , fee='"+req.body.fee+
    "' where id="+req.params.id;

    let query =db.query (sql,(error,result)=>{
        if(error){res.send({stats:false,message:"eroor"+error.message});}
        else
        res.send ({status:true,message:"student updated"});
        

});
});

//delete record
server.delete("/api/student/delete/:id",function(req,res){
    let sql="delete from student where id="+req.params.id+"";
    let query = db.query (sql,(error,result)=>{
        if(error){res.send({status:false , message:"error "})}
        else {res.send({status:true, message:"student deleted"});}
    });
});
