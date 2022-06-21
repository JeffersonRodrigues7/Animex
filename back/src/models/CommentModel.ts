import { DataTypes } from "sequelize";
import { db } from "../database/db-connection";
import { UserModel } from "./UserModel";
import { PostModel } from "./PostModel";

const CommentModel = db.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

CommentModel.belongsTo(UserModel, {
  constraints: true,
  foreignKey: "userId",
});

CommentModel.belongsTo(PostModel, {
  constraints: true,
  foreignKey: "postId",
});

UserModel.hasMany(CommentModel, {
  foreignKey: "userId",
});

PostModel.hasMany(CommentModel, {
  foreignKey: "postId",
});

export { CommentModel };
