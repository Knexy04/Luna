import mongoose from "mongoose";

const OrderStatusSchema = new mongoose.Schema({
        statusName: String,
        date: Date,
    },
    {
        timestamps: true
    }
)

export default mongoose.model("OrderStatus", OrderStatusSchema);