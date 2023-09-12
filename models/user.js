const Sequelize = require('sequelize');
const getDb=require('../util/database').getDb;
const mongoDb=require('mongodb')


class User{
  constructor(name,email,cart,id){
    this.name=name
    this.email=email
    this.cart=cart;
    this._id=id
    
  }

  save(){
    const db=getDb();

    return db.collection('users').insertOne(this)
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  addToCart(product){
    const cartProduct=this.cart.items.findIndex(cp=>cp.productId.toString()===product._id.toString())
    const db=getDb();
    if(cartProduct>=0){
       
       const product=this.cart.items[cartProduct]
       product.quantity=parseInt(product.quantity)+1
       this.cart.items[cartProduct]=product;
       
      }
    else{
      this.cart.items.push({productId:new mongoDb.ObjectId(product._id),quantity:1})
    
    }
    return db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},
      {$set:{cart:this.cart}})   
  }

  static findById(userId){
    const db=getDb();
    return db.collection('users').findOne({_id:new mongoDb.ObjectId(userId)})
    .then(result=>{
      //console.log(result)
      return result
    })
    .catch(err=>{
      console.log(err)
    })
  }


}



module.exports = User;
