const express = require('express')
const router = express.Router();
const stayingHealthController = require('../Controller/StayingHealthController')
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
router.post('/post', upload.single('image'), stayingHealthController.add);
router.get('/', stayingHealthController.get)
router.delete('/delete/:id', stayingHealthController.deleteStayingHealth)
router.put('/update/:id', upload.single('image'), stayingHealthController.update)
module.exports = router
