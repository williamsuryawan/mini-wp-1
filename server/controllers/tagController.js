const Tag = require('../models/tag');

class TagController {

    static getArticleTag(req, res) {
        Tag
        .find({})
        .then(allTags => {
            res.status(200).json({
                message: "Tag Found",
                data: allTags
            })
        })
        .catch(err => {
            res.status(500).json({
            msg: err.message
            })
        })
    }

}

module.exports = TagController;