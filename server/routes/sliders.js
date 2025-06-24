const express = require("express");
const {
  getSliders,
  createSlider,
  updateSlider,
  deleteSlider,
} = require("../controllers/sliderController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", getSliders);
router.post("/", protect, authorize("admin"), createSlider);
router.put("/:id", protect, authorize("admin"), updateSlider);
router.delete("/:id", protect, authorize("admin"), deleteSlider);

module.exports = router;
