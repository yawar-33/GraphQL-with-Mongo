const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type Query {
    hello: String
    users:[User!]!
    products(filter: ProductFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category]
    category(id: ID!): Category
    reviews: [Review]
    review(id: ID!): Review
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput): Review!
    signupUser(input: AddUserInput):User!
    signinUser(input: SigninUserInput): Token!
  }

  type Token{
    token:String
}
  type User{
    _id:ID!
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductFilterInput {
    onSale: Boolean
    rating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean
    categoryId: String
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

  input AddUserInput {
    firstName:String!
    lastName:String!
    email:String!
    password:String!
  }
  input SigninUserInput{
    email:String!
    password:String!
 }
`
