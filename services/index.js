'use strict'

const jwt = require('jwt-simple')
const jwtDecode = require('jwt-decode');
const moment = require('moment')
const config = require('../config')

function createToken(user) {
  const payload = {
    name: user.name,
    user_id: user._id,
    email: user.email,
    uvus: user.uvus,
    group: user.group,
    evaluations: user.evaluations,
    optionalEvaluations: user.optionalEvaluations,   
    exp: moment().add(14, 'days').unix()
  }
  let token = jwt.encode(payload, config.SECRET_TOKEN)     
  return token
}


function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      console.log('decoding')
      const payload = jwtDecode(token, config.SECRET_TOKEN)
      console.log(payload)

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Expired token'
        })
      }

      resolve({
          name: payload.name,
          user_id: payload.user_id,
          email: payload.email,
          uvus: payload.uvus,
          group: payload.group,
          evaluations: payload.evaluations,
          optionalEvaluations: payload.optionalEvaluations
      })

    } catch (err) {
      reject({
          status: 500,
          message: 'Invalid token'
      })
    }
  })

  return decoded
}
module.exports = {
  createToken,
  decodeToken
}