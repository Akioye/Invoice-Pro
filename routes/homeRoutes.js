const express = require('express');
const mainControllers = require('../controllers/mainControllers');
const router = express.Router()
const {authGuard} = require('../middleWare/authGuard')

router.get('/', mainControllers.getHome)

router.get('/signup', mainControllers.getSignUp)

router.post('/signup', mainControllers.postSignUp)

router.post('/subscribe', mainControllers.postSubscribe)

router.get('/login', mainControllers.getLogin)

router.post('/login', mainControllers.postLogin)

router.get('/logout', mainControllers.logout)

router.post('/create-invoice', authGuard, mainControllers.createInvoice);

router.get('/download-invoice/:id', authGuard, mainControllers.getDownloadInvoice)

module.exports = router