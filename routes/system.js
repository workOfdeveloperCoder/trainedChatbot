const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    req.session.history = "";

    console.log("History reset");

    res.json({
        success: true,
        message: "History cleared"
    });

});

module.exports = router;