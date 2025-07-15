const { Status } = require("../../config/constants");
const sequelize = require("../../config/sql.config");
const {DataTypes} = require('sequelize')

const BannerModel = sequelize.define("banners", {
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(Object.values(Status)),
    defaultValue: Status.INACTIVE,
  }
},{
  timestamps: true
});

module.exports = BannerModel
