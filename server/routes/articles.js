const express = require("express")
const router = express.Router();
const ArticleController = require('../controllers/articleController')
const {authentication, authorization} = require('../middlewares/authentication')
const images = require('../helpers/images.js')

router.get('/', ArticleController.findAllArticles)
router.get('/tags', ArticleController.findByTag)
router.use(authentication)
router.get('/myarticle', ArticleController.showArticleByUserId)
router.post('/create', images.multer.single('image'), images.sendUploadToGCS, ArticleController.createArticle)
router.get('/:id', ArticleController.showIndividualArticle)
router.put('/:id', authorization, ArticleController.editIndividualArticlewithoutImage)
router.put('/fulledit/:id', authorization, images.multer.single('image'), images.sendUploadToGCS, ArticleController.editIndividualArticlewithImage)
router.delete('/:id', authorization, ArticleController.deleteIndividualArticle)

module.exports = router