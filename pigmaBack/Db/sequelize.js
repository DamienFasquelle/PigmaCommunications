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

const setDataSample = require("./setDataSample");

const userModel = defineUserModel(sequelize, DataTypes);
const roleModel = defineRoleModel(sequelize, DataTypes);

roleModel.hasMany(userModel);
userModel.belongsTo(roleModel);

const initDataBase = () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      setDataSample(roleModel, userModel);
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
};
