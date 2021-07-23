const ModelReports = require('../models/reports')

class Controller {
    static async findAllReports (req, res) {
        try {
            // const userId = req.user.id
            const data = await ModelReports.findAllReports()
            res.status(200).json(data)
        }
        catch(err) {
            res.status(500).json({'message': 'Internal Server Error'})
        }
    }

    static async findOneReports (req, res) {
        try {
            const id = req.params.id
            const data = await ModelReports.findOneReports(id)
            res.status(200).json(data)
            
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'Report Not Found'})

            } else {
                res.status(500).json({'message': 'Internal Server Error'})
            }
        }
    }

    static async createReports (req, res) {
        try {
            const {userId, quizId, date, playersCount, players} = req.body
            if (!userId || !quizId || !date || !playersCount || !players) {
                res.status(400).json({'message': 'The field/s cannot be empty'})
            }
            const input = {userId, quizId, date, playersCount, players}
            
            const data = await ModelReports.createReports(input)

            res.status(201).json(data)
        }
        catch (err) {
            res.status(500).json({'message': 'Internal Server Error'})
        }
    }  
    
    static async deleteReports (req, res) {
        try {
            const id = req.params.id
            
            await ModelReports.deleteReports(id)
            res.status(200).json({'message': 'Delete Item Success'})
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'Report Not Found'})

            } else {
                res.status(500).json({'message': 'Internal Server Error'})
            }
        }
    }
}

module.exports = Controller