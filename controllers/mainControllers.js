const fs = require('fs')
const Invoice = require('../models/invoiceModel')
const {replacer} = require('../controllers/adminControllers')
const fileUpload = require('express-fileupload');
const pdf = require('html-pdf');
const invoiceHtml = fs.readFileSync('./invoice-html.html', 'utf-8')
const User = require('../models/userModel')
const Subscriber = require('../models/subscriberModel')

module.exports = {

    getHome : (req, res) => {
      if(req.user !== null) {
        res.redirect('/admin')
      } else {
        res.render('home')
    } 
}, 
    getSignUp : (req, res)=>{

        res.render('signup',{layout: 'main'})
      },
      
    postSignUp : async (req, res)=>{
    
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      })

    const user =  await User.findOne({email: newUser.email})
    
    if (user) { 
           let cusEmail = user.email

            res.cookie('Auth', `${cusEmail}`)

            res.redirect('/admin')
        } else { 
         throw err
      }    
  },
    
    getLogin : (req, res)=>{
        res.render('login')
      }, 

    postLogin : async (req, res)=>{

    const email = req.body.email
    const password = req.body.password

    const user =  await User.findOne({email})

    if (user) {
         if (password == user.password) {
 
           let cusEmail = user.email

            res.cookie('Auth', `${cusEmail}`)

            res.redirect('/admin')
         } else { throw err}

      } else {
         throw err
      }
    },

    createInvoice : async (req, res)=>{
   
         const currentUser = req.user
        
         let file = req.files.fileud
         let fileDir = './public/uploads/'
         let fileName = file.name
      
         file.mv(fileDir + fileName, (err)=>{
           if (err) throw err })
      
       const newInvoice =  await Invoice.create({

       user: currentUser._id ,

       companyLogo: `/uploads/${fileName}`,

       invoiceNumber: `INV001`,
      //  companyLogo:`/uploads/${fileName}`,
       from: {
           name: req.body.fromname,
           email: req.body.fromemail,
           address: req.body.fromaddress, 
           phoneNumber: req.body.fromphonenumber,
           businessNumber: req.body.frombusinessnumber,
           date: req.body.date
       },
       to: {
          name: req.body.toname,
          email: req.body.toemail,
          address: req.body.toaddress, 
          phoneNumber: req.body.tophonenumber
      },
       products:[
           {
               description: req.body.description,
               rate: req.body.rate, 
               quantity: req.body.qty,
               amount: req.body.amount
           }
       ], 
      
       sumTotal: req.body.sumTotal, 
      
       notes: req.body.notes
      
      })
      
      const docname = newInvoice.from.name
      
      const newHtml = replacer(invoiceHtml , newInvoice)
      
      fs.writeFileSync(`${docname}.html`, newHtml)
      
      
      const createdHtml = fs.readFileSync(`${docname}.html`, 'utf-8') 
      
      pdf.create(createdHtml,{format:'Letter'}).toFile(`./${docname}.pdf`, (err)=>{
        if (err) {console.log(err)}
      })
      
        res.render('update-invoice', {newInvoice, layout: 'admin', alert: 'New Invoice Created! Click to Download'})
      }, 

    getDownloadInvoice : async (req, res)=>{

        const id = req.params.id
       
        const myInvoice = await Invoice.findOne({_id: id})
        
        const pdfName = myInvoice.from.name
       
        res.download(`${pdfName}.pdf`)
       }, 
    
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
    
    logout : (req, res)=>{
      
    res.cookie('Auth', '', {maxAge:1})

    res.redirect('/')

    }, 

    postSubscribe : async (req, res)=>{
    
      await Subscriber.create({
          email: req.body.email}) 
        res.render('create-invoice', {layout: 'admin'})
    }
  }