import { verifyToken } from "../../service/authService.js"

export const checkIfAuthenticated = async (req, res, next) => {
    if(!req.headers.authorization)
    {
        return res
        .status(401)
        .send({ 
            status: false,
            message: 'You are not authorized to make this request'
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    const _res = await verifyToken({token})

    if(_res) 
        return next()
    else 
        return res  
            .status(401) 
            .send({  
                status: false,
                message: 'You are not authorized to make this request'
            });
} 