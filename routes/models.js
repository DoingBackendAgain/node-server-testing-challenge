const db = require("../data/dbConfig")

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByName,
    remove,
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
        .where(filter)
}

function findById(id){
    return db("fruits")
        .select("id","name","yummy")
        .where({id})
}

function findByName(name){
    return db("fruits")
        .select("id", "name", "yummy")
        .where("name", name)
}

function remove(id){
    return db("fruits")
        .where({id})
        .del()
}