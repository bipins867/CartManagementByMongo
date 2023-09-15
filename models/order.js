const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const OrderSchema=new Schema({
  userId:{
    type:Schema.Types.ObjectId,
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


module.exports=mongoose.model('Order',OrderSchema)