const typeDefs = `
type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  
  type Book {
    id: ID!
    title: String!
    author: String!
    price: Float!
  }
  
  type Query {
    getUser(id: ID!): User
    getAllBooks: [Book]
  }
  
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthData
  }
  
  type AuthData {
    user: User
    token: String
  }
`;

module.exports = typeDefs;
