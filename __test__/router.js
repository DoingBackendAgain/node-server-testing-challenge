const supertest = require("supertest")
const db = require("../data/dbConfig")
const server = require("../server")


describe("fruits integration tests", ()=> {
    it("gets a list of fruits", async ()=> {
        const res = await supertest(server).get("/fruits")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].name).toBe("banana")
    })
})
