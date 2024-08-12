import SelectionSchema from "../models/selection.js";
import ItemSchema from "../models/item.js";

const errorMSG = 'Произошла ошибка!'

export default class selectionController {
    static addSelection = async (req, res) => {
        try {

            const check = await SelectionSchema.find({name: req.body.name})

            if (check) {
                return res.status(400).json({message: "Подборка уже существует"})
            }

            for (const item of req.body.items) {
                const checkItem = await ItemSchema.findById(item)

                if (!checkItem) {
                    res.status(404).json({message: "Товар не найден"});
                }
            }

            const fields = {
                name: req.body.name,
                subtitle: req.body.subtitle,
                items: req.body.items
            }

            const selection = await new SelectionSchema(fields)

            await selection.save()

            return res.json(selection)

        } catch (e) {
            console.log(e)
            res.status(500).json({error: e, message: errorMSG})
        }
    }

    static updateSelectionItems = async (req, res) => {
        try {

            const check = await SelectionSchema.findById(req.query._id)

            if (!check) {
                return res.status(400).json({message: "Подборки не существует"})
            }

            for (const item of req.body.items) {
                const checkItem = await ItemSchema.findById(item)

                if (!checkItem) {
                    res.status(404).json({message: "Товар не найден"});
                }

            }

            const selectionUpdated = await SelectionSchema.findByIdAndUpdate(req.query._id, {items: req.body.items}, {new: true})

            return res.status(200).json(selectionUpdated)

        } catch (e) {
            console.log(e)
            res.status(500).json({error: e, message: errorMSG})
        }
    }

    static getSelection = async (req, res) => {
        try {

            if (req.query._id) {
                const selection = await SelectionSchema.findById(req.query._id)
                    .populate('items')


                return res.status(200).json(selection)
            }

            const selections = await SelectionSchema.find()

            return res.status(200).json(selections)

        } catch (e) {
            console.log(e)
            res.status(500).json({error: e, message: errorMSG})
        }
    }

    static disableSelection = async (req, res) => {
        try {
            const check = await SelectionSchema.findById(req.query._id)

            if (!check) {
                return res.status(404).json({message: "Подборки не существует"})
            }

            const disabledSelection = await SelectionSchema.findByIdAndUpdate(req.query._id, {disabled: req.body.disable}, {new: true})

            return res.status(200).json(disabledSelection)
        } catch (e) {
            console.log(e)
            res.status(500).json({error: e, message: errorMSG})
        }
    }
}