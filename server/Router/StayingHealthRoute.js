const express=require('express')
const router=express.Router();
const stayingHealthController=require('../Controller/StayingHealthController')
router.post('/post',stayingHealthController.add);
router.get('/',stayingHealthController.get)
router.delete('/delete/:id',stayingHealthController.deleteStayingHealth)
router.put('/update/:id',stayingHealthController.update)