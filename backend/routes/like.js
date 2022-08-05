const express = require("express");
const likeController = require("../controllers/likeController")

// On importe le middleware d'authentification
const authentification = require('../middleware/authentification');

// On utilise router de express
const router = express.Router();

// Les routes
router.get("/:id", authentification, likeController.postIsLiked);
router.post("/:id", authentification, likeController.likePost);
router.get("/", authentification, likeController.totalLikes);


module.exports = router;