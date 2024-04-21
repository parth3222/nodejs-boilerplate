const User = require("../model/users")

const createUser = async (req, res) => {

    try {
        const { email, password, firstName } = req.body
        const image = req.file;

        const existsUser = await User.findOne({ email })

        if (existsUser) {
            return res.status(403).json({ message: "user allready exists" })
        }

        const base64String = image.buffer.toString('base64');
        const user = new User({ email, password, firstName, image: base64String })
        user.setPassword(password)
        user.save().then((user) => res.status(201).json(user)).catch((error) => res.status(500).json(user))
    } catch (error) {
        console.log("error", error);
    }
}

const getUser = async (req, res) => {
    try {
        const getUser = await User.findOne({ email: "parth@gmail.com" })
        res.status(201).json(getUser)
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = {
    createUser,
    getUser
};