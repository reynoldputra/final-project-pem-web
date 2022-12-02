import express from 'express'
import { validationResult } from 'express-validator';
import { loginValidator } from '../middleware/validator/loginValidator.js'
import { registValidator } from '../middleware/validator/registValidator.js';
import { tokenValidator } from '../middleware/validator/tokenValidator.js';
import { register, login, verifyToken } from '../service/authService.js'

const authController = express.Router()

authController.post('/register', registValidator(), async (req, res) => {
    try {
        const _res = await register(req.body)
        res.send({
            status: true,
            message: "Success creating user",
            data : _res
        })
    } catch (err) {
        res.send({
            status: false,
            message: err.message
        })
    }
})

authController.post('/login', loginValidator(), async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        res.send({
            status : false,
            message : "Error validation",
            data : {...errors}
        })
    try {
        const _res = await login(req.body)
        res.send({
            status : true,
            message : "Berhasil login",
            data : {
                token : _res
            }
        })
    } catch (err) {
        
    }
})

authController.post('/verifytoken', tokenValidator(),  async (req, res) => {
    try {
        const _res = await verifyToken(req.body)
        console.log(_res);
        if(_res)
            res.send( {
                status: true,
                message: "Token validated"  
            })
        else 
            res.send( {
                status: false,
                message: "Token error"  
            })
    } catch (err) {
        res.send( {
            status: false,
            message: "Token error"  
        })
    }
})

export default authController;