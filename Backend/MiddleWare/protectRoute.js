import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/model.js'


const protectRoute = asyncHandler(async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
        {
        try {
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from token
            req.user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })
            next()
        } catch (err) {
            console.log(err)
            return res.status(401).json({ error: 'Not authorized' });
        }
    }

    if(!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
})

export default protectRoute




// const protectRoute = asyncHandler(async(req, res, next) => {
//     let token;
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
//         {
//         try {
//             token = req.headers.authorization.split(' ')[1]
//             //verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)
//             //get user from token
//             req.apiKey = await API.findOne({
//                 where: {
//                     userId: decoded.id
//                 }
//             }).select('-password')
//             next()
//         } catch (err) {
//             console.log(err)
//             res.status(401).send('Not authorized')
//         }
//     }

//     if(!token) {
//         res.status(401).send('Not authorized, no token')
//     }
// })

// export default protectRoute