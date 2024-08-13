const express = require("express");
const router = express.Router();
const { authorizeRole } = require("../middleware/authorizationMiddleware");

const {
  createCourt,
//   getAllCourts,
//   getCourtById,
//   updateCourt,
//   deleteCourt,
} = require("../controllers/courtController");
router.post("/create", createCourt);
// router.get("/courts", getAllCourts);
// router.get("/courts/:id", getCourtById);

// router.put("/courts/:id", authorizeRole("admin"), updateCourt);
// router.delete("/courts/:id", authorizeRole("admin"), deleteCourt);

module.exports = router;
