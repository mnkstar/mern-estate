import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log("CONNECTION TO MONGODB SUCCESSFULL!!");
})
.catch((err) => {
    console.log(err);
});

const app = express();
app.listen(8080,()=>{
    console.log('server started at port 8080');
}
);