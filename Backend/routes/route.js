import express from 'express'
import User from '../models/model.js'
import {API} from '../models/model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import protectRoute from '../MiddleWare/protectRoute.js'

const router = express.Router()
dotenv.config()

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}


// const authenticate = (req, res, next) => {
//     const apiKey = req.headers['apiKey'];
//     try {
//         if (isValidApiKey(apiKey, res)) {
//             next(); // Move to the next middleware
//         } else {
//             res.status(401).json({ error: 'Unauthorized' });
//         }
//     } catch(err) {
//         console.error('Error validating API key:', err);
//         res.status(500).json({ err: 'Internal Server Error' });
//     }
// };


//create user on signup
router.post('/create/user', async(req, res) => {
    const {firstname, lastname, phone, email, password, country} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const details = {
        firstname,
        lastname,
        phone,
        email,
        password: hashedPassword,
        admin: false,
        country
    }
    try {
        if(!details) {
            return res.status(400).json('Inputs missing')
        }
        const findEmail = await User.findOne({where: {"email": email}})
        if(findEmail) {
            return res.status(400).json('Email exists')
        }
        const creation = await User.create(details)
        return res.status(200).json({
            id: creation.getDataValue('id'),
            email: creation.getDataValue('email'),
            token: generateToken(creation.getDataValue('id')),
        })
    } catch(err) {
        return res.status(500).send(err)
    }
})


//user login
router.post('/login/user', async(req, res) => {
    const {email, password} = req.body
    try {
        const loginUser = await User.findOne({
            where: {
                email: email
            }
        })
        if(!loginUser) {
            return res.status(401).send({err: 'Un-Authorized, User does not exist'})
        }
        const passwordValidity = await bcrypt.compare(password, loginUser.password)
        if(!passwordValidity) {
            return res.status(401).json({err: 'Un-Authorized, Password not Valid'})
        }
        return res.status(200).json({
            id: loginUser.id,
            email: loginUser.email,
            token: generateToken(loginUser.id)
        })
    } catch(err) {
        return res.status(501).json({err: 'Could not login'})
    }
})

//generate api key
router.post('/create/apikey/:id', async(req, res) => {
    const { id } = req.params
    const apiNumber = Math.random() * 100;
    const apiString = apiNumber.toString();
    const decimalPart = apiString.split('.')[1];
    try {
        const storeApi = await API.create({
            apiKey: decimalPart,
            userId: id
        })
        return res.status(200).json(storeApi)
    } catch(err) {
        return res.status(400).json({err: 'Failed to generate API Key'})
    }
})

//get your api key
router.get('/get/apikey', protectRoute, async(req, res) => {
    try {
        const getApi = await API.findOne({
            where: {
                userId: req.user.id
            }
        })
        return res.status(200).json({apikey: getApi.apiKey})
    } catch(err) {
        return res.status(500).json({err: 'Cannot get Api'})
    }
})

//get user
router.get('/get/users', protectRoute, async(req, res) => {
    try {
        const userNames = await User.findOne({
            where: {
                email: req.user.email
            }
        })
        return res.status(200).json(userNames)
    } catch(err) {
        return res.status(501).json(err)
    }
})


//update user details
router.post('/update/user', protectRoute, async(req, res) => {
    const {newName, secondName, newEmail, newPhone, newCountry } = req.body
    try {
        //const hashedPassword = await bcrypt.hash(password, 10)
        const newInputs = {
            firstname: newName,
            lastname: secondName,
            email: newEmail,
            phone: newPhone,
            country: newCountry
        }
        const updatedDetails = await User.update(newInputs,  {
            where: {
                id: req.user.id
            }
        })
    return res.status(200).json(updatedDetails)
    } catch(err) {
        return res.status(501).json(err)
    }
})

//delete users
router.delete('/delete/user/:id', async(req, res) => {
    const {id} = req.params
    try {
        const deletedUser = await User.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json(deletedUser)
    } catch(err) {
        return res.status(501).json(err)
    }
})

export default router