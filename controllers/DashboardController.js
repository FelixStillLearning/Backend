import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Category from "../models/CategorieModel.js";
import Order from "../models/OrderModel.js";
import { Op } from "sequelize";

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        // Get counts
        const totalUsers = await User.count();
        const totalProducts = await Product.count();
        const totalCategories = await Category.count();
        const totalOrders = await Order.count();

        // Return the stats
        res.status(200).json({
            totalUsers,
            totalProducts,
            totalCategories,
            totalOrders
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get recent orders
export const getRecentOrders = async (req, res) => {
    try {
        const response = await Order.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get low stock products (less than or equal to 5)
export const getLowStockProducts = async (req, res) => {
    try {
        const response = await Product.findAll({
            where: {
                stock: {
                    [Op.lte]: 5
                }
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ],
            limit: 10
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
