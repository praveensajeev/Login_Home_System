var express=require('express');
const res = require('express/lib/response');
var router=express.Router();
const credential={
    email:"admin@gmail.com",
    password:"123"
}
//login user............
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password ){
       if( req.session.user=req.body.email){
        res.redirect('/route/dashboard')
       }
        
        // res.end('login successfull');
        
    }if(req.session.user!=req.body.email){
        if(req.body.email=="" || req.body.password==""){
            res.render("base",{message:"Email and password must not be empty"})
        }else{
            res.render("base",{message:"Invalid Email"})
        }
    }if(req.session.user!=req.body.password){
        res.render("base",{message:"Invalid password"})
    }
});

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render('base')
    }
})
//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            res.send('error');
        }else{
             res.render('base',{logout:'Logout successfully...!!'})
        }
    })
})
module.exports=router
