import { body } from 'express-validator'

export const shoretenValidator = () => {
    return [
        body('alias').optional(),
        body('url').not().isEmpty()
    ]
    
}