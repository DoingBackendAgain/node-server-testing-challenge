const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const model = require("./models")
const dbConfig = require("../data/dbConfig")

const router = express.Router()

router.get("/fruits", async (req, res, next) => {
    try{
        model.find()
            .then((fruit)=> {
                res.json(fruit)
            })
     }
    catch(err){
        next(err)
    }
})

router.get("/fruits/:id", async (req, res, next)=> {
    try{
        const id = req.params.id
        const fruit = await model.findById(id)

        if(fruit.length === 0){
            return res.status(409).json({
                message: "Theres no fruit with that id"
            })
        }
        return res.json(fruit)

    }
    catch(err){
        next(err)
    }
})

router.post("/fruits", async (req,res, next)=> {
    try{
        const {name, yummy} = req.body
        const fruit = await model.findBy({name}).first()

        if(fruit){
            return res.status(409).json({
                message: "this fruit is already in the database"
            })
        }

        const newFruit = await model.add({
            name,
            yummy
        })

        res.status(201).json(newFruit)

    }
    catch(err){
        next(err)
    }
})

router.delete("/fruits/:id", async (req, res, next)=> {
    try{

        id = req.params.id
        const fruit = await model.findById(id)

        if(fruit.length === 0){
            res.status(404).json({
                message: "There's no fruit with this Id"
            })
        }
        if(fruit){
            model.remove(id)
            console.log(id, fruit)
            res.status(200).json({
                message: "What the hell?!"
            })
        }
        else{
            res.status(500).json({
                message: "server error"
            })
        }
    

    }
    catch(err){
        next(err)
    }
})







module.exports = router