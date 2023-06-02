import { gql } from "@apollo/client";

// Mutation for user login
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// Mutation for adding an order
export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        story
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

// Mutation for adding a user
export const ADD_USER = gql`
  mutation addUser(
    $cryptonym: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      cryptonym: $cryptonym
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
