var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const favoriteSchema=new Schema({    
    dishes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Dish'
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

module.exports=mongoose.model('Favorite',favoriteSchema);

