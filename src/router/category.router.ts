import express from 'express'
import { body, query, param } from 'express-validator'
import { createCategory, deleteCategory, findCategoryList } from '../controller/category.controller.js'
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

categoryRouter.delete('/category/:id',
    param('id').isInt(),
    validate,
    deleteCategory
)

export default categoryRouter
