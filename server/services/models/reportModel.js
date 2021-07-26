const { getDatabase, ObjectId } = require('../config/mongodb')

class Model {
    static collection() {
        return getDatabase().collection('Reports')
    }

    static async findAllReports () {
        try {
            const data = await Model.collection().find().toArray()
            return data
            
        } catch (error) {}
    }

    static async findOneReports (id) {
        try {
            const data = await Model.collection().findOne({"_id": ObjectId(id)})
            return data
        } catch (error) {}
    }

    static async createReports (input) {
        try {
            const data = Model.collection()
            const { insertedId } = await data.insertOne(input)
            return await data.findOne(insertedId)
            
        } catch (error) {}
    }

    static async deleteReports (id) {
        try {
            const data = Model.collection()
            const findOne = await Model.findOneReports(id)
            if (findOne) {
                await data.deleteOne(
                    {"_id": ObjectId(id)}, 
                )
                return true
            } else {
                return false
            }
            
        } catch (error) {}

    }
}

module.exports = Model