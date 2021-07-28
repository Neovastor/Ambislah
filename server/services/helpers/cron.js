const cron = require("node-cron");

function cronJob({minute,hour,day,month}, roomId) {

    let expression= `${minute} ${hour} ${day} ${month} *`
    const task = cron.schedule(
      expression,
      () => {
        console.log(`del-ROOM-ID ${roomId}`);
        // jika room id ada maka lakukan hapus
        //ini firebase
      },
      {
        scheduled: false,
        timezone: "Asia/Jakarta",
      }
    );
    task.start();
 
}


cronJob({
    minute : 20,
    hour : 0,
    day: 28,
    month: 7
}, 123123)

module.exports = cronJob;
