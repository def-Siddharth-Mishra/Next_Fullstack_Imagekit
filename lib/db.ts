import { error } from "console";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI){
    throw new Error("Please define MongoDB URI in env variable");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

export async function connDB() {
    if (cached.conn){
        return cached.conn
    }
    if (cached.promise){
        mongoose
        .connect(MONGODB_URI)
        .then(()=>)
    }
}