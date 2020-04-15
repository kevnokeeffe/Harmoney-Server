const chai = require('chai')
const server = require('../../../bin/www')
const expect = chai.expect
const request = require('supertest')
const _ = require('lodash')
const apiBase = '/api/auth'
const apiAccBase = '/api/account'
const mongoose = require('mongoose')
let token, validId, db
const User = require('../../../models/users-models/user')
const email = Math.floor(Math.random() * 10000000 + 10000000)
const newUser = {
  fName: 'Kevin',
  lName: "O'Keeffe",
  email: `${email}@gmail.com`,
  phone: '+353 85 206 9520',
  password: '123456',
}
const user = {
  email: process.env.KEVS_EMAIL,
  password: process.env.KEVS_PASSWORD,
}

describe('Database Connection', async () => {
  it('should connect to the database', () => {
    before(async (done) => {
      try {
        await mongoose.connect(
          `mongodb+srv://${process.env.HARMONEY_ATLAS_NAME}:${process.env.HARMONEY_ATLAS_PASSWORD}@cluster0-r3fv1.mongodb.net/test?retryWrites=true&w=majority`,
          {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
          }
        )
        db = mongoose.connection
        done()
      } catch (error) {
        console.log(error)
      }
    })
  })
})

describe('Account Method Tests', async () => {
  
  it('should create user', async () => {
    return request(server)
      .post(apiBase + '/authy-register')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect(200)
      .then(async (res) => {
        expect(res).to.exist
        expect(res.body.message).equals(true)
        const user = await User.findOne({ email: `${email}@gmail.com` })
        validId = user._id
        token = res.body.token
      });
  });


  it('should get all Bank of WIT current accounts', async () => {
    request(server)
      .get(apiAccBase + `/current-all-wit`)
      .set('Authorization', token)
      .expect(200)
      .then((resp) => {
        expect(resp)
      })
  })

  it('should get all AIB current accounts', async () => {
    request(server)
      .get(apiAccBase + `/current-all-aib`)
      .set('Authorization', token)
      .expect(200)
      .then((resp) => {
        expect(resp)
      })
  })

  it('should get all Credit Union current accounts', async () => {
    request(server)
      .get(apiAccBase + `/current-all-cu`)
      .set('Authorization', token)
      .expect(200)
      .then((resp) => {
        expect(resp)
      })
  })

  it('should get all Post Office current accounts', async () => {
    request(server)
      .get(apiAccBase + `/current-all-post`)
      .set('Authorization', token)
      .expect(200)
      .then((resp) => {
        expect(resp)
      })
  })

  it('should get all Bank of WIT savings accounts', async () => {
    request(server)
      .get(apiAccBase + `/saving-all-wit`)
      .set('Authorization', token)
      .expect(200)
      .then((resp) => {
        expect(resp)
      })
  })

  it('should get all AIB savings accounts', async () => {
    request(server)
      .get(apiAccBase + `/saving-all-aib`)
      .set('Authorization', token)
      .expect(200)
      .then((resp) => {
        expect(resp)
      })
  })

  it('should get all Credit Union savings accounts', async () => {
    request(server)
      .get(apiAccBase + `/saving-all-cu`)
      .set('Authorization', token)
      .expect(200)
      .then((resp) => {
        expect(resp)
      })
  })

  it('should get all Post Office savings accounts', async () => {
    request(server)
      .get(apiAccBase + `/saving-all-post`)
      .set('Authorization', token)
      .expect(200)
      .then((resp) => {
        expect(resp)
      })
  })

  it('should delete a user', () => {
    return request(server)
      .delete(apiBase + `/authy-delete/${validId}`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body.message).equals(true)
        expect(res.body.promis.deletedCount).equals(1)
        expect(res.body.promis.ok).equals(1)
      })
  })
})
