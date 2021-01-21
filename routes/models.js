const db = require("../data/dbConfig")

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByName
}

async function add(fruit){
    const [id] = await db("fruits")
        .insert(fruit)
        return findById(id)
}

function find(){
    return db("fruits")
        .select("id", "name", "yummy")
}

function findBy(filter){
    return db("fruits")
        .select("id","name", "yummy")
}

function findById(id){
    return db("fruits")
        .select("id","name","yummy")
}

function findByName(name){
    return db("fruits")
        .select("id", "name", "yummy")
        .where("name", name)
}
