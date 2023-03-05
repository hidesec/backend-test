import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

export class UserController {
    async register(req, res) {
        const {username, password} = req.body;

        // Hash password
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.status(500).send('Error on the server.');

            // Save user to database
            try {
                const findUser = await User.findOne({username: username});
                if(findUser) return res.status(401).send('User exists!');

                const user = new User();
                user.username = username;
                user.password = hash;
                await user.save();

                const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET);
                res.status(200).json({auth: true, token: token});
            }catch(err){
                res.status(400).json({message: err.message});
            }
        });
    }

    async login(req, res) {
        const {username, password} = req.body;

        try {
            // Find user in database
            const findUser = await User.findOne({username: username});

            if (!findUser) return res.status(401).send('Invalid username or password.');

            // Compare password
            bcrypt.compare(password, findUser.password, (err, result) => {
                if (err) return res.status(500).send('Error on the server.');
                if (!result) return res.status(401).send('Invalid username or password.');

                // Create and return JWT token
                const token = jwt.sign({id: findUser._id, username: findUser.username}, process.env.JWT_SECRET);
                res.status(200).json({auth: true, token: token});
            });
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
}