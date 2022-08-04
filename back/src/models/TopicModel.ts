import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../database/db-connection";
import { UserModel } from "./UserModel";

class TopicModel extends Model<InferAttributes<TopicModel>, InferCreationAttributes<TopicModel>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare last_user_comment_name: string;
  declare replies: number;
  declare user_id: ForeignKey<UserModel["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TopicModel.init(
  {
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
    last_user_comment_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    replies: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: db,
    tableName: "topics",
  }
);

TopicModel.belongsTo(UserModel, {
  constraints: true,
  foreignKey: "user_id",
  as: "user",
});

UserModel.hasMany(TopicModel, {
  foreignKey: "user_id",
});

export { TopicModel };
