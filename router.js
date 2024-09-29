let express=require ("express");
let router=express.Router();
let auth=require("./midware/my_auth");
let {cont_view,cont_register,cont_login,cont_showregister,cont_showlogin,cont_logout, cont_profile,cont_updateProfile,cont_showupdate_profile}=require("./controller");
router.get("/register",cont_showregister);
router.post("/register",auth,cont_register);
router.post("/login",cont_login);
router.get("/login",cont_showlogin);
router.get("/logout",auth,cont_logout);
router.get("/profile",auth,cont_profile);
router.get("/update_profile",auth,cont_updateProfile);
router.post("/update_profile",auth,cont_showupdate_profile)
router.get("/userview",auth,cont_view);
module.exports=router;