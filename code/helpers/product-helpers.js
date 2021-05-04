var db=require('../config/connection')
var collection=require('../config/collection')
var objectId=require('mongodb').ObjectID
//const { response } = require('../app')
const { response } = require('express')
const { disable } = require('../app')
module.exports={

    addProduct:(product,callback)=>{
       
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
            callback(data.ops[0]._id)

        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let prodcuts=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(prodcuts)
        })
               

    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            console.log(prodId)
            //console.log(objectId(prodId))
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(prodId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Descrption:proDetails.Descrption,
                    Price:proDetails.Price,
                    Category:proDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}