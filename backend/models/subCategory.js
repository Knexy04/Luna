import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    disabled: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("SubCategory", SubCategorySchema);
