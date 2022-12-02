import { body } from 'express-validator'
export const tokenValidator = () => {
    return [
        body('token').not().isEmpty()
    ]
    
}