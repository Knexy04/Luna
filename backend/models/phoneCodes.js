import mongoose from "mongoose";

const PhoneCodes = new mongoose.Schema({
        phoneNumber: String,
        randomCode: Number
    }, {timestamps: true}
)

export default mongoose.model("PhoneCode", PhoneCodes);
