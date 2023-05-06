import  Jwt  from "jsonwebtoken";
import Users from "../Models/Users.js";
// creat a auth maddleware

export const auth = async (req, res, next) => {

    const token = req.header("Authorization");
    if(!token) return res.status(401).json({ error: "Access Denied" });
    try{
        const verified = Jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(error){
        res.status(400).json({ error: "Invalid Token" });
    }

};      

// admin auth middleware
export const isAdmin = async (req, res,next) => {
    try {
        const user = await Users.findById(req.user._id);
        if(user.role !== 1) return res.status(400).json({ error: "Admin resource access denied" });
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};