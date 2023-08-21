const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  subscribeUser,
  unsubscribeUser,
  likeVideo,
  dislikeVideo,
  savedVideo,
  removeVideo,
  addHistory,
  removeAllHistory,
} = require("../controllers/user");
const protect = require("../middlewares/auth");

const router = express.Router();

// update a user
router.put("/:id", protect, updateUser);

// delete a user
router.delete("/:id", protect, deleteUser);

// get a user
router.get("/:id", getUser);

// subscribe a user
router.put("/sub/:id", protect, subscribeUser);

// unsubscribe a user
router.put("/unsub/:id", protect, unsubscribeUser);

// like a video
router.put("/like/:videoId", protect,likeVideo);

// dislike a video
router.put("/dislike/:videoId", protect, dislikeVideo);

// saved video in library
router.put("/saved/:videoId", protect, savedVideo);

//remove from history
router.put("/unsaved/:videoId", protect, removeVideo);

//add to history
router.put("/history/:videoId", protect, addHistory);

router.put("/deleteHistory/:userId", protect, removeAllHistory);




module.exports = router;
