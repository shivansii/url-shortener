const express=require('express');
const mysql=require("mysql2")
const port=process.env.PORT || 5000;
const randomstring=require("randomstring")
const app = express();

 app.use(express.json());
 app.use(express.urlencoded());

 const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"urlshortener"
 })
 con.connect(err=>{
    if(err){
        console.log(err)
        return
    }

    // con.query("CREATE TABLE URLs ( random varchar(5) PRIMARY KEY NOT NULL, url varchar(1000) NOT NULL );",
    // (err)=>{
    //     if(err)
    //     console.log(err)
    // })
    // /expand?k=abcdef : https://google.com
    // con.query("CREATE DATABASE urlshortener",(err)=>{
    //     if(err){
    //         console.log(err)
    //         return
    //     }
    //     console.log("Created database")
    // })
    // console.log("SQL database started")


})
 // API routes
 app.get('/url-shortener',(req,res)=>{
 res.sendFile(__dirname + '/shorturl.html');

})
//fhCoX
app.get("/expand",(req,res)=>{
const key=req.query.k
con.query(`SELECT url FROM URLs WHERE random="${key}";`,(err,result)=>{
    if(err){
    console.log(err)
    return
    }
    url=result[0].url
    console.log(url)
    res.redirect(url)
})
})


app.post('/formPost',(req,res)=>{
    const url=req.body.url
    const randomkey=randomstring.generate(5)
    console.log(randomkey,url)
    con.query(`INSERT INTO URLs(random,url) VALUES ("${randomkey}","${url}")`,(err)=>{
        if(err)
        console.log(err)
    })
    res.send({"shortned_url":"http://localhost:5000/expand?k="+randomkey})

    //localhost:5000/expand?k=randomkey

})
app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`)

}); 