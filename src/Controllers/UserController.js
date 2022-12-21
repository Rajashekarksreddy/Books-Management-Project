const UserModel = require('../Models/UserModel')
const validator = require('../utils/utils')


const userRegister = async function(req,res){
    try{
    let data = req.body
    if(!validator.isValidRequestBody){
        return res.status(400).send({status:'false', msg:'please provide valid request body'})
    }

    let {title,name,phone,email,password} = data

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

      if(!validator.isValid(password)){
        error.push('password is required')
      }

      if(password.trim() &&(password.length < 8 || password.length > 15)){
          error.push('password must be 8-15 characters')
      }
      
      let created = await UserModel.create(data)
      res.status(201).send({status:'true', msg:'sucess', data:created})
}catch(error){
 res.status(500).send({status:false, message:error.message})
}
}




module.exports.userRegister = userRegister


