const dbService = require('../../services/db.service.js')
const logger = require('../../services/logger.service.js')
const utilService = require('../../services/util.service.js')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy) {
    console.log(filterBy.name);
    try {
        console.log(filterBy.name, "test");
        const criteria = {
            name: { $regex: filterBy.name, $options: 'i' }
        }

        const collection = await dbService.getCollection('toys')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
    console.log(toyId);
        const collection = await dbService.getCollection('toys')
        const toy = await collection.findOne({ _id: ObjectId(toyId) })
        console.log(toy);
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price
        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    // addCarMsg,
    // removeCarMsg
}