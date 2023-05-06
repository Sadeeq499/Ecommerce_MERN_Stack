import Users from "../Models/Users.js";
import {registerValidation,
    loginValidation,
forgetPasswordValidation} from "../helpers/joiValidation.js";
import { hashPassword, comparePassword} from "../helpers/authHelper.js";
import  Jwt  from "jsonwebtoken";


// register controller
export const registerController = async (req, res) => {
    try {
        // get the user data from the request body
        const { name, email, password, phone, address, answer } = req.body;

        // validate the user data
        const { error } = registerValidation(req.body);
        
        // if error then return the error message
        error ? res.status(400).json({ error: error.details[0].message }) : null; 

        // check if the user is already in the database
        const user = await Users.findOne({ email });
        if (user) return res.status(400).json({ error: "Email already exists" });

        // hashed the password
        const hashedPassword = await hashPassword(password);
        
        // create a new user
        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        });

        // save the user to the database
        const userSaved = await newUser.save();
        res.status(200).json({ message: "User registered successfully", userSaved });


    }
    catch (error) {
        console.log(error);
    }
};




// login controller
export const loginController = async (req, res) => {

    try {
        // get the user data from the request body
        const { email, password } = req.body;

        // validate the user data
        const { error } = loginValidation(req.body);

        // if error then return the error message
        error ? res.status(400).json({ error: error.details[0].message }) : null;

        // check if the user is already in the database
        const  user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ error: "Email or password is wrong" });

        // check if the password is correct
        const validPassword = await comparePassword(password, user.password);
        if(!validPassword) return res.status(400).json({ error: "Email or password is wrong" });


        // create and assign a token
        const token = Jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {expiresIn: "7d"},);  // token will expire within 1 hour
        // res.send(token);
        // res.header("Authorization", token).send();
        // res.status(200).json({ message: "User logged in successfully"});

        res.status(200).send({

                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    role: user.role,
                },
                token: token,

        })
    }
    catch (error) {
        console.log(error);
    }
};


// forget password controller
export const forgetPasswordController = async (req, res) => {

    try {
        const {email,answer,newPassword} = req.body;
        const {error} = forgetPasswordValidation(req.body);
        error ? res.status(400).json({ error: error.details[0].message }) : null;

        // check
        const user = await Users.findOne({email,answer});
        if(!user) return res.status(400).json({error: "Email or answer is wrong"});
        const hashedPassword = await hashPassword(newPassword);
        await Users.findByIdAndUpdate(user._id,{password: hashedPassword});
        res.status(200).json({message: "Password changed successfully"});

    }
    catch (error) {
        console.log(error);
    }

}