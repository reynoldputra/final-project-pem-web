import { body } from 'express-validator'

export const shortenValidator = () => {
    return [
        body('alias').optional(),
        body('url').not().isEmpty()
    ]
    
}