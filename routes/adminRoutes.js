const express = require('express');
const adminControllers = require('../controllers/adminControllers');
const router = express.Router()
const {authGuard} = require('../middleWare/authGuard')

router.get('/', authGuard, adminControllers.getHome)
  
router.get('/create-invoice', adminControllers.getCreateInvoice)
  
router.get('/clients', authGuard, adminControllers.getClients)
   
router.get('/products', authGuard, adminControllers.getProducts)
  
router.get('/settings', authGuard, adminControllers.getSettings)

router.post('/settings', authGuard, adminControllers.postSettings)

module.exports = router