'use strict'

const express = require('express')

const feedbackCtrl = require('../controllers/feedback')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

const api = express.Router()

api.get('/feedbacks', feedbackCtrl.getFeedbacks)
api.get('/feedbacks/:session', feedbackCtrl.getFeedback)
api.post('/feedbacks', feedbackCtrl.saveFeedback)
api.delete('/feedbacks/:session', feedbackCtrl.deleteFeedback)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.put('/user/:uvus/:session', userCtrl.addEvaluation)

api.get('/private', auth, (req, res) => {
    console.log(req.user)
    res.status(200).send({ message: 'Tienes acceso',  user: req.user})
})

api.get('/user/:uvus', userCtrl.getUser)

module.exports = api