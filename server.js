const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const session=require('express-session');


const{v4:uuidv4}=require('uuid');
const router=require('./router')
const app=express();


const port=process.env.PORT||3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','hbs') 
app.use((req,res,next)=>{
    if(!req.user){
        res.header('cache-control','private,no-cache,no-store,must revalidate')
        res.header('Express','-1')
        res.header('paragrm','no-cache')
      
    }
    next();
})
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router)
//home route
app.get('/',(req,res)=>{
    if(req.session.user){
        res.render("dashboard",{user:req.session.user})
    }else{
        res.render('base',{title:'log-in system'})
    }
    
}) 

app.listen(port,()=>{console.log('Running the server at http://localhost:3000')});