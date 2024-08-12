import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory"
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand"
        },
        tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }],
        photos: [String],
        price: [Number],
        sale: Boolean,
        capacity: String,
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
        stock: Number,
        sold: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Item", ItemSchema);