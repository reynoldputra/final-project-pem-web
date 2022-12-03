import { body } from 'express-validator'

export const loginValidator = () => {
    return [
        body('email').isEmail(),
        body('password').not().isEmpty() 
    ]
    
}