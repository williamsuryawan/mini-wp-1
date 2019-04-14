const User = require('../models/user')
const Article = require('../models/article')
const {NewArticleTag, EditArticleTag} = require('../helpers/tagManagement')
// const checkDate = require('../helpers/checktodoDate')


class ArticleController {
//create article
    static createArticle (req,res) {
        console.log("masuk sini create article", req.body, req.loggedInUser.id)

        let tagGroup = NewArticleTag(req.body.tags)
        console.log("Tag array output helpers", tagGroup)
        
        Article
            .create({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
                tags: tagGroup,
                author: req.loggedInUser.id,
                featured_image: req.file.cloudStoragePublicUrl,
                createdAt: new Date
            })
            .then(articlelist => {
                let newArticle = articlelist
                console.log("cek hasil create article", articlelist)
                return User.findOneAndUpdate({
                    _id: articlelist.author
                }, {$push: {listArticle: articlelist._id}}, {new: true})
                .then(user => {
                    console.log("Hasil push new article:", user)
                    res.status(200).json({
                        msg: 'Articlelist successfully created',
                        data: newArticle
                    })
                })
            })
            .catch(error => {
                console.log("terjadi error", error)
                res.status(500).json({
                    msg: 'ERROR Create Articlelist: ',error
                })
            })
    }
    static findByTag (req,res) {
        console.log("masuk ke find by tag", req.query)
        let tagArray =[];
        let tagArraywithRegex =[]
        let query ={}
        query = { tags: { $all: tagArraywithRegex } }
        tagArray = req.query.tags.split(" ")
        
        tagArray.forEach(tag=> {
            tagArraywithRegex.push(new RegExp('^'+ tag,'i'))
            // expected output { tags: { $in: [/^pRoGramMing/i] } }
        })
        console.log("looping selesai, query ada regex", query)

        Article
            .find(query)
            .populate('author')
            .then(articles => {
                console.log("articles by tag ditemukan", articles)
                res.status(200).json({
                    msg: `jumlah artikel ditemukan: ${articles.length}`,
                    data:articles})
            })
            .catch(error => {
                res.status(500).json(error)
            })
    }

    static findAllArticles (req,res) {
        console.log("masuk ke display article", req.loggedInUser, req.query.q)
        var query = {}
        if (req.query.q) {
            query = {
                $or: [{tags:{
                $regex: '.*' + req.query.q + '.*',
                $options: "i"
                }},{title: {
                $regex: '.*' + req.query.q + '.*',
                $options: "i"
                }}]
            }
        }
        Article
            .find(query)
            .sort([['createdAt', 'descending']])
            .populate("author")
            .then(articles => {
                // console.log("article ditemukan, hasil pencarian article: ", articles)
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Interall server error on find All",
                    error: err
                })
            })
    }

    static showArticleByUserId (req,res) {    
        console.log("masuk ke display article by user", req.loggedInUser)
        User
            .find({
                _id: req.loggedInUser.id
            })
        .populate('listArticle')
        .then(user => {
            // console.log("User ditemukan, hasil pencarian user: ", user)
            //get all articles by user
            return Article.find({
                author: req.loggedInUser.id
            })
            .sort([['createdAt', 'descending']])
            .then(lists => {
                // console.log("Hasil pencarian article: ", lists )
                let completedArticle = 0
                let incompleteArticle = 0
                lists.forEach(article => {
                    if(article.status == 'COMPLETE') {
                        completedArticle +=1
                    } else if (article.status == 'INCOMPLETE') {
                        incompleteArticle +=1
                    }
                })
                res.status(200).json({
                    msg: `List Article by user ${req.loggedInUser.email}`,
                    data: lists,
                    globalcomplete: completedArticle,
                    globalincomplete: incompleteArticle
                })
            })
        })
        .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Display list of Article ', error
            })
        })       
    }

    static showIndividualArticle (req,res) {
        console.log("masuk ke show one article", req.params.id)
        Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            res.status(200).json ({
                msg: "Detail Article",
                data: article
            })
        })
        .catch (error => {
            res.status(error).json({
                msg: 'ERROR Display details of Article ', error
            })
        })
    }

    //edit article (content only)
    static editIndividualArticlewithoutImage (req,res) {
        console.log("Masuk ke edit article", req.body, req.loggedInUser, req.params)
        Article.findOne({
            "_id": req.params.id
        })
        .then (article => {
            console.log("Hasil pencarian article: ", article)
            let inputTag = ''
            req.body.tags.forEach(singletag => {
                inputTag += singletag+','
            })
            inputTag.slice(0,-1)
            console.log("hasil looping dan splice tag array", inputTag)
            let tagGroup = NewArticleTag(inputTag)
            
            // console.log(boom)
            return Article.findOneAndUpdate({
                "_id": req.params.id
            }, {
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
                tags: tagGroup,
                author: req.loggedInUser.id
            }, {new: true})
            .then(updatedArticle => {
                console.log("Hasil Edit", updatedArticle)
                res.status(200).json ({
                    msg: "Article has been updated",
                    data: updatedArticle
                })
            })
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({
                msg: 'ERROR in finding your article to edit:', error   
            }) 
        })
    }

    //edit article (content and image)
    static editIndividualArticlewithImage (req,res) {
        console.log("Masuk ke edit article and images", req.body, req.loggedInUser, req.params, req.file.cloudStoragePublicUrl)
        Article.findOne({
            "_id": req.params.id
        })
        .then (article => {
            console.log("Hasil pencarian article: ", article)
            // let inputTag = ''
            // req.body.tags.forEach(singletag => {
            //     inputTag += singletag+','
            // })
            // inputTag.slice(0,-1)
            // console.log("hasil looping dan splice tag array", inputTag)
            let tagGroup = NewArticleTag(req.body.tags)
            return Article.findOneAndUpdate({
                "_id": req.params.id
            }, {
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
                tags: tagGroup,
                author: req.loggedInUser.id,
                featured_image: req.file.cloudStoragePublicUrl
            }, {new: true})
            .then(updatedArticle => {
                console.log("Hasil Edit", updatedArticle)
                res.status(200).json ({
                    msg: "Article and image have been updated",
                    data: updatedArticle
                })
            })
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({
                msg: 'ERROR in finding your article to edit:', error   
            }) 
        })
        
    }

    //delete article
    static deleteIndividualArticle (req,res) {
        Article.findOne({
            _id: req.params.id
        })
        .then(foundArticle =>{
            console.log("Article yang akan diremove dan delete:", foundArticle, req.loggedInUser)
            return User.findOneAndUpdate({
                _id:foundArticle.author
            }, {$pull: {listArticle: foundArticle._id}})
            .then(articleToDelete => {
                console.log("Hasil update user untuk delete article:", articleToDelete)
                return Article.findOneAndDelete({
                    _id: req.params.id
                })
                .then(deletedArticle => {
                    console.log("Hasil delete: ", deletedArticle)
                    res.status(200).json({
                        msg: 'Article has been deleted',
                        data: deletedArticle
                    })
                })
            })
        })
        .catch(error => {
            res.status(500).json({
                msg: 'ERROR finding article to delete:', error
            })
        })
    }
}

module.exports = ArticleController;