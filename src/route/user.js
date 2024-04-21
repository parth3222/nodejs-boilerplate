const express = require('express');
const multer = require('multer');
const { createUser, getUser } = require('../controller/users');
const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/create", upload.single('image'), createUser)
router.get("/get", getUser)

module.exports = router;