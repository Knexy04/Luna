import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    item: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Item"
    },
})
export default mongoose.model("Review", ReviewSchema);