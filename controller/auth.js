import User from "../userSchema/userSchema.js";
import bcrypt from "bcrypt"
import genrateToken from "./token.js";
export const signup = async (req, res) => {
    try {
        const { name, email, contact, password } = req.body;
        if (!name || !email || !contact || !password) {
            return res.status(400).json({ message: "Fill all details" })
        }
        if (contact.length < 10 || contact.length > 10) {
            return res.status(400).json({ message: "Invalid phone number" })
        }
        const existEmail = await User.findOne({ email })
        if (existEmail) {
            return res.status(400).json({ message: "User already exists with this email" })
        }

        const existContact = await User.findOne({ contact })
        if (existContact) {
            return res.status(400).json({ message: "Phone number already registered" })
        }

        const hassPass = await bcrypt.hash(password, 10)

        const createUser = await User.create({
            name,
            email,
            contact,
            password: hassPass
        })

        const token = genrateToken(createUser)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({ createUser })

    } catch (error) {
        return res.status(400).json({ message: "SIGNUP ERROR", error })

    }
}








export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Fill all details" })
        }

        const existEmail = await User.findOne({ email })
        if (!existEmail) {
            return res.status(400).json({ message: "This email not exist" })
        }


        const compare = await bcrypt.compare(password, existEmail.password)

        if (!compare) {
            return res.status(400).json({ message: "Invalid Password" })
        }


        const token = genrateToken(existEmail)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login Successfully",
            name: existEmail.name,
            email: existEmail.email,
            contact: existEmail.contact
        })

    } catch (error) {
        return res.status(400).json({ message: "LOGIN ERROR", error })

    }
}


export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successfull" })
    } catch (error) {
        console.log(`LOGOUT SERVER ERROR`)
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "token not found" })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ message: "GET-CURRENT-USER ERROR", error })
    }
}



