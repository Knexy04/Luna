import mongoose from "mongoose";

const FacesCategorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        photo: String,
        items:  [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }],
        disabled: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("FacesCategory", FacesCategorySchema);