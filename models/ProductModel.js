import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "./CategorieModel.js";
const {DataTypes} = Sequelize;

const Product = db.define('products',{
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Category,
            key: 'id'
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName:true
});

// Define associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

export default Product;
(async () => {
    await db.sync();
})();