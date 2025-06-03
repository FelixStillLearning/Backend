import express from "express";
import { 
    getDashboardStats,
    getRecentOrders,
    getLowStockProducts
} from "../controllers/DashboardController.js";

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/recent-orders', getRecentOrders);
router.get('/low-stock', getLowStockProducts);

export default router;
