import express from 'express'
import { body, query } from 'express-validator'
import { createCategory, findCategoryList } from '../controller/category.controller.js'
import validate from '../middleware/validate.js'

const categoryRouter = express.Router()

categoryRouter.post('/category',
    body('name').isString(),
    validate,
    createCategory
)

categoryRouter.get('/category',
    query('pageNum').isInt(),
    query('pageSize').isInt(),
    validate,
    findCategoryList
)

export default categoryRouter
