import BlogSchema from "../models/blog.js";
import TagSchema from "../models/tag.js";

const errorMSG = 'Произошла ошибка!'


export default class blogController {

    static getPost = async (req, res) => {
        try {

            if (req.query._id) {
                const post = await BlogSchema.findById(req.query._id)

                if (!post) {
                    return res.status(404).json({message: "Пост не найден"})
                }

                return res.status(200).json(post)
            }

            const posts = await BlogSchema.find()

            return res.status(200).json(posts)
        } catch (e) {
            res.status(500).json({error: e, message: errorMSG})

        }
    }

    static addPost = async (req, res) => {
        try {
            await Promise.all(req.body.tags.map(async (tag) => {
                const checkTag = await TagSchema.findById(tag);
                if (!checkTag) {
                    throw new Error("Тега не существует");
                }
            }));

            const fields = {
                name: req.body.name,
                description: req.body.description,
                tags: req.body.tags,
                photos: req.body.photos,
                text: req.body.text
            }

            const post = await new BlogSchema(fields)

            post.save()

            res.status(200).json(post)

        } catch (e) {
            res.status(500).json({error: e, message: errorMSG})

        }
    }

    static disablePost = async (req,res) => {
        try {
            const post = await BlogSchema.findById(req.query._id)

            if (!post) {
                return res.status(404).json({message: "Поста не существует"})
            }

            await BlogSchema.findByIdAndUpdate(req.query._id, {disabled: true})

            return res.status(200).json({message: "Пост отключен", post})
        } catch (e) {
            res.status(500).json({error: e, message: errorMSG})
        }
    }


}