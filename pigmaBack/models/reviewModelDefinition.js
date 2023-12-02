module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,

      validate: {
        isFloat: {
          args: {
            min: 0,
            max: 5,
          },
          msg: "Le rating doit être un nombre entre 0 et 5.",
        },
      },
    },
  });
};
