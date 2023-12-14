const express = require('express')
const router = express.Router();
const meetDoctorController = require('../Controller/MeetDoctorController')
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
router.post('/post', upload.single('image'), meetDoctorController.add);
router.get('/', meetDoctorController.get)
router.delete('/delete/:id', meetDoctorController.deleteMeetDoctor)
router.put('/update/:id', upload.single('image'),meetDoctorController.update)
module.exports = router
