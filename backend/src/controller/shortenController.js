import express from 'express'
import { validationResult } from 'express-validator';
import { checkIfAuthenticated } from '../middleware/guard/authGuard.js';
import { shoretenValidator } from '../middleware/validator/shortenValidator.js';
import { createShorten } from '../service/shortenService.js';

const shortenController = express.Router()

shortenController.post('/', [checkIfAuthenticated, shoretenValidator() ], async (req, res) => {
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty())
        return res.send({
            status : false,
            message : "Error validation",
            data : {...errors}
        })
        const _res = await createShorten(req.body, req.headers.authorization)
            .then((_res) => {
                res.send({
                    status: true,
                    message: "Succes create short url",
                    data: _res
                })
            })
        return _res
    } catch (err) {
        return res.send({
            status: false,
            message: err.message
        })
    }
})

export default shortenController; 