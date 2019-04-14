const Tag = require('../models/tag');

module.exports = {
    NewArticleTag: function (inputTag) {
        console.log("masuk ke helper NewArticleTag", inputTag)
        let uniqueTags = [];
        let objectTag = {};
        inputTag.split(',').forEach(tag => {
            if(tag.length > 0) {
                objectTag[tag.toLowerCase()] = 'hello'
            }
        });
        console.log("hasil split and looping tag", objectTag)
        uniqueTags = Object.keys(objectTag);
        console.log("ensure the tag is unique",  uniqueTags)

        uniqueTags.forEach(tag => {
            Tag
                .findOne({name: tag})
                .then(findTag => {
                    if(!findTag) {
                        return Tag
                            .create({name: tag })
                            .then(newTag => {
                                console.log("hasil save new tag", newTag)
                            })
                    } else {
                        console.log("Tag sudah ada, hasil find tag", findTag)
                    }
                })
                .catch(error => {
                    throw new Error(error)
                })
        })
        console.log("helper NewArticleTag selesai", uniqueTags)
        return uniqueTags;
    },
    EditArticleTag: function (editTag, existingTag) {
        console.log("masuk ke helper EditArticleTag", editTag, existingTag)
        let uniqueTags = [];
        editTag.split(',').forEach(tagg => {
            existingTag.push(tagg)
        })
        console.log("all tags in array", existingTag)
        let objectTag = {};
        existingTag.forEach(tag => {
            if(tag.length > 0) {
                objectTag[tag] = 'hello'
            }
        });
        console.log("hasil split and looping tag", objectTag)
        uniqueTags = Object.keys(objectTag);
        console.log("ensure the tag is unique",  uniqueTags)

        uniqueTags.forEach(tag => {
            Tag
                .findOne({name: tag})
                .then(findTag => {
                    if(!findTag) {
                        return Tag
                            .create({name: tag })
                            .then(newTag => {
                                console.log("hasil save new tag", newTag)
                            })
                    } else {
                        console.log("Tag sudah ada, hasil find tag", findTag)
                    }
                })
                .catch(error => {
                    throw new Error(error)
                })
        })
        console.log("helper NewArticleTag selesai", uniqueTags)
        
        console.log("helper EditArticleTag selesai", uniqueTags)
        return uniqueTags;
    }
}

