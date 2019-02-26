var app  = require('../app.js')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect
var User = require('../models/User')

chai.use(chaiHttp)
var token = ''

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
        User.remove({} , () => {
            done()
        })
    })

    it('POST /users/signup should return new registered user', (done) => {
        let obj = {
            name: 'Christian',
            email: 'christian.sihotang12@gmail.com',
            password: '12345678',
            dob: '01/01/2001',
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
                expect(result.body.promotor).to.have.property('name')
                expect(result.body.promotor).to.have.property('email')
                expect(result.body.promotor).to.have.property('password')
                expect(result.body.promotor).to.have.property('dob')
                expect(result.body.promotor).to.have.property('gender')
                expect(result.body.promotor).to.have.property('imageUrl')

                expect(result.body.promotor.name).to.equal(obj.name)
                expect(result.body.promotor.email).to.equal(obj.email)
                expect(result.body.promotor.password).to.not.equal(obj.password)
                expect(result.body.promotor.dob).to.equal(obj.dob)
                expect(result.body.promotor.gender).to.equal(obj.gender)
                expect(result.body.promotor.imageUrl).to.equal(obj.imageUrl)
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
            passworddss: 'sdasddasdasdasd'
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


    it('POST /users/signup should not return new registered users', (done) => {
        let obj = {

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

    it('POST /users/signup should not return new registered users', (done) => {
        let obj = {
            name: 'Christian'
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

    it('POST /users/signup should not return new registered users', (done) => {
        let obj = {
            name: 'Christian',
            email: 'cha@mail.com'
        }
        chai.request(app)
            .post('/users/signup')
            .send(obj)
            .end((err, result) => {
                expect(result).to.have.status(400)
                expect(result.body.promotor).to.have.property('name')
                expect(result.body.promotor).to.have.property('email')
                expect(result.body.promotor).to.have.property('password')
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

    it('PUT /users/ should have updated promotors to have a new data', (done) => {
        let obj = {
            name: 'Chris',
            password: 'wadawajadah',
            email: 'christian.sihotang23@gmail.com'
        }

        chai.request(app)
            .put('/users')
            .set({token})
            .send(obj)
            .end((err, result) => {
                expect(result).to.have.status(201)
                expect(result.body.promotor).to.have.property('name')
                expect(result.body.promotor).to.have.property('email')
                expect(result.body.promotor).to.have.property('password')

                expect(result.body.promotor.name).to.equal(obj.name)
                expect(result.body.promotor.email).to.equal(obj.email)
                expect(result.body.promotor.password).to.equal(obj.password)


                done()
            })
    })

    it('PUT /users/ should haven\'t updated users', (done) => {
        let obj = {
            promotorId: '4124124',
            name: null,
            passworsad: 'wadawajadah',
            email: 'christian.sihotang10@gmail.com'
        }

        chai.request(app)
            .put('/users')
            .set({token})
            .send(obj)
            .end((err, result) => {
                expect(result).to.have.status(400)
                expect(result.body.promotor).to.have.property('message')

                done()
            })
    })


    it('GET /users/ should have  promotors data', (done) => {

        chai.request(app)
            .get('/users')
            .set({token})
            .end((err, result) => {
                expect(result).to.have.status(200)
                expect(result.body.promotor).to.have.property('name')
                expect(result.body.promotor).to.have.property('email')
                expect(result.body.promotor).to.have.property('password')

                done()
            })
    })


    it('GET /users/ should not have  promotors data because not valid token', (done) => {
        let token2 = `${token.slice(2)}sa`
        chai.request(app)
            .get('/users')
            .set({token : token2})
            .end((err, result) => {
                done()
            })
    })
})
