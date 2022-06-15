const Invoice = require('../models/invoiceModel')
const User = require('../models/userModel')
const fileUpload = require('express-fileupload');

 
module.exports = {
replacer : (invoiceHtml, newInvoice)=>{
    let newHtml = invoiceHtml.replace('{{invoiceNumber}}', 12345678)
    
    newHtml = newHtml.replace('{{fromName}}', newInvoice.from.name)
    
    newHtml = newHtml.replace('{{fromEmail}}', newInvoice.from.email)
      
    newHtml = newHtml.replace('{{invoiceAddress}}', newInvoice.from.address)
      
    newHtml = newHtml.replace('{{fromPhoneNumber}}', newInvoice.from.phoneNumber)
      
    newHtml = newHtml.replace('{{fromBusinessNumber}}', newInvoice.from.businessNumber )
    
    newHtml = newHtml.replace('{{fromDate}}', newInvoice.from.date )
    
    return newHtml;
  
  }, 

  getHome : async (req, res)=>{

    const currentUser = req.user

    const userInvoices = await Invoice.find({user: currentUser._id})

    res.render('dashboard', {layout:'admin', currentUser, userInvoices})
  }, 

  getCreateInvoice : (req, res)=>{

    const currentUser = req.user
    
    if (currentUser !== null){
    mySettings = currentUser.settings
  } else {
    mySettings = null
  }

    res.render('create-invoice', {layout:'admin', currentUser, mySettings})
  }, 

  getClients : async (req, res)=>{

    const currentUser = req.user

    const userInvoices = await Invoice.find({user: currentUser._id})

    const clients = userInvoices.map((e)=>{return e.to})

    res.render('clients', {layout:'admin', currentUser, clients})
  }, 

  getProducts : (req, res)=>{
    const currentUser = req.user
    res.render('products', {layout:'admin', currentUser})
  }, 

  getSettings : (req, res)=>{
    const currentUser = req.user

    const mySettings = currentUser.settings


    res.render('settings', {layout:'admin', currentUser, mySettings})
  },

  postSettings : async (req, res)=>{
    const currentUser = req.user
   
    const myCurrentUser = await User.findOne({_id: currentUser._id}) 

    let file = req.files.fileud
    let fileDir = './public/uploads/'
    let fileName = file.name
 
    file.mv(fileDir + fileName, (err)=>{
      if (err) throw err })

    myCurrentUser.settings.companyName = req.body.companyname
    myCurrentUser.settings.companyEmail = req.body.companyemail
    myCurrentUser.settings.companyAddress = req.body.companyaddress
    myCurrentUser.settings.companyPhoneNumber = req.body.companyphonenumber
    myCurrentUser.settings.companyBusinessNumber = req.body.companybusinessnumber
    myCurrentUser.settings.companyLogo = `/uploads/${fileName}`

    await myCurrentUser.save()

    const mySettings = myCurrentUser.settings

    res.render('settings', {layout:'admin', currentUser, mySettings,alert: 'Settings Updated Successfully ! '})
  }

}