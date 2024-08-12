import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }],
        photos: [String],
        disabled: {
            type: Boolean,
            default: false
        },
        text: String
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Blog", BlogSchema);