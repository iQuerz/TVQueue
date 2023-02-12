const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect("mongodb+srv://tvqueue:tvqueue@cluster0.15xmjyt.mongodb.net/?retryWrites=true&w=majority")
        console.log(`MongoDB connected - ${conn.connection.host}:${conn.connection.port}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { 
    connectDB
}