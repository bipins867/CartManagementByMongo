const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')


const errorController = require('./controllers/error');
const User=require('./models/user')
const Order=require('./models/order')

const app = express();
app.use((req,res,next)=>{
  User.findById('650420fd79092099e6564950')
  .then(user=>{
    req.user=user;
    //console.log("function",user)
    next();
  })
  .catch(err=>{
    console.log(err)
  })
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));





app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://bipinsingh:bipinsingh@cluster0.muz4szn.mongodb.net/Shop?retryWrites=true&w=majority')
.then(result=>{
    console.log("Listening for the client")
    // const user=new User({
    //   name:"Bipin Singh",
    //   email:"bipins867@gmail.com",
    //   cart:{
    //     items:[]
    //   }
    // })
    // user.save();
    app.listen(3000);
})
.catch(err=>{
  console.log(err)
})