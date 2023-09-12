const { get } = require('../routes/admin')
const mongoDb=require('mongodb')
const getDb=require('../util/database').getDb

class Product{
  constructor(title,price,description,imageUrl,id){
    this.title=title
    this.price=price
    this.description=description
    this.imageUrl=imageUrl
    this._id=id
  }
  save(){
    const db=getDb();
    let dbOp;
    if(this._id){
      const obj={title:this.title,price:this.price,description:this.description,imageUrl:this.imageUrl}

      dbOp=db.collection('products').updateOne({_id:new mongoDb.ObjectId(this._id)},{$set:this})
    }
    else{
      dbOp=db.collection('products').insertOne(this);
    }
    return dbOp
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static fetchAll(){
    const db=getDb();
    return db.collection('products').find().toArray()
    .then(product=>{
      
      return product;
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static findById(productId){
    const db=getDb();
    
    return db.collection('products').find({_id:new mongoDb.ObjectId(productId)}).next()
    .then(product=>{
      //console.log(product)
      return product
    })
    .catch(err=>{
      console.log("Something went wrong")
      //console.log(err)
    })

  }
  static deleteProduct(productId){
    const db=getDb();

    return db.collection('products').deleteOne({_id:new mongoDb.ObjectId(productId)})
    .then(product=>{
      console.log(product)
      return product
    })
    .catch(err=>{
      console.log(err)
    })
  }
}


module.exports = Product;
