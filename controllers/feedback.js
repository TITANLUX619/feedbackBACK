'use strict'

const Feedback = require('../models/feedback')


function getFeedback(req, res) {
    let session = req.params.session
    Feedback.findOne({ session: session }, (err, feedback) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
        if (!feedback) return res.status(404).send({ message: 'El feedbackado no existe' })

        res.status(200).send({ feedback })
    })
}

function getFeedbacks(req, res) {
    Feedback.find({}, (err, feedbacks) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })

        res.status(200).send({ feedbacks })
    })
}


function saveFeedback(req, res) {
    console.log('POST /api/feedbacks');
    console.log(req.body)

    let feedback = new Feedback()
    feedback.session = req.body.session
    feedback.points = req.body.points

    feedback.save((err, feedback) => {
        if (err) res.status(500).send({ message: `Error al salvar la base de datos ${err}` })
        res.status(200).send({ feedback })
    })
}

// function updateFeedback(req, res) {
//     let feedbackId = req.params.feedbackId
//     let update = req.body

//     Feedback.findByIdAndUpdate(feedbackId, update, (err, feedbackUpdated) => {
//         if (err) res.status(500).send({ message: `Error al actualizar el feedbackado: ${err}` })

//         res.status(200).send({ feedback: feedbackUpdated })
//     })
// }


function deleteFeedback(req, res) {
    let session = req.params.session

    Feedback.deleteOne({ session: session }, (err) => {
        if (err) res.status(500).send({ message: `Error al borrar el feedback: ${err}` })
        res.status(200).send({ message: 'El proyeto ha sido eliminado' })
    })
}


module.exports = {
    getFeedbacks,
    getFeedback,
    saveFeedback,
    deleteFeedback
}