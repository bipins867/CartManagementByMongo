const Sequelize = require('sequelize');
const getDb=require('../util/database').getDb;
const mongoDb=require('mongodb')


class User{
  constructor(name,email){
    this.name=name
    this.email=email
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
