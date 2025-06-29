import mongoose from "mongoose";

const dbconnection = async()=>{
    return await mongoose.connect(process.env.connection).then(() => console.log(`Database connected`))
    .catch(error => console.log(error));
}


export default dbconnection;