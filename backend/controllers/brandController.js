import BrandSchema from "../models/brand.js";

export default class brandController {
    static #errorMsg = "Произошла ошибка!"

    static async createBrand (req,res) {
        try {
            const check = await BrandSchema.findOne({name: req.body.name})

            if(check) {
                return res.status(400).json({message: "Бренд уже существует"})
            }

            const fields = {
                name: req.body.name,
                items: []
            }

            const brand = new BrandSchema(fields)
            
            await brand.save();

            return res.json(brand)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: this.#errorMsg})
        }
    }

    static async updateBrand(req, res) {
        try {
            const brand = await BrandSchema.findById(req.params.id);

            if (!brand) {
                return res.status(404).json({ message: "Бренд не найден" });
            }
    
            const existingBrand = await BrandSchema.findOne({ name: req.body.name });
    
            if (existingBrand && existingBrand._id.toString() !== req.params.id) {
                return res.status(400).json({ message: "Бренд с таким именем уже существует" });
            }

            brand.name = req.body.name;

            await brand.save();

            return res.json(brand);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: e, message: this.#errorMsg });
        }
    }
    
    static async deleteBrand(req, res) {
        try {
            const brand = await BrandSchema.findByIdAndDelete(req.params.id);
    
            if (!brand) {
                return res.status(404).json({ message: "Бренд не найден" });
            }

            return res.json({ message: "Бренд успешно удален" });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: e, message: "Произошла ошибка при удалении бренда" });
        }
    }

    static async getBrand (req,res) {
        try {

            if(req.query._id) {
                const brand = await BrandSchema.findById(req.query._id).populate("items")

                if(!brand) {
                    return res.status(404).json({message: "Бренда не существует"})
                }

                return res.json(brand)
            }
            const brand = await BrandSchema.find()

            return res.json(brand)

        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: this.#errorMsg})
        }
    }

    static async getAllBrands (req, res) {
        try {
            const brands = await BrandSchema.find();
    
            return res.json(brands);
    
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: e.message, message: "Ошибка при получении брендов" });
        }
    }
    

}