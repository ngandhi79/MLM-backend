let {ser_register,ser_login,ser_logout,ser_profile,ser_view,ser_updateProfile} = require('./service');
exports.cont_showregister = (req,res) => {
     res.render("register.ejs",{mssg:"Enter your details"});
    }

    exports.cont_register =async (req, res) => {
     a=await ser_register(req,res);
     if (a.success){
      
      res.redirect("/login");
  }  
  else {
      res.render("register.ejs", {mssg:"Email already registered"});
  }
    }
    exports.cont_login=async(req,res)=>{
      const result=await ser_login(req,res);
      if (result.success) {
        res.render("dashboard.ejs");
    } else {
        res.render("adminlogin.ejs");
    }
    }

    exports.cont_showlogin = (req, res) => {
    res.render("adminlogin.ejs");
   }

exports.cont_logout=(req,res)=>{
  ser_logout(req,res);
   }

exports.cont_profile=(req,res)=>{
  ser_profile(req,res);
 }
exports.cont_updateProfile=(req,res)=>{
  ser_updateProfile(req,res);
}
exports.cont_showupdate_profile=(req,res)=>{
  res.render("profileupdate");
}

exports.cont_view=async (req,res)=>
{
  console.log("pahuch gya 1");
 allchilddata=await ser_view(req,res);         
 if (allchilddata.success) {
  //console.log(allchilddata.record);
  res.render("viewuser", { usersdata: allchilddata.record });
} else {
  res.render("viewuser", { user: [] }); 
}
}


    
     


