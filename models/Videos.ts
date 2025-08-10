import mongoose, {Schema, model, models, } from "mongoose";
import bcrypt from "bcryptjs";
import { timeStamp } from "console";

export const VIDEO_DIAMNETION = {
    height: 1080,
    width: 1920,
} as const

export interface IVideo{
    _id?: mongoose.Types.ObjectId,
    title: String,
    description: String,
    videoUrl: String,
    thumbnailUrl: String,
    controler: Boolean,
    transformation?: {
        heigth: Number,
        width: Number,
        quality?: Number,
    }
}

const videoSchema = new Schema<IVideo>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        videoUrl: {type: String, required: true},
        thumbnailUrl: {type: String, required: true},
        controler: {type: Boolean, required: true},
        transformation: {
            heigth: {type: Number, default: VIDEO_DIAMNETION,},
            width: {type: Number, default: VIDEO_DIAMNETION,},
            quality: {type: Number, min: 1, max:100,}
        },
    },
    {
        timestamps: true,
    }
)

const Video = models?.Video || model<IVideo>("Video", videoSchema)

export default Video;