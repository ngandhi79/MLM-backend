let mong=require("mongoose");
let emptab=mong.Schema({
    name: {type:String},
    email: {type:String},
    pass:{type:String},
    mobile:{type:String},
    userId:{type: Number},
    parentId:{type: Number},
    amount:{type: Number}
});
module.exports=mong.model("user",emptab);   



