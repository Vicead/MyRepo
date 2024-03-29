"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require('../models/reservation')
const Passenger = require('../models/passenger')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Reservation, [
            // 'createdId',
            // createdId populate yap; User modelinden sadece "username ve email" verilerini getir.
            { path: 'createdId', select: 'username email' }, // modelde ref bilgisi olduğundan model tanımlamadık.
            // 'passengers', 
            // passengers populate yaparken hangi modelden veri gelecek:
            { path: 'passengers', model: 'Passenger', select: 'firstName lastName email' } // modelde ref bilgisi olmadığından model tanımladık.
        ])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "reservationname": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

        // set createdId from logined user:
        req.body.createdId = req.user._id

        /* Check ID or OBJECT for passengers */
        
        let passengerInfos = req.body?.passengers || [],
            passengerIds = [],
            passenger = false

        for (let passengerInfo of passengerInfos) {

            if (typeof passengerInfo == 'object') {

                passenger = await Passenger.findOne({ email: passengerInfo.email })
                if (!passenger) {
                    passengerInfo.createdId = req.user._id
                    passenger = await Passenger.create(passengerInfo)
                }

                // if (passenger) passengerIds.push(passenger._id)

            } else {

                passenger = await Passenger.findOne({ _id: passengerInfo })

                // if (passenger) passengerIds.push(passenger._id)

            }

            if (passenger) passengerIds.push(passenger._id)
        }

        req.body.passengers = passengerIds

        /* Check ID or OBJECT for passengers */
       
        const data = await Reservation.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

        const data = await Reservation.findOne({ _id: req.params.id }).populate([
            // 'createdId',
            // createdId populate yap; User modelinden sadece "username ve email" verilerini getir.
            { path: 'createdId', select: 'username email' },
            // 'passengers', 
            // passengers populate yaparken hangi modelden veri gelecek:
            { path: 'passengers', model: 'Passenger', select: 'firstName lastName email' }
        ])

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "reservationname": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

        const data = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

        const data = await Reservation.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}