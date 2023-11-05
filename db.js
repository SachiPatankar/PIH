import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Connect to your MongoDB database

export const Connection = () => {

mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@taskapp.8kr70yu.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.on('connected', () => {
    console.log("Database connected succesfully");
})

db.on('disconnected', () => {
    console.log("Database disconnected");
})

}

export default Connection;

