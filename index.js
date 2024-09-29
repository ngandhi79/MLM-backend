let express=require("express");
let app=express();
app.use(express.urlencoded({extended:false}));
let cp=require("cookie-parser");
app.use(cp());
// let dotenv=require("dotenv");
let path=require("path");
let {conDB}=require("./dbconnection");
conDB();
let ejs=require("ejs");
app.set("view engine","ejs");
// dotenv.config();
app.use(express.static(path.join(__dirname, "/public")));

app.use("",require("./router"));
app.listen(2409,()=>
{
console.log("server connected at");
});
