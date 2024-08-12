import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema({
        code: String,
        active: Boolean,
        sale: Number,
        min: Number,
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Promo", PromoSchema);