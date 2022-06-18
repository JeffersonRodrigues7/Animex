import { DataTypes } from "sequelize";
import { db } from "../database/db-connection";

const UserModel = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  biography: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.BLOB("medium"),
    allowNull: true,
  },
});

export { UserModel };
