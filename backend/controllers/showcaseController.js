import ShowcaseSchema from "../models/showcase.js";
export default class showcaseController {
    static #errorMsg = "Произошла ошибка!"

    static async createShowcase (req, res) {

        try{
            const check = await ShowcaseSchema.findOne({name: req.body.name})

            if(check) {
                return res.status(400).json({message: "Витрина уже существует"})
            }

            const fields = {
                name: req.body.name,
                description: req.body.description,
                link: req.body.link,
                photo: req.body.photo,
            }

            const showcase = await new ShowcaseSchema(fields)

            return res.json(showcase)

        } catch (e) {
            console.log(e)
            res.status(500).json({error: e, message: this.#errorMsg})
        }

    }

    static async getShowcase(req,res) {
        try {

            if(req.query._id) {
                const showcase = await ShowcaseSchema.findById(req.query._id)

                if(!showcase) return res.status(404).json({message: "Витрины не существует"})

                return res.status(200).json(showcase)
            }

            const showcases = await ShowcaseSchema.find()

            return res.status(200).json(showcases)

        } catch (e) {
            console.log(e)
            res.status(500).json({error: e, message: this.#errorMsg})
        }
    }

    static async disableShowcase (req, res) {

        try{
            const check = await ShowcaseSchema.findById(req.query._id)

            if(!check) {
                return res.status(400).json({message: "Витрины не существует"})
            }

            const showcase = await ShowcaseSchema.findByIdAndUpdate(req.query._id, {disabled: true})

            return res.json(showcase)

        } catch (e) {
            console.log(e)
            res.status(500).json({error: e, message: this.#errorMsg})
        }

    }
}