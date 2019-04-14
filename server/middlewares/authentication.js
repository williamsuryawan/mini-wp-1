const jwt = require('jsonwebtoken')
const Article = require('../models/article')

module.exports = {
    authentication: function (req,res, next) {
        if(req.headers.hasOwnProperty('token')) {
            // console.log("req.body", req.body)
            console.log("Input verifikasi JWT", req.headers.hasOwnProperty('token'))
            try {
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
                console.log("Hasil verifikasi JWT", decoded)
                if( decoded != null) {
                    req.loggedInUser = decoded;
                    next()
                } else {
                    res.status(400).json({
                        message: 'Invalid Token'
                    })
                }
            } catch (err) {
                res.status(400).json({
                    message: 'Invalid Token'
                })
            }
        } else {
            res.status(400).json({
                message: 'Please provide token'
            })
        }
    },
    authorization: function(req, res, next) {
        console.log("Input Authorization to edit/delete article", req.loggedInUser, req.params.id)
        Article.findOne({
            _id: req.params.id
        })
        .populate("author")
        .then(foundArticle => {
            console.log("article ditemukan dalam authorization", foundArticle)
            if(req.loggedInUser.id.toString() == foundArticle.author._id.toString()) {
                next()
            } else {
                res.status(401).json({
                    message: "You dont have any authorization"
                })
            }
        })
        
    }
}