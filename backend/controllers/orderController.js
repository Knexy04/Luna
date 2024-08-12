import OrderSchema from '../models/order.js'

export default class orderController {
    static getAllOrders = async (req, res) => {
        try {
            const orders = await OrderSchema.find().populate('status items');
            return res.json(orders);
        } catch (e) {
            console.error('Error fetching orders:', e);
            return res.status(500).json({ message: 'Произошла ошибка при получении заказов', error: e });
        }
    }

    static getOrder = async (req, res) => {
        try {
            const order = await OrderSchema.find({_id: req.params.id}).populate('status');
            return res.json(order);
        } catch (e) {
            console.error('Error fetching orders:', e);
            return res.status(500).json({ message: 'Произошла ошибка при получении заказов', error: e });
        }
    }

    static async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const { status, track } = req.body;

            const order = await OrderSchema.findById(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (status) {
                order.status = [status];
            }
            if (track) {
                order.track = track;
            }

            await order.save();
            return res.json(order);
        } catch (e) {
            console.error('Error updating order:', e);
            return res.status(500).json({ message: 'Произошла ошибка при обновлении заказа', error: e });
        }
    }
}