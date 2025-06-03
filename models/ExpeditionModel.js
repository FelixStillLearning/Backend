import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize;

const Expedition = db.define('expeditions',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    baseCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    freezeTableName:true
});

export default Expedition;

(async()=>{
    await db.sync();
})();
