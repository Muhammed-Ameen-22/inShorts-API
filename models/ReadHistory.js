import mongoose from "mongoose";
const Schema = mongoose.Schema;

const readHistorySchema = new Schema({

    userId: {
        type: String,
        min: 3,
        max: 20,
    },
    newsId: {
        type: String
    },
    readAt: {
        type: Date,

    }
});

export default mongoose.model('ReadHistory', readHistorySchema);