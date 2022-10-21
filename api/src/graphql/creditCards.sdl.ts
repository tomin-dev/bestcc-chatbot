export const schema = gql`
  type CreditCard {
    id: Int!
    alias: String!
    closingDate: Int!
    dueDate: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    User: User!
    userId: Int!
  }

  type Query {
    creditCards: [CreditCard!]! @requireAuth
    creditCard(id: Int!): CreditCard @requireAuth
  }

  input CreateCreditCardInput {
    alias: String!
    closingDate: Int!
    dueDate: Int!
    userId: Int!
  }

  input UpdateCreditCardInput {
    alias: String
    closingDate: Int
    dueDate: Int
    userId: Int
  }

  type Mutation {
    createCreditCard(input: CreateCreditCardInput!): CreditCard! @requireAuth
    updateCreditCard(id: Int!, input: UpdateCreditCardInput!): CreditCard!
      @requireAuth
    deleteCreditCard(id: Int!): CreditCard! @requireAuth
  }
`
