import mongoose from "mongoose";
import Item from "./item.js";
import Order from "./order.js";

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    passwordHash: String,
    email: String,
    city: String,
    address: String,
    favourite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Item
    }],
    seen: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Item
        }
    }],
    search: [String],
    role: {
        type: String,
        default: "User"
    },
    cart: [{
        item: {
            type: mongoose.Types.ObjectId,
            ref: Item
        }, quantity: {
            type: Number,
            default: 1
        }
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: Order
    }],
    bought: [{
        type: mongoose.Types.ObjectId,
        ref: Item
    }],
    disabled: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model("User", UserSchema);
