const mongodb=require('mongodb')
const MongClient=mongodb.MongoClient;

let _db;

const mongoConnect=(callback)=>{
  MongClient.connect('mongodb+srv://bipinsingh:bipinsingh@cluster0.muz4szn.mongodb.net/Shop?retryWrites=true&w=majority')
.then(client=>{
  console.log("Connected to the database")
  callback(client)
  _db=client.db();
})
.catch(err=>{
  throw err
})
}
function getDb(){
  if(_db){
    return _db
  }
  throw "No Database Found"
}
exports.mongoConnect=mongoConnect;
exports.getDb=getDb
