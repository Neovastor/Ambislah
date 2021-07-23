function dummy(id) {
    let reports = []
    for (i = 0; i < 10; i++) {
        let input = {
            title: (i < 5) ? "report1 name" : "report2 name",
            userId: '123abc',
            quizId: i % 2 === 0 ? '345cde' : '679efg',
            date: new Date(),
            playerCount: 2,
            players: [
                {name: 'a', score: 90},
                {name: 'b', score: 80}
            ]
        }

        reports.push(input)
    }
    return reports
}

module.exports = dummy