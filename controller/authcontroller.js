import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sendMail from '../middleware/sendEmail.js'
export const register = async (req, res) => {
    try {
        const { email, password, name, role } = req.body
        if (!email || !password || !name || !role) {
            return res.status(401).json({ message: "Please send full details" })
        }
        let checkUser = await User.findOne({ email })
        console.log(checkUser);
        if (checkUser) {
            return res.status(401).json({ message: "User Already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        if (!hashedPassword) {
            return res.status(401).json({ message: "Password not working" })
        }
        // let user = await User.create({ email, name, password: hashedPassword, role })
        let user = { name, email, role, password: hashedPassword }
        const otp = Math.floor(100000 + Math.random() * 900000)

        // const activationToken = jwt.sign({ user, otp },
        //     process.env.Activation_Secret, {
        //     expiresIn: "5m"
        // }
        // )
        const activationToken = jwt.sign({ user, otp }, process.env.ACTIVATION_SECRET_KEY, { expiresIn: "5m" })
        const data = {
            name, otp
        }

        await sendMail(email,
            "Hiringer",
            data
        )


        // res.cookie("activationToken", activationToken, {
        //     httpOnly: true,
        //     sameSite: "lax", // use "none" + secure:true in production
        //     secure: false,   // true only on HTTPS
        //     maxAge: 5 * 60 * 1000
        // })

        res.cookie("activationToken", activationToken, {
            httpOnly: true,
            sameSite: "none",   // REQUIRED for cross-site
            secure: true,      // REQUIRED on HTTPS
            maxAge: 5 * 60 * 1000
        });


        res.status(200).json({
            message: "Otp sent to your email"
        })


    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
}


export const verifyUser = async (req, res) => {
    try {
        const { otp } = req.body
        if (!otp) {
            return res.status(401).json({ message: "Please send full details" })
        }
        console.log("here");
        const activationToken = req.cookies.activationToken
        // console.log(activationToken, "activation token");
        const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET_KEY)
        if (!verify) {
            return res.status(401).json({ message: "Otp Expired" })
        }
        if (verify.otp !== otp) {
            return res.status(400).json({ message: "wrong otp" })
        }


        const user = await User.create({
            name: verify.user.name,
            email: verify.user.email,
            password: verify.user.password,
            role: verify.user.role

        })


        res.status(200).json({
            message: "User Registered Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(402).json({ message: "Enter full details" })
        }

        const checkUser = await User.findOne({ email })
        if (!checkUser) {
            return res.status(401).json({ message: "User not exists" })
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if (!checkPassword) {
            return res.status(401).json({ message: "Problem in check Password" })
        }

        const token = jwt.sign({ id: checkUser?._id }, process.env.SECRET_KEY, {
            expiresIn: "2d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        res.status(200).json({ message: "User logged in successfully" })
    } catch (error) {
        console.log(error);
    }
}



export const getUser = async (req, res) => {
    try {
        const id = req.user.id
        // console.log(req.user);
        res.status(200).json({ message: "User found" })
    } catch (error) {
        console.log(error);
    }
}