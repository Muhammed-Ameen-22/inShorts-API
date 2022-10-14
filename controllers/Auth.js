import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {

        //check if username already exists in db

        User.findOne({ userName: userName }, function (data, err) {
            if (err) {
                //user exists
                const response = { "Status": "Failure", "Reason": "Username already exist" }
                return res.status(400).send(response)
            }

            else {

                //adding user
                const user = new User({ userName: userName, password: hashedPassword });
                user.save();
                console.log('Registered successfully')
                return res.status(200).send('Successfull registration')

            }

        }
        )
    } catch (error) {
        console.log(error)
    }
}


export const login = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    try {

        //checking whether user exist
        const user = await User.findOne({ userName: userName });

        if (!user) {
            //user does not exist
    
            const response = { "Status": "Failure", "Reason": "User does not exist" }
            return res.status(400).send(response)
        }

        //checking password entered is same or not
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {

            //password is wrong

            const response = { "Status": "Failure", "Reason": "Invalid Password" }
            return res.status(400).send(response)
        }

        const userId = user.id;
        //jwt initialization
        const token = jwt.sign(
            { userName, userId },
            process.env.JWT_SECRET,
            {
                expiresIn: '25 days',
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 2160000000,
            secure: process.env.ENV == 'production' ? true : false,
        });


        return res.status(200).send('Successfully logged in')

    } catch (error) {
        console.log('ERROR', error)
    }
}


export const logout = (req, res) => {

    res.clearCookie('token');

    return res.send({ "Status": "Success", "Details": "Logout successful" });
};