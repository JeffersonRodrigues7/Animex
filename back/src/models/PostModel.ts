import { DataTypes } from "sequelize";
import { db } from "../database/db-connection";
import { UserModel } from "./UserModel";

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
  lastUserPostName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  replies: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

PostModel.belongsTo(UserModel, {
  constraints: true,
  foreignKey: "creatorId",
});

UserModel.hasMany(PostModel, {
  foreignKey: "creatorId",
});

export { PostModel };
