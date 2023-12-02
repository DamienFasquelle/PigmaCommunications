const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsControllers");
const authController = require("../controllers/authControllers");
const { reviewModel } = require("../Db/sequelize");
router
  .route("/")
  .get(reviewsController.findAllReviews)
  .post(authController.protect, reviewsController.createReview);
router
  .route("/:id")
  .put(
    authController.protect,
    authController.restrictToOwnUser(reviewModel),
    reviewsController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictToOwnUser(reviewModel),
    reviewsController.deleteReview
  );

module.exports = router;
