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

router.post("/fruits", async (req,res, next)=> {
    try{
        const {name, yummy} = req.body
        const fruit = await model.findBy({name}).first()

        if(fruit){
            return res.status(409).json({
                message: "this fruit is alreayd in the database"
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
        const fruit = model.findById(id)

        if(!fruit){
            res.status(404).json({
                message: "There's no fruit with this Id"
            })
        }
        if(fruit){
            model.remove(id)
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