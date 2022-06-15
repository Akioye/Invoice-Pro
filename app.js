const fs = require('fs')
const express = require('express');
const exphbs = require('express-handlebars'); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload');
const pdf = require('html-pdf');
const Invoice = require('./models/invoiceModel')
const User = require('./models/userModel')
const homeRoutes = require('./routes/homeRoutes')
const adminRoutes = require('./routes/adminRoutes')
const cookieParser = require('cookie-parser')
const {setUser} = require('./middleWare/setUser')

mongoose.connect('mongodb://localhost:27017/InvoicePro', ()=>{
  console.log('DB Connected Successfully ! ')
})

dotenv.config()

const app = express()

// MiddleWare 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(fileUpload())
app.use(setUser)

app.use('/', homeRoutes)
app.use('/admin', adminRoutes)

app.engine('hbs', exphbs.engine({
extname:'.hbs',
defaultLayout:'main',
runtimeOptions: {
  allowProtoMethodsByDefault: true, 
  allowProtoPropertiesByDefault: true
}
}));

app.set('view engine', 'hbs')

// app.post('/update-invoice', async (req, res)=>{
  
//   const name = req.body.fromname

//   const foundInvoice = await Invoice.findOne({name})
  

 
// foundInvoice.invoiceNumber = `INV001`,

// from: {
//     name: req.body.fromname,
//     email: req.body.fromemail,
//     address: req.body.fromaddress, 
//     phoneNumber: req.body.fromphonenumber,
//     businessNumber: req.body.frombusinessnumber,
//     date: req.body.date
// },
// to: {
//    name: req.body.toname,
//    email: req.body.toemail,
//    address: req.body.toaddress, 
//    phoneNumber: req.body.tophonenumber
// },
// products:[
//     {
//         description: req.body.description,
//         rate: req.body.rate, 
//         quantity: req.body.qty,
//         amount: req.body.amount
//     }
// ], 

// sumTotal: req.body.sumTotal, 

// notes: req.body.notes

// })

//   foundInvoice.save()

//   res.render('update-invoice', {layout:'admin'})
// })

const PORT = 2100

app.listen(PORT, ()=>{
    console.log(`Now Listening on Port ${PORT}`)
}); 