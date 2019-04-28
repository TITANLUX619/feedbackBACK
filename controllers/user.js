'use strict'

const User = require('../models/user')
const service = require('../services')


function signUp(req, res) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        uvus: req.body.uvus,
        password: req.body.password,
        group: req.body.group
    })

    user.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        return res.status(200).send({ token: service.createToken(user) })
    })
}


function signIn(req, res) {

    User.findOne( { uvus: req.body.uvus }, (err, user) => {
        console.log(user)
        if (err) throw err
    
        user.comparePassword(req.body.password, (error, isMatch) => {
            console.log(req.body.password)
            if (!isMatch) {
                console.log('y hace pun!')
                return res.status(401).send( { message: 'Las credenciales no coinciden' } )
            }
            req.user = user

            return res.status(200).send( { message: 'Te has logueado correctamente', token: service.createToken(user), user } )
        })
    })
}


function addEvaluation(req, res) {
    console.log(req.params, req.body)
    User.findOne({ uvus: req.params.uvus }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peteción ${err}` })
        if (!user) return res.status(404).send({ message: 'No existe el usuario' })
        let psUpdate = user.ps
        psUpdate[req.params.session]=req.body.ps
        let eUpdate = user.evaluations
        if (req.body.result==='true'){
            eUpdate[req.params.session]=true
        } else {
            eUpdate[req.params.session]=false
        }

        
        User.updateOne({uvus: req.params.uvus}, {evaluations: eUpdate, ps: psUpdate}, (err, updated) => {
            if (err) return res.status(500).send({ message: `Error al realizar la peteción ${err}` })
            return res.status(200).send( { message: 'Actualizados: ', updated } )
        }) 
    })
    
}


// function postResult(req, res) {
//     User.updateOne(
//         { uvus: req.params.uvus },
//         {
//           $set: { 'size.uom': 'cm', status: 'P' },
//           $currentDate: { lastModified: true }
//         }
//       );
//     User.findOneAndUpdate({ uvus: req.params.uvus }, { $set: { evaluations['req.params.session']: req.body.session'jason bourne': req.body. }} (err, user) => {
//         if (err) return res.status(500).send({ message: `Error al realizar la peteción ${err}` })
//         if (!user) return res.status(404).send({ message: 'No existe el usuario' })

//         res.status(200).send({ user })
//     })
// }

function getUser(req, res) {
    User.findOne({ uvus: req.params.uvus }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peteción ${err}` })
        if (!user) return res.status(404).send({ message: 'No existe el usuario' })

        res.status(200).send({ user })
    })
}

module.exports = {
    signUp,
    signIn,
    addEvaluation,
    getUser
}