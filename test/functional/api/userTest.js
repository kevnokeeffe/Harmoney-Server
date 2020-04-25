const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");
const apiBase = "/api/auth"
const mongoose = require("mongoose");
let token, validId, db;
const User = require("../../../models/users-models/user");
const email = Math.floor((Math.random() * 10000000) + 10000000);
const newUser = {
    fName: "Kevin",
    lName: "O'Keeffe",
    email: `${email}@gmail.com`,
    phone: "+353 85 206 9520",
    password: "123456" 
};

describe('Database Connection Test',  async () => {

    it('should connect to the database',  () => {

    before(async (done) => {
        try {
            await mongoose.connect(`mongodb+srv://${process.env.HARMONEY_ATLAS_NAME}:${process.env.HARMONEY_ATLAS_PASSWORD}@cluster0-r3fv1.mongodb.net/test?retryWrites=true&w=majority`, {
                useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true
            });
            db = mongoose.connection;
            done()
        } catch (error) {
            console.log(error);
        }
    });
});

it('should not connect to the database',  () => {

    before(async (done) => {
        try {
            await mongoose.connect(`mongodb+srv://${process.env.HARMONEY_ATLAS}:${process.env.HARMONEY_ATLAS}@cluster0-r3fv1.mongodb.net/forTesting?retryWrites=true&w=majority`, {
                useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true
            });
            db = mongoose.connection;
            done()
        } catch (error) {
            console.log(error);
        }
    });

});

});

describe('Testing User-Authy Methods',  async () => {

it("should create user", async () => {
    return request(server)
        .post(apiBase + '/authy-register')
        .set("Accept", "application/json")
        .send(newUser)
        .expect(200)
        .then(async (res) => {
            expect(res).to.exist;
            expect(res.body.message).equals(true);
            const user = await User.findOne({email: `${email}@gmail.com`});
            validId = user._id;
            token = res.body.token;
        });
});

it("should try create an existing user with registered email and fail", () => {
    request(server)
        .post(apiBase + '/authy-register')
        .set("Accept", "application/json")
        .send(newUser)
        .expect(200)
        .then(res => {
                expect(res.body.message).equals(false);
        });
});

it("should try create a user with invalid values and fail", () => {
    const user = {
        fakeName: "Name",
        cake:null
    };
    request(server)
        .post(apiBase + '/authy-register')
        .set("Accept", "application/json")
        .send(user)
        .then(res => {
            expect(res.body.message).equals(false);
        });
});

it("should login successfully", () => {
    request(server)
        .post(apiBase + "/authy-login")
        .send({"email": newUser.email, "password": newUser.password})
        .expect(200)
        .then(res => {
            expect(res).to.exist;
            expect(res.body.token).to.not.be.empty;
            expect(res.body.message).equals('Login Successful');
            expect(res.body.auth).equals(true);
        });
});

it("should try login with the right user but wrong password", () => {
    request(server)
        .post(apiBase + '/authy-login')
        .send({"email": newUser.email, "password": "random"})
        .expect(401)
        .then(res =>{
            expect(res).to.exist;
            expect(res.body.message).equals("password");
            expect(res.body.auth).equals(false);
        })

});

it("should find a user by email", () => {
    request(server)
        .post(apiBase + '/authy-check-signup-email')
        .send({"email": newUser.email})
        .expect(200)
        .then(res =>{
            expect(res).to.exist;
            expect(res.body.message).equals(false);
        })
});

it("should not find a user by email", () => {
    let empty = "empty"
    request(server)
        .post(apiBase + '/authy-check-signup-email')
        .send(empty)
        .expect(200)
        .then(res =>{
            expect(res).to.exist;
            expect(res.body.message).equals(true);
        })
});

it("should find a user by login email", () => {
    request(server)
        .post(apiBase + '/authy-user-email')
        .send({"email": newUser.email})
        .expect(200)
        .then(res =>{
            expect(res).to.exist;
            expect(res.body.message).equals(true);
        })
});


it("should not find a user by login email", () => {
    request(server)
        .post(apiBase + '/authy-user-email')
        .send({"cake": "newUser.email"})
        .expect(200)
        .then(res =>{
            expect(res).to.exist;
            expect(res.body.message).equals(false);
            //expect(res.body.auth).equals(false);
        })
});

it("should delete a user", () => {
            try {
              return request(server)
                    .delete(apiBase + `/authy-delete/${validId}`)
                    .set("authenticate", token)
                    .set("Accept", "application/json")
                    .expect(200)
                    .then(res => {
                    expect(res.body.message).equals(true);
                    expect(res.body.promis.deletedCount).equals(1)
                    expect(res.body.promis.ok).equals(1)
                    });
    
            } catch (err) {
                console.log("fail")
        }
    });

});
