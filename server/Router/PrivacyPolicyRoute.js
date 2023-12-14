const express = require('express')
const router = express.Router();
const privacyPolicyController = require('../Controller/PrivacyPolicyController')
const multer = require("multer");
const path = require("path");

router.post('/post',privacyPolicyController.add);
router.get('/', privacyPolicyController.get)
router.delete('/delete/:id', privacyPolicyController.deletePrivacyPolicy)
router.put('/update/:id',privacyPolicyController.update)
module.exports = router
