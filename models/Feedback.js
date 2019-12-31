const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    feedback: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Feedback = mongoose.model("Feedback",FeedbackSchema);