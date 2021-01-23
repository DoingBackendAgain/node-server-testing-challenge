const supertest = require("supertest")
const db = require("../data/dbConfig")
const server = require("../server")

beforeEach(async ()=> {
    await db.seed.run()
})

afterAll(async ()=> {
    await db.destroy()
})


describe("fruits integration tests", ()=> {
    it("gets a list of fruits", async ()=> {
        const res = await supertest(server).get("/fruits")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].name).toBe("banana")
    })

    it("gets a single fruit by id", async ()=>{
        const res = await supertest(server).get("/fruits/2")
        expect(res.type).toBe("application/json")
        expect(res.body.id).toBe(2)
        expect(res.body.name).toBe("strawberry")
        expect(res.body.yummy).toBe(9)
    })

    it("returns an error for fruit that doens't exist", async ()=> {
        const res = await supertest(server).get("/fruits/20")
        expect(res.statusCode).toBe(404)
    })

    it("creates a new hobbit", async ()=> {
        const res = await supertest(server)
            .post("/fruits")
            .send({name: "kiwi"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("kiwi")
        expect(res.body.id).toBeDefined()


    })

})
