import { gql } from '@apollo/client';

// Query to get the currently logged-in user
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      decks {
        _id
        name
        cards {
          _id
          name
          text
          hasFlavourText
          imageUrl
          element
          cost
          type
        }
      }
    }
  }
`;

// Query to get all users
export const GET_USERS = gql`
  query users {
    users {
      _id
      username
    }
  }
`;

// Query to get a user by username
export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      decks {
        _id
        name
        cards {
          _id
        }
      }
    }
  }
`;

// Query to get a user by id
export const GET_USERID = gql`
  query GetUser($id: ID!) {
    userID(_id: $id) {
      _id
      username
      decks {
        _id
        name
        cards {
          _id
        }
      }
    }
  }
`;

export const GET_DECKS = gql`
  query decks($userId: ID!) {
    decks(userId: $userId) {
      _id
      name
      element
      user {
        _id
        username
      }
      cards {
        _id
      }
    }
  }
`;

export const GET_DECK = gql`
  query deck($_id: ID!) {
    deck(_id: $_id) {
      _id
      name
      element
      user {
        _id
        username
      }
      cards {
        _id
        name
        text
        hasFlavourText
        imageUrl
        element
        cost
        type
      }
    }
  }
`;

export const GET_CARDS = gql`
  query cards {
    cards {
      _id
      name
      text
      hasFlavourText
      isToken
      imageUrl
      element
      cost
      type
      attack
      health
    }
  }
`;

export const GET_CARD = gql`
  query card($_id: ID!) {
    card(_id: $_id) {
      _id
      name
      text
      hasFlavourText
      isToken
      imageUrl
      element
      cost
      type
      attack
      health
    }
  }
`;