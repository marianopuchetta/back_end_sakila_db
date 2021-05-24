const customerService = require('../services/customerService')

const create = async (req, res) => {
    const { store_id, first_name, last_name, email, address_id } = req.body
    // const{userId} = req.userId
    let code = 201
    let content={}

    try {
        content =await customerService.createCustomer(store_id,first_name,last_name,email,address_id)   
    } catch (error) {
       console.log(error) 
       code = error.statusCode || 500
    }
    res.status(code).json(content)
}

const read = async(req,res)=>{
    const{limit,offset} = req.query
    let code = 200
    let content = {}

    try {
        content = await customerService.readCustomer(limit, offset)
      } catch (error) {
        console.log(error)
        code = error.statusCode || 500
        content = { error: error.errorMessage }
      }
    
      res.status(code).json(content)
    
}


const update = async (req,res)=> {
 const {store_id, first_name, last_name, email, address_id } = req.body
 const {userId} = req.user

 const {id :customer_id} = req.params

 let code = 200
 let content = {}

 try {
     console.log(customer_id)
    content = await customerService.updateCustomer(store_id, first_name, last_name, email, address_id,customer_id )

} catch (error) {
     code = error.statusCode || 500
     content = {error: error.errorMessage}
 }
res.status(code).json(content)
}

const remove = async (req,res) => {
 let {id:customer_id} = req.params
 let code = 200
 let content = {}

 try {
     content = await customerService.removeCustomer(customer_id)
 } catch (error) {
     code = error.statusCode || 500
     content = {error:error.errorMessage}
     console.log(error)
 }
 res.status(code).json(content)
}


module.exports = {
    create,
    read,
    update,
    remove
}