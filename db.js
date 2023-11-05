import mongoose from "mongoose";


// Connect to your MongoDB database

export const Connection = () => {

mongoose.connect("mongodb+srv://sachipatankar19:mongo19sa@taskapp.8kr70yu.mongodb.net/?retryWrites=true&w=majority", {
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

