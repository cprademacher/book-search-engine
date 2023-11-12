const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error("Failed to get user");
      }
    },
    getAllBooks: async () => {
      try {
        const books = await Book.find();
        return books;
      } catch (error) {
        throw new Error("Failed to get books");
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      try {
        const newUser = await User.create({ name, email, password });
        return newUser;
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        const isValidPassword = await user.isCorrectPassword(password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        // Generate and return a JWT token
        const token = generateToken(user);
        return { user, token };
      } catch (error) {
        throw new Error("Failed to login");
      }
    },
  },
};

/*
const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};
*/

module.exports = resolvers;
