var app = require('../app.js')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect
var User = require('../models/User')
var Event = require('../models/Event')

chai.use(chaiHttp)
var token = ''
var userId = ''

describe('User', () => {
  beforeEach((done) => {
    let objUser = {
      name: 'Chris',
      email: 'christian.sihotang23@gmail.com',
      password: '12345678',
      dob: '01/01/2001',
      gender: 'Male',
      imageUrl: 'http://imageurl.com'
    }
    let objUser2 = {
      name: 'Chris',
      email: 'christian.sihotang10@gmail.com',
      password: '12345678',
      dob: '01/01/2001',
      gender: 'Male',
      imageUrl: 'http://imageurl.com'
    }
    var user = new User(objUser)
    user.save(function (err, newUser) {
      if (err) {
        console.log('before each error', err.message)
      } else {
        done()
      }
    });
  })

  afterEach((done) => {
    User.remove({}, () => {
      done()
    })
  })

  it('POST /users/signup should return new registered user', (done) => {
    let obj = {
      name: 'Christian',
      email: 'christian.sihotang12@gmail.com',
      password: '12345678',
      dob: '01-01-2001',
      gender: 'Male',
      imageUrl: 'http://imageurl.com'
    }
    chai.request(app)
      .post('/users/signup')
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body.user).to.have.property('name')
        expect(result.body.user).to.have.property('email')
        expect(result.body.user).to.have.property('password')
        expect(result.body.user).to.have.property('dob')
        expect(result.body.user).to.have.property('gender')
        expect(result.body.user).to.have.property('imageUrl')

        expect(result.body.user.name).to.equal(obj.name)
        expect(result.body.user.email).to.equal(obj.email)
        expect(result.body.user.password).to.not.equal(obj.password)
        expect(result.body.user.gender).to.equal(obj.gender)
        expect(result.body.user.imageUrl).to.equal(obj.imageUrl)
        done()
      })
  })

  it('POST /users/signin should have sign in user', (done) => {
    let obj = {
      email: 'christian.sihotang23@gmail.com',
      password: '12345678'
    }

    chai.request(app)
      .post('/users/signin')
      .send(obj)
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body).to.have.property('token')
        expect(result.body).to.have.property('message')
        token = result.body.token
        userId = result.body.userId
        console.log("USERID====",userId)
        expect(result.body.message).to.equal('success login')
        done()
      })
  })

  it('POST /users/signin should have not sign in because email is wrong', (done) => {
    let obj = {
      email: 'christian.sihotang12@gmail.com',
      password: '12345678'
    }

    chai.request(app)
      .post('/users/signin')
      .send(obj)
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body.message).to.equal("wrong email / password")
        done()
      })
  })

  it('POST /users/signin should have not sign in because password is wrong', (done) => {
    let obj = {
      email: 'christian.sihotang23@gmail.com',
      password: 'sdasddasdasdasd'
    }

    chai.request(app)
      .post('/users/signin')
      .send(obj)
      .end((err, result) => {
        // console.log(err)
        // console.log(result)
        expect(result).to.have.status(400)
        expect(result.body.message).to.equal("wrong email / password")
        done()
      })
  })


  it('POST /users/signup should not return new registered users if name null', (done) => {
    let obj = {
      name: '',
      email: '',
      password: '',
      dob: '',
      gender: '',
      imageUrl: ''
    }
    chai.request(app)
      .post('/users/signup')
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body).to.have.property('message')
        done()
      })
  })

  it('POST /users/signup should not return new registered users if email null', (done) => {
    let obj = {
      name: 'Christian',
      email: '',
      password: '',
      dob: '',
      gender: '',
      imageUrl: ''
    }
    chai.request(app)
      .post('/users/signup')
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body).to.have.property('message')
        // expect(result.body.message).to.equal('')
        done()
      })
  })

  it('POST /users/signup should not return new registered users if password null', (done) => {
    let obj = {
      name: 'Christian',
      email: 'cha@mail.com',
      password: '',
      dob: '',
      gender: '',
      imageUrl: ''
    }
    chai.request(app)
      .post('/users/signup')
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body).to.have.property('message')
        // expect(result.body.message).to.equal('')
        done()
      })
  })

  it('POST /users/signup should not return new registered users if dob null', (done) => {
    let obj = {
      name: 'Christian',
      email: 'cha@mail.com',
      password: '1234',
      dob: '',
      gender: '',
      imageUrl: ''
    }
    chai.request(app)
      .post('/users/signup')
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body).to.have.property('message')
        // expect(result.body.message).to.equal('')
        done()
      })
  })

  it('POST /users/signup should not return new registered users if gender null', (done) => {
    let obj = {
      name: 'Christian',
      email: 'cha@mail.com',
      password: '1234',
      dob: '01-01-2001',
      gender: '',
      imageUrl: ''
    }
    chai.request(app)
      .post('/users/signup')
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body).to.have.property('message')
        // expect(result.body.message).to.equal('')
        done()
      })
  })

  it('POST /users/signup should not return new registered users if imageUrl null', (done) => {
    let obj = {
      name: 'Christian',
      email: 'cha@mail.com',
      password: '1234',
      dob: '01-01-2001',
      gender: 'male',
      imageUrl: ''
    }
    chai.request(app)
      .post('/users/signup')
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body).to.have.property('message')
        expect(result.body.message).to.equal('You must upload your photo profile')
        done()
      })
  })

  it('POST /users/signin should have not sign in because password is wrong', (done) => {
    let obj = {
      email: 'christian.sihotang23@gmail.com',
      password: 'sdasddasdasdasd',
    }

    chai.request(app)
      .post('/users/signin')
      .send(obj)
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body.message).to.equal("wrong email / password")
        done()
      })
  })

  it('PUT /users/ should have updated promotors to have a new data', (done) => {
    let obj = {
      name: 'Chris',
      password: 'wadawajadah',
      email: 'christian.sihotang23@gmail.com'
    }

    chai.request(app)
      .put('/users')
      .set({ token })
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body.user).to.have.property('name')
        expect(result.body.user).to.have.property('email')
        expect(result.body.user).to.have.property('password')

        expect(result.body.user.name).to.equal(obj.name)
        expect(result.body.user.email).to.equal(obj.email)
        expect(result.body.user.password).to.equal(obj.password)


        done()
      })
  })

  it('PUT /users/ should haven\'t updated users', (done) => {
    let obj = {
      promotorId: '4124124',
      name: '',
      password: 'wadawajadah',
      email: 'christian.sihotang10@gmail.com'
    }

    chai.request(app)
      .put('/users')
      .set({ token })
      .type('form')
      .send({
        data: JSON.stringify(obj)
      })
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body.user).to.have.property('message')

        done()
      })
  })


  it('GET /users/ should have  user data', (done) => {

    chai.request(app)
      .get('/users')
      .set({ token })
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body.user).to.have.property('name')
        expect(result.body.user).to.have.property('email')
        expect(result.body.user).to.have.property('password')

        done()
      })
  })


  it('GET /users/ should not have  user data because not valid token', (done) => {
    let token2 = `${token.slice(2)}sa`
    chai.request(app)
      .get('/users')
      .set({ token: token2 })
      .end((err, result) => {
        done()
      })
  })

  it('PUT /users/join/:eventId should return message success join event', (done) => {
    let newevent = {
      name: "Hacktiv8 Workshop",
      place: "Jalan Iskandar Muda",
      date: new Date,
      price: 15000,
      timeStart: "12:00",
      timeEnd: "15:00",
      latitude: "12323123",
      longitude: "12323213",
      description: "Hacktiv8 Workshop"
    };
    var createdEvent

    Event
      .create(newevent)
      .then(data => {
        console.log('data', data)
        console.log('userID', userId)
        createdEvent = data
        return Event.findByIdAndUpdate(createdEvent._id, { $push: { userId } })
      })
      .then(event => {
        console.log("event", event)
      })

    chai.request(app)
      .get(`/users/joint/${createdEvent._id}`)
      .set({ token })
      .end((err, result) => {
        expect(result).to.have.status(400)
        expect(result.body.user).to.have.property('message')
        done()
      })
  })
})
