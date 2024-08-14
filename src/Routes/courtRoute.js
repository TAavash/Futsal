const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const { courtImage } = require('../middleware/uploadMiddleware');

const {
  createCourt,
    getAllCourts,
    getCourtById,
  //   updateCourt,
  //   deleteCourt,
} = require("../controllers/courtController");

// router.post("/create", authMiddleware, authorizeRole("admin"), createCourt);
router.post('/', authMiddleware, authorizeRole('admin'), courtImage.single('courtImage'), createCourt);
router.get("/", getAllCourts);
router.get("/:id", getCourtById);

// router.put("/courts/:id", authorizeRole("admin"), updateCourt);
// router.delete("/courts/:id", authorizeRole("admin"), deleteCourt);

module.exports = router;
