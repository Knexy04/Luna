import mongoose from "mongoose";

const SelectionSchema = new mongoose.Schema({
    name: String,
    subtitle: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    disabled: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Selection", SelectionSchema);
