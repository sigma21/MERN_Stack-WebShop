import mongoose from "mongoose"

const connections = {}

async function connectDb() {
    if(connections.isConnected) {
        // use existing db connection
        console.log("Using existing connection")
        return;
    }
    // use new db connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("DB Connected")
    connections.isConnected = db.connections[0].readyState;
}

export default connectDb;