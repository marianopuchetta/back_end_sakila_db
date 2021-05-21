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

module.exports = {
    create,
    read
}