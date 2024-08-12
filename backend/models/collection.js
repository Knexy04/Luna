import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    name: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    photo: {
        type: String,
        default: ""
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Collection", CollectionSchema);
