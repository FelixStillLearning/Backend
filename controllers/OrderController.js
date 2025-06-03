import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import Expedition from "../models/ExpeditionModel.js";

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const response = await Order.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Expedition,
                    as: 'expedition',
                    attributes: ['id', 'name', 'code']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const response = await Order.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Expedition,
                    as: 'expedition',
                    attributes: ['id', 'name', 'code']
                }
            ]
        });
        if (!response) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create new order
export const createOrder = async (req, res) => {
    try {
        const { 
            orderNumber, 
            userId, 
            expeditionId, 
            totalAmount, 
            shippingCost, 
            status, 
            trackingNumber, 
            estimatedDelivery, 
            shippingAddress 
        } = req.body;
        
        await Order.create({
            orderNumber: orderNumber,
            userId: userId,
            expeditionId: expeditionId,
            totalAmount: totalAmount,
            shippingCost: shippingCost,
            status: status,
            trackingNumber: trackingNumber,
            estimatedDelivery: estimatedDelivery,
            shippingAddress: shippingAddress
        });
        res.status(201).json({ msg: "Order created successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update order
export const updateOrder = async (req, res) => {
    try {
        const { 
            orderNumber, 
            userId, 
            expeditionId, 
            totalAmount, 
            shippingCost, 
            status, 
            trackingNumber, 
            estimatedDelivery, 
            shippingAddress 
        } = req.body;
        
        const order = await Order.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        
        await Order.update({
            orderNumber: orderNumber,
            userId: userId,
            expeditionId: expeditionId,
            totalAmount: totalAmount,
            shippingCost: shippingCost,
            status: status,
            trackingNumber: trackingNumber,
            estimatedDelivery: estimatedDelivery,
            shippingAddress: shippingAddress
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Order updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        await Order.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Order deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
    try {
        const response = await Order.findAll({
            where: {
                userId: req.params.userId
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Expedition,
                    as: 'expedition',
                    attributes: ['id', 'name', 'code']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { status, trackingNumber } = req.body;
        const order = await Order.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        
        await Order.update({
            status: status,
            trackingNumber: trackingNumber
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Order status updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
