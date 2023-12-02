const { userModel } = require("../Db/sequelize");

exports.findAllUsers = (req, res) => {
  userModel
    .scope("withoutPassword")
    .findAll()
    .then((result) => {
      res.json({
        message: "La liste des utilisateurs a bien été récupérée.",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};
