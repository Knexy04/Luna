import mongoose from "mongoose";

const ShowcaseSchema = new mongoose.Schema({
    name: String,
    description: String,
    link: String,
    photo: String,
    disabled: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Showcase", ShowcaseSchema);
