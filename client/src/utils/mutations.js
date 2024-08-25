import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DECK = gql`
  mutation addDeck($name: String!, $userId: ID!) {
    addDeck(name: $name, userId: $userId) {
      _id
      name
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard(
    $name: String!
    $text: String!
    $hasFlavourText: Boolean!
    $imageUrl: String!
    $element: String!
    $cost: Int!
    $type: String!
    $deckId: ID!
  ) {
    addCard(
      name: $name
      text: $text
      hasFlavourText: $hasFlavourText
      imageUrl: $imageUrl
      element: $element
      cost: $cost
      type: $type
      deckId: $deckId
    ) {
      _id
      name
      text
      hasFlavourText
      imageUrl
      element
      cost
      type
      deck {
        _id
        name
      }
    }
  }
`;

export const REMOVE_DECK = gql`
  mutation removeDeck($deckId: ID!) {
    removeDeck(deckId: $deckId) {
      _id
      name
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation removeCard($cardId: ID!) {
    removeCard(cardId: $cardId) {
      _id
      name
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard(
    $cardId: ID!
    $name: String
    $text: String
    $hasFlavourText: Boolean
    $imageUrl: String
    $element: String
    $cost: Int
    $type: String
  ) {
    updateCard(
      cardId: $cardId
      name: $name
      text: $text
      hasFlavourText: $hasFlavourText
      imageUrl: $imageUrl
      element: $element
      cost: $cost
      type: $type
    ) {
      _id
      name
      text
      hasFlavourText
      imageUrl
      element
      cost
      type
      deck {
        _id
        name
      }
    }
  }
`;