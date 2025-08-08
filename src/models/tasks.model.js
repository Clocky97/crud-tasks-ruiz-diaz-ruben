import {sequelize} from "../config/database.js";
import { DataTypes } from "sequelize";

export const Tasks = sequelize.define("tasks", {
    id: {primaryKey: true, allowNull: false, type: DataTypes.INTEGER, autoIncrement: true},
    title: {type: DataTypes.STRING(100), allowNull: false, unique: true},
    description: {type: DataTypes.STRING(100), allowNull: flase},
    isComplete: {type: DataTypes.BOOLEAN, default: false}
});