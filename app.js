var express = require("express");
var path = require("path");
var app = express();

app.use(express.static("public"));

app.get("*",function(req,res){
    res.render("index.ejs");
    //res.sendFile(path.join(__dirname +"/index.html"));
});

app.listen(3000, function(){
    console.log("server has started")
});