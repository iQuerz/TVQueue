const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect("mongodb://localhost:27017")
        console.log(`MongoDB connected - ${conn.connection.host}:${conn.connection.port}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { 
    connectDB
}