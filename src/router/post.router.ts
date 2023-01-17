import express from 'express'
import { body, query, param } from 'express-validator'
import { getCollectPostListByUser, getStarPostListByUser, collectionPost, createPost, deletePost, findCollectionPost, findPostById, findPostList, findStarPost, getPostListByCate, getPostListByUser, starPost } from '../controller/post.controller.js'
import validate from '../middleware/validate.js'

const postRouter = express.Router()

postRouter.post('/post',
    body('title').isString(),
    body('description').isString(),
    body('content').isString(),
    body('category').isArray(),
    validate,
    createPost
)

postRouter.get('/post/star/user',
    getStarPostListByUser,
)

postRouter.get('/post/collect/user',
    getCollectPostListByUser
)

postRouter.get('/post/user',
    getPostListByUser
)

postRouter.get('/post/category',
    query('cateId').isString(),
    validate,
    getPostListByCate
)

postRouter.get('/post',
    query('pageNum').isInt(),
    query('pageSize').isInt(),
    validate,
    findPostList
)

postRouter.get('/post/star',
    findStarPost
)

postRouter.post('/post/star/:id',
    param('id').isInt(),
    validate,
    starPost
)

postRouter.get('/post/collection',
    findCollectionPost
)

postRouter.post('/post/collection/:id',
    param('id').isInt(),
    validate,
    collectionPost
)

postRouter.get('/post/:id',
    param('id').isInt(),
    validate,
    findPostById
)

postRouter.delete('/post/:id',
    param('id').isInt(),
    validate,
    deletePost
)


export default postRouter
