const {ObjectId} = require('../config/mongodb')

function dummyReports() {
    let reports = []
    for (i = 0; i < 5; i++) {
        let input = {
            _id: ObjectId(`60fad998cbd8d3ed1ba95f7${i}`),
            userId: process.env.USER_ID,
            quizId: i % 2 === 0 ? '345cde' : '679efg',
            quizTitle: "quiz title",
            createdAt: new Date(),
            playersCount: 2,
            players: [
                {name: 'a', score: 90},
                {name: 'b', score: 80}
            ]
        }

        reports.push(input)
    }
    return reports
}

// function dummyQuizzes() {
//     let quizzes = []
//     for (i = 0; i < 5; i++) {
//         let input = {
//             _id: ObjectId(`60fad998cbd8d3ed1ba95f7${i}`),
//             userId: process.env.USER_ID,
//             questions: [
//                 {
//                   "type": "text",
//                   "question": "penemu bola lampu ?",
//                   "image": "null",
//                   "choose": ["aku", "kamu", "dia", "mereka"],
//                   "answer": "aku"
//                 }
//               ],
//             title: "quizzes title",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }

//         quizzes.push(input)
//     }
//     return quizzes
// }

function isValidDate(date) {
    date = new Date(date)
    Date.prototype.isValid = function () {              
        // If the date object is invalid it
        // will return 'NaN' on getTime() 
        // and NaN is never equal to itself.
        return this.getTime() === this.getTime();
    }
    return date.isValid()
}

module.exports = {dummyReports, isValidDate}