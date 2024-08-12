import mongoose from "mongoose";
import Item from "./item.js";
import OrderStatus from "./orderStatus.js";

const OrderSchema = new mongoose.Schema({
        items: [{
            type: mongoose.Types.ObjectId,
            ref: Item
        }],
        status: [{
            type: mongoose.Types.ObjectId,
            ref: OrderStatus
        }],
        date: Date,
        price: Number,
        delivery: String,
        payment: String,
        paid: String,
        addres: String,
        track: String,
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Order", OrderSchema);