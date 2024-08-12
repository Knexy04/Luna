import FacesCategorySchema from "../models/facescategory.js"
import CollectionShema from "../models/collection.js";

const errorMSG = 'Произошла ошибка!'


export default class facesCategoryController {
    static createFacesCategory = async (req, res) => {
        try {
            const check = await FacesCategorySchema.findOne({name: req.body.name})

            if (check) {
                return res.status(400).json({message: "Эта категория уже существует"})
            }

            const data = await new FacesCategorySchema({name: req.body.name, photo: req.body.photo, items: req.body.items})
            await data.save()

            res.json(data)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }

    static FacesItemUpdate = async (req, res) => {
        try {
            const { categories, item } = req.body;
    
            const categoriesWithItem = await FacesCategorySchema.find({ items: item });
    
            const categoriesWithItemIds = categoriesWithItem.map(cat => cat._id.toString());
    
            const categoriesToRemoveItem = categoriesWithItemIds.filter(catId => !categories.includes(catId));
    
            const categoriesToAddItem = categories.filter(catId => !categoriesWithItemIds.includes(catId));
    
            await FacesCategorySchema.updateMany(
                { _id: { $in: categoriesToRemoveItem } },
                { $pull: { items: item } }
            );
    
            await FacesCategorySchema.updateMany(
                { _id: { $in: categoriesToAddItem } },
                { $addToSet: { items: item } }
            );
    
            return res.status(200).json({ message: "Categories updated successfully" });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: e, message: "An error occurred while updating categories" });
        }
    }

    static getFacesCategory = async (req, res) => {
        try {
            const { id } = req.params;
    
            const facesCategory = await FacesCategorySchema.findOne({ _id: id }).populate("items");
    
            if (!facesCategory) {
                const allFacesCategories = await FacesCategorySchema.find().populate("items");
                return res.json(allFacesCategories);
            }
    
            return res.status(200).json(facesCategory);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err });
        }
    };

    static getFacesCategoryItem = async (req, res) => {
        try {
            const { id } = req.query; // Accessing id from query parameters
            
            if (!id) {
                return res.status(400).json({ error: "Item ID is required" });
            }
            
            // Find all categories containing the item with the given ID and select only the `_id` field
            const facesCategory = await FacesCategorySchema.find({ items: id }).select('_id');
    
            // Extract the array of IDs from the result
            const categoryIds = facesCategory.map(category => category._id);
    
            return res.status(200).json(categoryIds);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err });
        }
    };

    static disableFacesCategory = async (req, res) => {
        try {
            const FacesCategory = await FacesCategorySchema.findById(req.query._id)

            if (!FacesCategory) {
                return res.status(400).json({ message: "Ошибка, такой категории не существует" });
            }

            const flag = FacesCategory.disabled

            FacesCategory.disabled = !flag

            await FacesCategory.save()

            return res.status(200).json(FacesCategory)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }

    static updateFacesCategory = async (req, res) => {
        try {
            const { _id, name, photo, items, disabled } = req.body;
    
            const check = await FacesCategorySchema.findById(_id);
    
            if (!check) {
                return res.status(400).json({ message: "Ошибка, такой категории не существует" });
            }
    
            if (name !== undefined) {
                check.name = name;
            }
    
            if (photo !== undefined) {
                check.photo = photo;
            }
    
            if (items !== undefined) {
                check.items = items;
            }

            if (disabled !== undefined) {
                check.disabled = disabled;
            }
    
            await check.save();
    
            res.json(check);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: e.message || e, message: "Внутренняя ошибка сервера" });
        }
    }

    static getCollectionFace = async (req, res) => {
        try {
           
            const check = await CollectionShema.find({face: true});

            if (!check){
                return json.status(404)
            }
    
            res.json(check);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: e.message || e, message: "Внутренняя ошибка сервера" });
        }
    }
    
}
