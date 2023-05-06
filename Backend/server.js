import Express  from "express";
import  Color  from "colors";
import  dotenv  from "dotenv";
import connectDB  from "./config/db.js";
import authRoute from './Routes/authRoute.js'
import Cors from 'cors';
import categoryRoute from './Routes/categoryRoute.js'
import productRoute from './Routes/productRoute.js'


// dotevn configration
dotenv.config();

// Database Config
connectDB();


// rest Objects
const app = Express();


// allowing custom token in header 
const corsOptions ={
    exposedHeaders: ['Authorization'],
    origin: '*',
};

app.use(Cors(corsOptions));

// middleware
app.use(Express.json());


// get request
app.get("/", (req, res) => {
    res.send("Hello World!");
    });


    app.use("/api/auth", authRoute);
    app.use("/api/category", categoryRoute)
    app.use("/api/product", productRoute)

    // server ports
const Port = process.env.PORT || 8080;
app.listen(Port, () => {
    console.log(`Server is running on ${Port}` .bgMagenta.white);
    }   );  

