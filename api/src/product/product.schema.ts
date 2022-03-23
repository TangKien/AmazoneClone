import * as mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    name : {
        required:true,
        type: String
    },

    price : {
        required:true,
        type:Number
    },
    description: String
})