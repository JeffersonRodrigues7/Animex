import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../database/db-connection";
import { UserModel } from "./UserModel";
import { TopicModel } from "./TopicModel";

class CommentModel extends Model<InferAttributes<CommentModel>, InferCreationAttributes<CommentModel>> {
  declare id: CreationOptional<number>;
  declare text: string;
  declare topic_id: ForeignKey<TopicModel["id"]>;
  declare user_id: ForeignKey<UserModel["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CommentModel.init(
  {
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: db,
    tableName: "comments",
  }
);

CommentModel.belongsTo(UserModel, {
  constraints: true,
  foreignKey: "user_id",
  as: "user",
});

CommentModel.belongsTo(TopicModel, {
  constraints: true,
  foreignKey: "topic_id",
  as: "topic",
});

UserModel.hasMany(CommentModel, {
  foreignKey: "user_id",
});

TopicModel.hasMany(CommentModel, {
  foreignKey: "topic_id",
});

export { CommentModel };
