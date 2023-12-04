const { ValidationError } = require("sequelize");
const { reviewModel, userModel } = require("../Db/sequelize");

exports.findAllReviews = (req, res) => {
  reviewModel
    .findAll({})
    .then((result) => {
      res.json({
        message: "La liste des avis a bien été récupérée.",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};
exports.createReview = (req, res) => {
  userModel
    .findOne({ where: { email: req.email } })
    .then((user) => {
      return reviewModel
        .create({
          ...req.body,
          name: user.name,
          UserId: user.id,
        })
        .then((result) => {
          res.json({ message: `création d'un avis`, data: result });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
exports.updateReview = (req, res) => {
  reviewModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Aucun avis trouvé" });
      } else {
        return result.update(req.body).then(() => {
          res.json({
            message: `Avis modifié : ${result.dataValues.id} `,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    });
};
exports.deleteReview = (req, res) => {
  reviewModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Aucun avis trouvé" });
      } else {
        return result.destroy().then(() => {
          res.json({
            message: `avis supprimé : ${result.dataValues.id} `,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `${error}` });
    });
};
