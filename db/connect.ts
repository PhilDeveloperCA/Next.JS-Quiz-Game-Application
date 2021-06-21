import mongoose from 'mongoose';
const  mongo_url = 'mongodb://localhost:27017';

const connectDb = (handler:Function) => async(req,res) => {
    if(mongoose.connections[0].readyState){
        return handler(req,res);
    }
    try {
        await mongoose.connect(mongo_url, {
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        await handler(req,res);
        await mongoose.disconnect();
    }
    catch(err){
        res.status(500).json({'error':err.toString()});
    }
}

export default connectDb;