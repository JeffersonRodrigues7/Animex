import { DataTypes } from "sequelize";
import { db } from "../database/db-connection";

const PostModel = db.define("post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    creatorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastUserPostName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    replies: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export { PostModel };
