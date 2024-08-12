import CategorySchema from "../models/category.js";
import SubCategorySchema from "../models/subCategory.js";
import ItemSchema from "../models/item.js";
import * as trace_events from "trace_events";

const errorMSG = 'Произошла ошибка!'

export default class categoryController {

    static createCategory = async (req, res) => {
        try {

            const checkCategory = await CategorySchema.findOne({name: req.body.name})
            const checkSub = await SubCategorySchema.findOne({name: req.body.name})

            if (checkCategory || checkSub) {
                return res.status(400).json({message: "Данная категория уже существует"})
            }

            if (req.body.subcategory === true) {
                const check = await CategorySchema.findById(req.body.category)

                if (!check) {
                    return res.status(404).json({message: "Категория не найдена"})
                }

                const sub = await new SubCategorySchema({name: req.body.name, category: req.body.category})

                await sub.save()

                const categoryUpdate = await CategorySchema.findOneAndUpdate(
                    {_id: req.body.category},
                    {$push: {subcategories: sub._id}},
                );

                return res.status(200).json({sub, categoryUpdate})
            }
            const data = await new CategorySchema({name: req.body.name, engName: req.body.engName})

            await data.save()

            return res.status(200).json(data)

        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})

        }
    }

    static getCategories = async (req, res) => {
        try {

            if (req.query._id) {
                const category = req.query.sub === "false" ? await CategorySchema.findById(req.query._id).populate({
                    path: "subcategories",
                    populate: {
                        path: "items"
                    }
                }) : await SubCategorySchema.findById(req.query._id).populate('category').populate("items")

                if(!category) {
                    return res.status(404).json({message: "Категории не существует"})
                }

                return res.json(category)
            }

            const categories = req.query.sub === "false" ? await CategorySchema.find({ disabled: false }).populate('subcategories') : await SubCategorySchema.find().populate('category')

            return res.json(categories)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }

    static getAllSubCategories = async (req, res) => {
        try {
            const subCategories = await SubCategorySchema.find().populate('category');
    
            return res.json(subCategories);
    
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: e.message, message: "Ошибка при получении подкатегорий" });
        }
    };
    

    static getAllCategories = async (req, res) => {
        try {
            const categories = await CategorySchema.find().populate({
                path: 'subcategories',
                populate: {
                    path: 'items'
                }
            });
            return res.json(categories);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }
    
    static getCategoryAndSubcategoriesById = async (req, res) => {
        try {
            const category = await CategorySchema.findById(req.query.id).populate({
                path: "subcategories",
                populate: {
                    path: "items"
                }
            });
    
            if (!category) {
                return res.status(404).json({ message: "Категории не существует" });
            }
    
            return res.json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static deleteCategory = async (req, res) => {
        try {
            console.log(req.query.sub, req.query._id)
            if (req.query.sub === "true") {
                const subCategory = await SubCategorySchema.findByIdAndUpdate(req.query._id, {disabled: true})
                console.log(req.query._id)
                if (subCategory) {
                    // const category = await CategorySchema.findOne({subcategories: req.query._id});
                    // if (category) {
                    //     category.subcategories.pull(req.query._id);
                    //     await category.save();
                    // }
                    // const items = await CategorySchema.find({category: req.query._id});
                    // if (items) {
                    //     await ItemSchema.updateMany({category: req.query._id}, {$pull: {category: req.query._id}}, {new: true})
                    // }
                } else {
                    return res.status(404).json({message: "Категории не существует"})
                }
            } else {
                const category = await CategorySchema.findByIdAndUpdate(req.query._id, {disabled: true})
                if (category) {
                    await SubCategorySchema.updateMany({categories: req.query._id}, {disabled: true});
                } else {
                    return res.status(404).json({message: "Категории не существует"})
                }
            }

            return res.status(200).json({message: 'Категория успешно удалена'});
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }

    static enableCategory = async (req, res) => {
        try {
            console.log(req.query.sub, req.query._id)
            if (req.query.sub === "true") {
                const subCategory = await SubCategorySchema.findByIdAndUpdate(req.query._id, {disabled: false});
                console.log(req.query._id)
                if (subCategory) {
                    // If needed, you can add additional logic here to handle items or related categories
                } else {
                    return res.status(404).json({message: "Подкатегории не существует"});
                }
            } else {
                const category = await CategorySchema.findByIdAndUpdate(req.query._id, {disabled: false});
                if (category) {
                    await SubCategorySchema.updateMany({categories: req.query._id}, {disabled: false});
                } else {
                    return res.status(404).json({message: "Категории не существует"});
                }
            }
    
            return res.status(200).json({message: 'Категория успешно включена'});
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: 'Произошла ошибка при включении категории'});
        }
    }

    static updateCategory = async (req, res) => {
        try {
            const check = req.body.sub === true ? await SubCategorySchema.findById(req.query._id) : await CategorySchema.findById(req.query._id)

            if (!check) {
                return res.status(404).json({message: "Категория не найдена"})
            }
            const updated = req.body.sub === true ? await SubCategorySchema.findByIdAndUpdate(req.query._id, {name: req.body.name}, {new: true})
                : await CategorySchema.findByIdAndUpdate(req.query._id, {name: req.body.name, engName: req.body.engName}, {new: true})

            return res.json(updated)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }

}