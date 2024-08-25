const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const { courtImage } = require('../middleware/uploadMiddleware');

const {
  createCourt,
    getAllCourts,
    getCourtById,
    updateCourt,
    searchCourts,
    deleteCourt,
} = require("../controllers/courtController");


router.post('/', authMiddleware, authorizeRole('admin'), courtImage.single('courtImage'), createCourt);
router.get("/all", getAllCourts);
router.get("/", searchCourts);
router.get("/:id", getCourtById);

router.put("/:id",authMiddleware, authorizeRole("admin"), courtImage.single('courtImage'), updateCourt);
router.delete("/:id",authMiddleware, authorizeRole("admin"), deleteCourt);

module.exports = router;
