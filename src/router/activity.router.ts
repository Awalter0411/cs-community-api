import express from 'express'
import { body, param } from 'express-validator'
import { createActivity, deleteActivity, findActivityList, getActivityById, updateActivity } from '../controller/activity.controller.js'
import validate from '../middleware/validate.js'

const activityRouter = express.Router()

activityRouter.post('/activity',
  body('name').isString(),
  body('description').isString(),
  body('content').isString(),
  body('link').isString(),
  body('date').isString(),
  validate,
  createActivity
)

activityRouter.get('/activity',
  findActivityList
)

activityRouter.delete('/activity/:id',
  param('id').isInt(),
  validate,
  deleteActivity
)

activityRouter.put('/activity/:id',
  param('id').isInt(),
  validate,
  updateActivity
)

activityRouter.get('/activity/:id',
  param('id').isInt(),
  validate,
  getActivityById
)

export default activityRouter
