import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: String,
    engName: String,
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    }],
    disabled: {
        type:Boolean,
        default: false
    }
})

export default mongoose.model("Category", CategorySchema);
