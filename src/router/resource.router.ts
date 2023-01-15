import express from 'express'
import { body, param } from 'express-validator'
import { createResource, deleteResource, findResourceList } from '../controller/resource.controller.js'
import validate from '../middleware/validate.js'

const resourceRouter = express.Router()

resourceRouter.post('/resource',
  body('name').isString(),
  body('link').isString(),
  body('content').isString(),
  validate,
  createResource
)

resourceRouter.get('/resource',
  findResourceList
)

resourceRouter.delete('/resource/:id',
  param('id').isInt(),
  validate,
  deleteResource
)

export default resourceRouter
