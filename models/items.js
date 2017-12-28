// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the schema
var itemSchema = new Schema(
    {
        itemRef: {
            type: String,
            required: true,
            unique: true
        },
        location: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        note: {
            type: String,
            default: ""
        }
    }, {
        timestamps: true
    }
);

// Create the model
var Items = mongoose.model('Item', itemSchema);

// make this available to our Node applications
module.exports = Items;
