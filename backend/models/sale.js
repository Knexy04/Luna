import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
    name: String,
    subtitle: String,
    start: Date,
    end: Date,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    photo: String,
    disabled: {
        type:Boolean,
        default: false
    }
})

export default mongoose.model("Sale", SaleSchema);
