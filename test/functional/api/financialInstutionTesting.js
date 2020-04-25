const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");
const apiBase = "/api/auth"
const apiFIBase = "/api/fi"
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
const user = {
    email: process.env.KEVS_EMAIL,
    password: process.env.KEVS_PASSWORD
}


describe('Database Connection',  async () => {
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
});

describe('Creating User for General Testing',  async () => {
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
});

describe('Financial Instution Account Login Testing',  async () => {
    it("should login to Bank of WIT", async () => {
        request(server)
            .post(apiFIBase + '/login-refresh-wit')
            .set("authenticate", token)
            .send(user)
            .expect(200) 
    });

    it("should login to AIB", async () => {
        request(server)
            .post(apiFIBase + '/login-refresh-aib')
            .set("authenticate", token)
            .send(user)
            .expect(200) 
    });

    it("should login to Credit Union", async () => {
        request(server)
            .post(apiFIBase + '/login-refresh-credit-union')
            .set("authenticate", token)
            .send(user)
            .expect(200) 
    });

    it("should login to Post Office", async () => {
        request(server)
            .post(apiFIBase + '/login-refresh-post')
            .set("authenticate", token)
            .send(user)
            .expect(200) 
    });

    it("should login to Post Office Access", async () => {
        request(server)
            .post(apiFIBase + '/login-access-post')
            .set("authenticate", token)
            .send(user)
            .expect(200) 
            .then(resp => {
                expect(resp.body.message).equals('Successful Login');
            })
    });

    it("should login to Credit Union Access", async () => {
        request(server)
            .post(apiFIBase + '/login-access-credit-union')
            .set("authenticate", token)
            .send(user)
            .expect(200) 
            .then(resp => {
                expect(resp.body.message).equals('Successful Login');
            })
    });

    it("should login to AIB Access", async () => {
        request(server)
            .post(apiFIBase + '/login-access-aib')
            .set("authenticate", token)
            .send(user)
            .expect(200) 
            .then(resp => {
                expect(resp.body.message).equals('Successful Login');
            })
    });

    it("should login to Bank of WIT Access", async () => {
        request(server)
            .post(apiFIBase + '/login-access-wit')
            .set("authenticate", token)
            .send(user)
            .expect(200) 
            .then(resp => {
                expect(resp.body.message).equals('Successful Login');
            })
    });
});


describe('Delete User Created for Testing',  async () => {
    it("should delete a user", () => {
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
    });
    
});