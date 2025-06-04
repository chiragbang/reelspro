import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("Please define mongodb_uri in env")
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}

export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn
    }
}