import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({ message: "Please login again" })
        }
        const compare = jwt.verify(token, process.env.SECRET_KEY)
        if (!compare) {
            return res.status(400).json({ message: "Please login again" })
        }

        req.user = compare.id
        next()
    } catch (error) {
        console.log(error);
    }
}


export default auth