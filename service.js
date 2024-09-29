let usrec=require("./model/user");
let bct=require("bcryptjs");
let jwt=require("jsonwebtoken");
exports.ser_register = async (req,res) => {
    const emai=req.body.email;
   const pas=req.body.pass;
    const mob=req.body.mobile;
    const na=req.body.name;
    const amt=req.body.amount;
   const hp=await bct.hash(pas,10);
   const existingUser = await usrec.findOne({ email: emai });
   if (existingUser) 
    {
       return { success: false};
   }
   // Checking if it's the first user
   data=await usrec.find();
   if(data.length==0){
     uid=1;
     pid=1;
     let rec=new usrec({name:na,pass:hp,mobile:mob,email:emai,userId:uid,parentId:pid});
    
    await rec.save();
   
     return { success: true};
}
else{
    uid=data.length+1;
    pid=req.user.userId;
     let rec=new usrec({name:na,pass:hp,mobile:mob,email:emai,userId:uid,parentId:pid,amount:amt});
    
    await rec.save();
   
     return { success: true};

}
}
exports.ser_login=async(req,res)=>{
   const emai=req.body.email;
   const pas=req.body.pass;
    let data=await usrec.findOne({email:emai});
    if(!data){
        return {success: false};
    }
   const hhp=data.pass;
   const v=await bct.compare(pas,hhp);
    if(v){
        console.log("mail before "+data.email);
        let token=jwt.sign({tokemail:data.email},"aabb");
        res.cookie('emtoken', token);
        console.log("send token"+token);
        return { success: true };
    }
    else{
        return { success: false};
}
}

exports.ser_logout=async(req,res)=>{
    const user = req.user;
    await usrec.deleteOne({email: user.email});
    res.clearCookie('emtoken', "");
    res.redirect("/login");
}

    exports.ser_profile = (req, res) => {
        const user = req.user;
        res.render("adminprofile", {user});
        
    };

    exports.ser_updateProfile=async(req,res)=>{
        name = req.body.name;
        mobile = req.body.mobile;
        udata=await usrec.findOneAndUpdate({},{});
        if(udata)   
        await user.save();
        res.render("profileupdate");
    }
    

    exports.ser_view=async (req,res)=>
    {
        console.log("pahuch gya2");
        id=req.user.userId;
        rec=await usrec.find({parentId:id});
       // console.log(rec); 
             if (rec.length > 0) {
                return { success: true, record: rec };
            } else {
                return { success: false, record: [] };
            }
    }

    exports.ser_deposit=async(req,res)=>
    {
        const amount =req.body.amount;

        if(amount<=0)
        {
            return{success:false};
        }
        const user=req.user;
        user.balance=user.balance + amount;
        await user.save();

        return {success:true,balance:user.balance};

    }
