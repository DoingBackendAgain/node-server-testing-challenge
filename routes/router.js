const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const model = require("./models")

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

router.delete("/fruit/:id", async (req, res, next)=> {
    try{

    }
    catch(err){
        next(err)
    }
})







module.exports = router