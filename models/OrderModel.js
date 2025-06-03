import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Expedition from "./ExpeditionModel.js";
const {DataTypes} = Sequelize;

const Order = db.define('orders',{
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    expeditionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Expedition,
            key: 'id'
        }
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending'
    },
    trackingNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estimatedDelivery: {
        type: DataTypes.DATE,
        allowNull: true
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    freezeTableName:true
});

// Define associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.belongsTo(Expedition, { foreignKey: 'expeditionId', as: 'expedition' });
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Expedition.hasMany(Order, { foreignKey: 'expeditionId', as: 'orders' });

export default Order;

(async()=>{
    await db.sync();
})();
