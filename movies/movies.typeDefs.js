import { gql } from 'apollo-server';
//! require 필수, typeDefs는 기본이 no require(선택)
export default gql`
  type Movie {
    id: Int!
    title:String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies : [Movie]
    movie (id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre:String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year:Int!): Movie
  }
`;