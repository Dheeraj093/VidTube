const express = require("express");
const {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  getVideosByTags,
  getVideosBySearch,
  randomVideos,
  subscribedVideos,
  trendingVideos,
  updateVideo,
  savedVideos,
  getHistory,
  getMyVideos,
} = require("../controllers/video");
const protect = require("../middlewares/auth");
const protectforsub = require("../middlewares/subs");

const router = express.Router();

router.post("/", protect, addVideo);
router.put("/:videoId", protect, updateVideo);
router.delete("/:videoId", protect, deleteVideo);
router.get("/trending", trendingVideos);
router.get("/random", randomVideos);
router.get("/tags", getVideosByTags);
router.get("/search", getVideosBySearch);
router.get("/sub/:userID", protectforsub, subscribedVideos);
router.get("/:videoId", getVideo);
router.put("/view/:videoId", addView);
//my videos
router.get("/myvideos/:userID", protectforsub, getMyVideos);
// saved videos
router.get("/favorite/:userID",protectforsub, savedVideos);
//get history
router.get("/history/:userID",protectforsub, getHistory);


module.exports = router;
