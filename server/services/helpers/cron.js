const cron = require('node-cron')


export default function cronJob (day, roomId) {
  // const expression = '*/2 * * * * *'
  // const expression = '* * 72 * * *'
  // const expression = '* * * * * *'
  const hour = day * 24
  const expression = `* */${hour} * * * *`
  // const hour = day
  // const expression = `*/${hour} * * * * *`
  const task = cron.schedule(expression, () => {
    console.log(`del-ROOM-ID ${roomId}`)
    // jika room id ada maka lakukan hapus
  }, {
    scheduled: false,
    timezone: 'Asia/Jakarta'
  })
  task.start()
}

// cronJob(1, 'satu detik')
// cronJob(5, 'LIMAA')