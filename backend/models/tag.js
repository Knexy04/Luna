import mongoose from "mongoose";
import Item from "./item.js";

const TagSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        items: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: Item
        }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Tag", TagSchema);