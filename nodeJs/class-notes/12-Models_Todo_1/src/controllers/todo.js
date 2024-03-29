"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

// Call Model:
const Todo = require('../models/todo')

module.exports = {
    list: async (req, res) => {

        // const data = await Todo.findAll()
        const data = await Todo.findAndCountAll()
    
        res.status(200).send({
            error: false,
            result: data
        })
    },

    // CRUD Processes:

    create: async (req, res) => {

        // const receivedData = req.body
        // console.log(receivedData)
    
        // const data = await Todo.create({
        //     title: req.body.title,
        //     description: req.body.description,
        //     priority: req.body.priority,
        //     isDone: req.body.isDone
        // })
    
        const data = await Todo.create(req.body)
    
        res.status(201).send({
            error: false,
            body: req.body, // Sent Data
            message: "Created",
            result: data // Received Data
        })
    
    },

    read: async (req, res) => {
        // const data = await Todo.findOne({where: {id: req.params.id}})
        // console.log(data.dataValues)
        
        const data = await Todo.findByPk(req.params.id)
        res.status(200).send({
            error: false,
            result: data
        })
    },

    update: async (req, res) => {
        const data = await Todo.update(req.body, {where: {id: req.params.id}})
        res.status(202).send({
            error: false,
            body: req.body, // Sent Data
            message: "Updated",
            result: data // Received Data
        })
    },

    delete: async (req, res) => {
        const data = await Todo.destroy({where: {id: req.params.id}})
        if (data>0){
            res.status(204).send({
                error: false,
                message: "Deleted",
                
                })
        }else{
            res.status(404).send({
                error: false,
                message: "Not found",
                result: data // Received Data
                })
        }
        
    }
}