import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation
        if (!username || !email || !password) {
            return res.status (400).json ({ message: "All fields are required!"});
        }

        //check for existing user
        const existingUser = await User.findOne ({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status (400).json ({ 
                message: "User already exists with this email!"+
                         "Username: " + existingUser.username + 
                         " email: " + existingUser.email
            });
        }

        //create user
        const newUser = await User.create ({
            username,
            email: email.toLowerCase(),
            password
        });

        //const user = await newUser.save();

        res.status(201).json ({ 
            message: "User registered",
            user: {       id: newUser._id, 
                       email: newUser.email, 
                    username: newUser.username
                  }
        });
    } catch (error) {
        res.status(500).json ({ 
            message: "Internal server error", 
              error: error.message });
        }
    };

    const loginUser = async (req, res) => {
        try {
            //checking if the user already exists
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required!" });
            }


            const user = await User.findOne({
                 email: email.toLowerCase() 
                });

            if (!user) return res.status(400).json({
                 message: "User not found"
            });

            //compare passwords
            const isMatch = await user.comparePassword(password);
            if (!isMatch)   return res.status(400).json({ 
                    message: "Invalid credentials" 

                });
            
            res.status(200).json({ 
                message: "User Logged In",
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }

    const logoutUser = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ 
                email: email.toLowerCase()
            });

            if (!user) return res.status(400).json({
                message: "User not found"
            });

            res.status(200).json({ 
                message: "Logout successful"
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal server error", error
            });
        }
    }
    export {
        registerUser,
        loginUser,
        logoutUser
    };