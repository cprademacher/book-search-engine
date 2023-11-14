const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
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
    addUser: async (parent, { username, email, password }) => {
      // Logic to add a new user
      const user = await User.create(username, email, password); // Example function to create a user
      const token = signToken(); // Generate a token for the new user
      return { token, user };
    },
    saveBook: (parent, { input }) => {
      // Logic to save a book for the user
      const updatedUser = saveBookForUser(input); // Example function to save a book
      return updatedUser;
    },
    removeBook: (parent, { bookId }) => {
      // Logic to remove a book for the user
      const updatedUser = removeBookForUser(bookId); // Example function to remove a book
      return updatedUser;
    },
  },
  User: {
    savedBooks: (parent) => {
      // Logic to fetch saved books for a specific user
      const userBooks = getBooksForUser(parent._id); // Example function to retrieve books for a user
      return userBooks;
    },
  },
};

module.exports = resolvers;
