const Sequelize = require('sequelize');
const getDb=require('../util/database').getDb;
const mongoDb=require('mongodb')
const Product=require('../models/product')




// class User{
//   constructor(name,email,cart,id){
//     this.name=name
//     this.email=email
//     this.cart=cart;
//     this._id=id
    
//   }

//   save(){
//     const db=getDb();

//     return db.collection('users').insertOne(this)
//     .then(result=>{
//       console.log(result)
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//   }

//   addToCart(product){
//     const cartProduct=this.cart.items.findIndex(cp=>cp.productId.toString()===product._id.toString())
//     const db=getDb();
//     if(cartProduct>=0){
       
//        const product=this.cart.items[cartProduct]
//        product.quantity=parseInt(product.quantity)+1
//        this.cart.items[cartProduct]=product;
       
//       }
//     else{
//       this.cart.items.push({productId:new mongoDb.ObjectId(product._id),quantity:1})
    
//     }
//     return db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},
//       {$set:{cart:this.cart}})   
//   }

//   addOrders(){
//     const db=getDb()

//     return db.collection("orders").insertOne({cart :this.cart,userId:new mongoDb.ObjectId(this._id)})
//     .then(result=>{
//       this.cart.items=[]
      
//       return db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},
//       {$set:{cart:this.cart}})
      
//     })
//     .then(result=>{
//       return result
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//   }
//   getOrders(){
//     const db=getDb();
    
//     return db.collection('orders').find({userId:new mongoDb.ObjectId(this._id)}).toArray()
//     .then(async orders=>{
//       const userOrders=[]

//       for(const order of orders){
//           const products=[]

//           for(const prod of order.cart.items){
            
//             const p=await Product.findById(prod.productId)
            
//             const x={title:p.title,quantity:prod.quantity}
//             console.log(x)
//             products.push(x)
//           }
//           userOrders.push({products:products,id:order._id})
//       }

//       return userOrders
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//   }

//   deleteFromCart(productId){
//     const db=getDb();
//     const products=this.cart.items.filter(prod=>prod.productId.toString()!=productId.toString())
    
//     return db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},
//     {$set:{cart:{items:products}}})   
    
//   }

//   static findById(userId){
//     const db=getDb();
//     return db.collection('users').find({_id:new mongoDb.ObjectId(userId)}).next()
//     .then(result=>{
//       console.log(result)
//       return result
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//   }


// }



// module.exports = User;
