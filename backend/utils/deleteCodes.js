import PhoneCodes from "../models/phoneCodes.js";

export const deleteCodes = async(req,res) => {
    try {
        const now = new Date()
        const fiveMin = new Date(now - 5 * 60 * 1000)

        const codes = await PhoneCodes.find()

        if (!codes) {
            return res.status(200).json({message: "Удалять нечего"})
        }

        const updated = await PhoneCodes.deleteMany({ updatedAt: { $lt: fiveMin } });
        console.log(updated)
        res.status(200).json(updated)
    } catch (e) {
        res.status(500).json({error: e, message: "Возникла ошибка!"})
    }
}