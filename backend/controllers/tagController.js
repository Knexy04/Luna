import TagSchema from "../models/tag.js";

const errorMSG = 'Произошла ошибка!'


export default class tagController {
    static createTag = async (req, res) => {
        try {
            const check = await TagSchema.findOne({name: req.body.name})

            if (check) {
                return res.status(400).json({message: "Этот тег уже существует"})
            }

            const data = await new TagSchema({name: req.body.name})
            await data.save()

            res.json(data)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }

    static getTag = async (req, res) => {
        try {
            const tag = await TagSchema.findById(req.query._id)

            if (!tag) {
                const tags = await TagSchema.find()
                return res.json(tags)
            }

            return res.status(200).json(tag)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }
}
