import ReviewSchema from "../models/review.js";
import UserSchema from "../models/user.js";
import ItemSchema from "../models/item.js";
import mongoose from "mongoose";

const errorMSG = 'Произошла ошибка!'

export default class reviewController {
    static createReview = async (req, res) => {
        try {
            const user = await UserSchema.findById(req.userId).populate('orders');
    
            const boughtItems = user.orders.reduce((acc, order) => {
                return acc.concat(order.items);
            }, []);
            
            let c = 0
            
            for (let i=0; i<boughtItems.length; i++){
                if (String(boughtItems[i]) === req.body.item){
                    c+=1
                }
            }

            if (c===0){
                return res.status(403).json({error: "Вы не купили этот товар"})
            }
    
            const checkExistingReview = await ReviewSchema.findOne({ user: req.userId, item: req.body.item });
    
            if (checkExistingReview) {
                return res.status(403).json({ message: "Вы не можете оставить отзыв дважды" });
            }
    
            const fields = {
                rating: req.body.rating,
                description: req.body.description,
                user: req.userId,
                item: req.body.item
            };
    
            const review = new ReviewSchema(fields);
            await review.save();

            await ItemSchema.findByIdAndUpdate(req.body.item, {$push: {reviews: review._id}})

            return res.json(review)
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }

    static checkReview = async (req, res) => {
        try {
            const user = await UserSchema.findById(req.userId).populate('orders');
    
            const boughtItems = user.orders.reduce((acc, order) => {
                return acc.concat(order.items);
            }, []);
            
            let c = 0
            
            for (let i=0; i<boughtItems.length; i++){
                if (String(boughtItems[i]) === req.query.id){
                    c+=1
                }
            }

            if (c===0){
                return res.status(403).json({error: "Вы не купили этот товар"})
            }
    
            const checkExistingReview = await ReviewSchema.findOne({ user: req.userId, item: req.query.id });
    
            if (checkExistingReview) {
                return res.status(403).json({ message: "Вы не можете оставить отзыв дважды" });
            }
            return res.status(200).json("ok")
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }
    

    static deleteReview = async (req, res) => {
        try {

            const review = await ReviewSchema.findById(req.query._id)

            if (!review) {
                return res.status(400).json({message: "Отызва не существует"})
            }
            if(review.user !== req.userId) {
                return res.status(403).json({message: "Вы не можете удалить чужой отзыв"})
            }

            const reviewDeleted = await ReviewSchema.findByIdAndDelete(req.query._id, {new: true})
            return res.json({
                message: "Отзыв удален",
                review: reviewDeleted
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({error: e, message: errorMSG})
        }
    }
}