const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");
const apiBase = "/api/transaction"

let data = ["BOW123456","ajf34toifioJJlkl232A",30]

describe('Transaction Test',  async () => {
    it("should initiate a transaction", async () => {
        return request(server)
            .post(apiBase + '/execute-external')
            .send(data)
            .expect(200)
            .then(async (res) => {
                expect(res).to.exist;
                expect(res.body.message).equals(true);
                expect(res.body.secret).equals("Testing");
                expect(res.body.auth).equals(true);
                expect(res.body.data[0]).equals("BOW123456")
                expect(res.body.data[1]).equals("ajf34toifioJJlkl232A")
                expect(res.body.data[2]).equals(30)
            });
    });
});