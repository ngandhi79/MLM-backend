let mong=require("mongoose");
exports.conDB=()=>
{
    mong.connect("mongodb://localhost:27017/record");
    console.log("database is connected");
}