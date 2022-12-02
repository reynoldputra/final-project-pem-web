import { body } from 'express-validator'
export const registValidator = () => {
    return [
        body('email').isEmail(),
        body('password').not().isEmpty(),
        body('displayname').not().isEmpty()
    ]
    
}