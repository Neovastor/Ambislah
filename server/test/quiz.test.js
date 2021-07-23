const app = require("../app");
const request = require("supertest");
const { quizzes } = require("../model/quizModel");
let dataQuiz = require("./quiz.json");

describe("Get all Quizzes [SUCCESS CASE]", (done) => {
  it("Quizzes plain", (done) => {
    return request(app)
      .get('/quizzes')
      .end((err, res) => {
        // console.log("ERROR", err);
        // console.log("INI RESULT", res);
        if (err) done(err);
        else {

          expect(res.status).toBe(200);
            
        //   expect(res.body).toEqual(
        //     expect.arrayContaining([
        //       expect.objectContaining({
        //         _id: expect.any(String),
        //         userId: expect.any(Number),
        //         timer: expect.any(Number),
        //         mode: expect.any(String),
        //         // questions: expect.any(Number),
        //       }),
        //     ])
        //   );

          done();
        }
      });
  });
});
