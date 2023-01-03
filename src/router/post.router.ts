import express from 'express'
import { body, query, param } from 'express-validator'
import { createPost, deletePost, findPostById, findPostList } from '../controller/post.controller.js'
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

postRouter.get('/post',
    query('pageNum').isInt(),
    query('pageSize').isInt(),
    query('categoryId').isInt(),
    validate,
    findPostList
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
