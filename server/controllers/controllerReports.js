const ModelReports = require('../models/reports')

class Controller {
    static async findAllReports (req, res, next) {
        try {
            // const userId = req.user.id
            const data = await ModelReports.findAllReports()
            res.status(200).json(data)
        }
        catch(err) {
            next({code: 500})
        }
    }

    static findOneReports (req, res, next) {
        const id = req.params.id
        ModelReports.findOneReports(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                next({code: 404, message: 'Report Not Found'})
            }
        })
        .catch(err => {
            next({code: 500})
        })
    }

    static async createReports (req, res, next) {
        try {
            const {userId, quizId, date, playersCount, players} = req.body
            if (!userId || !quizId || !date || !playersCount || !players) {
                let err = []
                !userId && err.push('userId')
                !quizId && err.push('quizId')
                !date && err.push('date')
                !playersCount && err.push('playersCount')
                !players && err.push('players')

                const fields = err.join(', ')
                next({code: 400, 'message': `The fields for ${fields} cannot be empty`})
            }
            const input = {userId, quizId, date, playersCount, players}
            
            const data = await ModelReports.createReports(input)
            res.status(201).json(data)
        }
        catch (err) {
            next({code: 500})
        }
    }  
    
    static deleteReports (req, res, next) {
        const id = req.params.id
        
        ModelReports.deleteReports(id)
        .then(data => {
            if (data) {
                res.status(200).json({'message': 'Delete Item Success'})
            }
            else {
                next({code: 404, message: 'Report Not Found'})
            }
        })
        .catch (err => {
            next({code: 500})
        })
    }
}

module.exports = Controller