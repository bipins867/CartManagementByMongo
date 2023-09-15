const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')


const errorController = require('./controllers/error');
//const User=require('./models/user')


const app = express();
// app.use((req,res,next)=>{
//   User.findById('6500535d983c78d34ef40400')
//   .then(user=>{
//     req.user=new User(user.name,user.email,user.cart,user._id);
//     //console.log("function",user)
//     next();
//   })
//   .catch(err=>{
//     console.log(err)
//   })
// })

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
    app.listen(3000);
})
.catch(err=>{
  console.log(err)
})