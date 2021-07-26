const { gql } = require("apollo-server");

const { ApolloError } = require("apollo-server");
const Redis = require("ioredis");
const redis = new Redis();
const { instanceQuizzes } = require("../axios");

const typeDef = gql`
  type questions {
    type: String
    question: String
    image: String
    choose: [String]
    answer: String
  }

  type Quizzes {
    _id: ID
    userId: String
    title: String
    questions: [questions]
    timer: Int
    mode: String
    createdAt: Date
  }

  input InputQuestion {
    type: String
    question: String
    image: String
    choose: [String]
    answer: String
  }

  input InputQuizzes {
    _id: ID
    userId: String
    title: String
    questions: [InputQuestion]
    timer: Int
    mode: String
    createdAt: Date
  }

  extend type Query {
    Quizzes: [Quizzes]
    QuizzesById(id: ID): Quizzes
  }

  extend type Mutation {
    DeleteQuizzesById(id: ID): String
    EditQuizzesById(
      id: ID
      userId: String
      title: String
      questions: [InputQuestion]
      timer: Int
      mode: String
      createdAt: Date
    ): Quizzes
    AddQuizzes(
      userId: String
      title: String
      questions: [InputQuestion]
      timer: Int
      mode: String
      createdAt: Date
    ): Quizzes
  }
`;

const resolvers = {
  Query: {
    Quizzes: async () => {
      try {
        const QuizzesRedis = await redis.get("Quizzes");
        if (QuizzesRedis) {
          // console.log(JSON.parse(QuizzesRedis));
          return JSON.parse(QuizzesRedis);
        } else {
          const Quizzes = await instanceQuizzes.get(`/`);
          console.log(JSON.stringify(Quizzes.data));
          redis.set("Quizzes", JSON.stringify(Quizzes.data));
        }
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    QuizzesById: async (_, args) => {
      const QuizzesByIdRadis = await redis.get("QuizzesById");
      if (QuizzesByIdRadis) {
        const data = JSON.parse(QuizzesByIdRadis);
        // console.log(data._id);
        // console.log(args.id, 'ini args');
        if (data._id === args.id) {
          // console.log('masuk');
          return JSON.parse(QuizzesByIdRadis);
        } else {
          // console.log('else');
          redis.del("QuizzesById");
          const dataQuiz = await instanceQuizzes.get("/" + args.id);
          redis.set("QuizzesById", JSON.stringify(dataQuiz.data));
        }
      } else {
        const dataQuiz = await instanceQuizzes.get("/" + args.id);
        redis.set("QuizzesById", JSON.stringify(dataQuiz.data));
      }
    },
  },
  Mutation: {
    DeleteQuizzesById: async (_, args) => {
      try {
        const DestroyQuiz = await axiosQuizzes.delete(`/${args.id}`);
        redis.del("Quizzes");
        return DestroyQuiz.data.message;
      } catch (err) {
        // console.log(err.response.data.message);
        throw new ApolloError(err.response.data.message);
      }
    },
    EditQuizzesById: async (_, args) => {
      try {
        const data = {
          _id: args.id,
          userId: args.userId,
          questions: args.questions,
          timer: args.timer,
          mode: args.mode,
        };
        // console.log(data);
        const updateQuizzes = await axiosQuizzes.put(`/${args.id}`, data);
        // console.log(updateQuizzes.data, 'masuk');
        redis.del("Quizzes");
        return updateQuizzes.data;
      } catch (err) {
        throw new ApolloError(err.response.data.message);
      }
    },
    AddQuizzes: async (_, args) => {
      try {
        const data = {
          userId: args.userId,
          questions: args.questions,
          timer: args.timer,
          mode: args.mode,
        };
        // console.log(data);
        const postQuizzes = await axiosQuizzes.post(`/`, data);
        // console.log(postQuizzes.data, 'masuk');
        redis.del("Quizzes");
        return postQuizzes.data;
      } catch (err) {
        // console.log('masuk');
        throw new ApolloError(err.response.data.message);
      }
    },
  },
};

module.exports = { typeDef, resolvers };
