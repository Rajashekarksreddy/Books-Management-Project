const UserModel = require('../Models/UserModel')
const validator = require('../utils/utils')


const userRegister = async function(req,res){
    let body = req.body
    if(!validator.isValidRequestBody){
        return res.status(400).send({status:'false', msg:'please provide valid request body'})
    }

    let {title,name,phone,email} = body

    if(!validator.isValidTitle(title)){
        return res.status(400).send({status:false, msg:'please provide title'})
    }

    if(!validator.isValidString(name)){
        return res.status(400).send({status:false, msg:"plese provide name"})
    }

    if(!validator.isValidString(phone)){
      return res.status(400).send({status:false, msg:'please valid phone number'})
    }

    
    if(!validator.isValidemail(email)){
        return res.status(400).send({status:false, msg:'please provide valid email'})
      }

    let usermodel = await UserModel.create(body)
    res.send({status:'true', data:usermodel})
}

module.exports.userRegister = userRegister

