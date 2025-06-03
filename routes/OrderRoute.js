import express from "express";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUserId,
    updateOrderStatus
} from "../controllers/OrderController.js";

const router = express.Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.get('/orders/user/:userId', getOrdersByUserId);
router.post('/orders', createOrder);
router.patch('/orders/:id', updateOrder);
router.patch('/orders/:id/status', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

export default router;
