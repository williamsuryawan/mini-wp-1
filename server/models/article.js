const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "title can't be empty"],
        maxlength: [70, "title can't be more than 700 characters"]
    },
    content : {
        type: String
    },
    status : {
        type: String
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    featured_image: {
        type: String
    },
    tags: [{
        type: String
    }],
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article;