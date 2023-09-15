const mongoose=require('mongoose')
const Order=require('../models/order')
const Product=require('../models/product')
const Schema=mongoose.Schema;

const UserSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  cart:{
    items:[
      {
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
        quantity:{type:Number,required:true}
      }
    ],
   
  },
  
})

UserSchema.methods.addToCart=function(product){
  
    const cartProduct=this.cart.items.findIndex(cp=>cp.productId.toString()===product._id.toString())
    if(cartProduct>=0){
       
       const product=this.cart.items[cartProduct]
       product.quantity=parseInt(product.quantity)+1
       this.cart.items[cartProduct]=product;
       
      }
    else{
      this.cart.items.push({productId:product._id,quantity:1})
    
    }
    
    return this.save();
  
}

UserSchema.methods.deleteFromCart=function(productId){
  const products=this.cart.items.filter(prod=>prod.productId.toString()!=productId.toString())
  this.cart.items=products
  return this.save();
}


UserSchema.methods.addOrders=function(){
      
      return Order.create({cart :this.cart,userId:this._id})
      .then(result=>{
        this.cart.items=[]
        return this.save();
      })
      .then(result=>{
        console.log("Added Cart Items to the Order")
      })
      .catch(err=>{
        console.log(err)
      })
      
      
    }

UserSchema.methods.getOrders=function(){
 
  
    return Order.find({userId:this._id})
    .then(async orders=>{
      const userOrders=[]

      for(const order of orders){
          const products=[]

          for(const prod of order.cart.items){
            
            const p=await Product.findById(prod.productId)
            
            const x={title:p.title,quantity:prod.quantity}
            //console.log(x)
            products.push(x)
          }
          userOrders.push({products:products,id:order._id})
      }

      return userOrders
    })
    .catch(err=>{
      console.log(err)
    })
}
module.exports=mongoose.model('User',UserSchema)


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

//   deleteFromCart(productId){
//     const db=getDb();
//     const products=this.cart.items.filter(prod=>prod.productId.toString()!=productId.toString())
    
//     return db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},
//     {$set:{cart:{items:products}}})   
    
//   }

//   static findById(userId){
//     const db=getDb();
//     return db.collection('users').findOne({_id:new mongoDb.ObjectId(userId)})
//     .then(result=>{
//       //console.log(result)
//       return result
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//   }


// }
