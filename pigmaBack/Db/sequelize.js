const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("pigmacommunications", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
});

sequelize
  .authenticate()
  .then(() =>
    console.log("La connexion à la base de données a bien été établie.")
  )
  .catch((error) =>
    console.log(`Ìmpossible de se connecter à la base de données ${error}`)
  );

const defineUserModel = require("../models/userModelDefinition");
const defineRoleModel = require("../models/roleModelDefinition");
const defineReviewModel = require("../models/reviewModelDefinition");

const setDataSample = require("./setDataSample");

const reviewModel = defineReviewModel(sequelize, DataTypes);
const userModel = defineUserModel(sequelize, DataTypes);
const roleModel = defineRoleModel(sequelize, DataTypes);

roleModel.hasMany(userModel);
userModel.belongsTo(roleModel);

userModel.hasMany(reviewModel, {
  foreignKey: {
    allowNull: false,
  },
});
reviewModel.belongsTo(userModel);

const initDataBase = () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      setDataSample(roleModel, userModel, reviewModel);
    })
    .catch((error) => {
      console.error(
        `Erreur de synchronisation avec la base de données : ${error}`
      );
    });
};

module.exports = {
  initDataBase,
  roleModel,
  userModel,
  reviewModel,
};
